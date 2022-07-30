// 资源地址
var resources = {
        AQI: 'AQI-air.csv',
        CO: 'CO-air.csv',
        O3: 'O3-air.csv',
        NO2: 'NO2-air.csv',
        'PM2.5': 'PM2.5-air.csv',
        PM10: 'PM10-air.csv',
        SO2: 'SO2-air.csv'
    },

    // 全局指标数据对象
    globalData = {},
    isFilled = false,
    citySelect = document.getElementById('city'),
    indicatorData,
    indicatorSelect = document.getElementById('indicator')

function renderCitySelect(data) {
    if (data.length && !isFilled) {
        var citys = getCitys(data)
        citySelect.innerHTML = citys.map(function(c) {
            return '<option value="' + c + '">' + c + '</option>'
        }).join('')
        isFilled = true
    }
}


function renderLine(options) {
    var data = options.data
    var city = options.city
    var lineOption = options.options || {
        el: '#line',
        rect: {
            width: 400,
            height: 300,
            margin: {
                top: 40,
                bottom: 40,
                left: 40,
                right: 40
            }
        }
    }
    data = data.slice(0, 366)
    var values = pickCol(data, city)
    var dates = pickCol(data, '日期')
    var cityData = combineLineData(dates, values)
    lineOption.data = cityData
    Line(lineOption)
}

// 渲染标题
function renderHeader(title) {
    document.getElementById('header').innerHTML = '指标：' + title
}
// 渲染指标选择器
function renderIndicatorSelect() {
    indicatorSelect.innerHTML = Object.keys(resources).map(function(k) {
        return '<option value="' + k + '">' + k + '</option>'
    }).join('')
}
// 初始化
function init() {
    for (var key in resources) {
        (function(key) {
            csv('./scv/' + resources[key], function(error, data) {
                globalData[key] = data.slice(0, 366)
                renderCitySelect(data)
                if (key === 'AQI') {
                    switchIndicatorData(key)
                    renderHeader(key)
                    Calendar({
                        el: '#calendar',
                        data: convertData(indicatorData, '北京'),
                        ranges: [
                            [0, 50],
                            [50, 100],
                            [100, 150],
                            [150, 200],
                            [200, 300]
                        ],
                        width: '80%'
                    })
                }
            })
        })(key);
    }

    renderIndicatorSelect()
    renderTemp()
    bindEvent()
}

function convertData(data, city) {
    city = city || '北京'
    var newData = data.map(function(d) {
        return {
            date: timeFormat.parse(d['日期']),
            value: parseFloat(d[city])
        }
    })
    var mean = d3.mean(newData.map(function(d) { return d.value }))
    return newData.map(function(d) {
        return {
            date: d.date,
            value: isNaN(d.value) ? mean : d.value
        }
    })

}
// 切换指标数据
function switchIndicatorData(key) {
    indicatorData = globalData[key]
    renderLine({
        data: indicatorData,
        city: '北京'
    })
    citySelect.value = '北京'
    var data = combineMapData(indicatorData[0])
    renderCircle(data)
    Bubble({
        data: data.slice().sort(function(a, b) { return b.value - a.value }).slice(0, 10),
        el: '#bubble'
    })

}

function renderTemp() {
    var citySelect = document.getElementById('city-temp')
    csv('./scv/temp.csv', function(error, data) {
        var citys = d3.set(data.map(function(d) { return d['城市'] })).values()
        citySelect.innerHTML = citys.map(function(c) {
            return '<option value="' + c + '">' + c + '</option>'
        })

        citySelect.value = citys[0]

        function getDataByCity(data, city) {
            var subData = data.filter(function(d) {
                return d['城市'] === city
            }).map(function(d) {
                return {
                    date: d['日期'],
                    value: parseFloat(d['气温'])
                }
            })
            var mean = d3.mean(subData.map(function(d) {
                return d.value
            }))
            return subData.map(function(d) {
                return {
                    date: d.date,
                    value: isNaN(d.value) ? mean : d.value
                }
            })
        }

        function renderTempLine() {
            var dataByCity = getDataByCity(data, citySelect.value)
            var width = window.innerWidth * 0.9
            Line({
                el: '#temp-line',
                rect: {
                    width: 0.85 * width,
                    height: 400,
                    margin: {
                        left: 40,
                        right: 40,
                        top: 40,
                        bottom: 40
                    }
                },
                tickNum: 10,
                data: dataByCity
            })
        }


        renderTempLine()

        citySelect.addEventListener('change', function() {
            renderTempLine()
        })


    })
}
// 绑定事件
function bindEvent() {
    // 绑定城市切换事件
    citySelect.addEventListener('change', function(e) {
            var value = this.value
            renderLine({
                data: indicatorData,
                city: value,
            })
            Calendar({
                el: '#calendar',
                data: convertData(globalData['AQI'], value),
                ranges: [
                    [0, 50],
                    [50, 100],
                    [100, 150],
                    [150, 200],
                    [200, 300]
                ],
                width: '80%'
            })
        })
        // 绑定指标切换事件
    indicatorSelect.addEventListener('change', function(e) {
        var value = this.value
        renderHeader(value)
        switchIndicatorData(value)
    })
}

function combineMap(pos, data) {
    return pos.map(function(p) {
        if (!data[p.name]) return null
        return {
            name: p.name,
            lng: p.lng,
            lat: p.lat,
            value: parseFloat(data[p.name]) || 0
        }
    }).filter(function(p) { return p })
}

var combineMapData = combineMap.bind(null, cityPosition)

// 地图上的圆点渲染
function renderCircle(data) {
    // var citysHavePos = cityPosition.map(function (c) { return c.name }).filter(function (c) { return citys.indexOf(c) > -1 })
    var average = d3.sum(data, function(d) { return d.value }) / data.length
    var svg = d3.select('.map').select('svg')
    svg.select('.circle-group').remove()
    svg.append('g')
        .attr("transform", "translate(0,120)")
        .attr('class', 'circle-group')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return projection([d.lng, d.lat])[0] })
        .attr('cy', function(d) { return projection([d.lng, d.lat])[1] })
        .attr('r', function(d) {
            return 4 * (d.value / average + 1)
        })
        .attr('fill', '#69b3a2')
        .attr('stroke', '#eee')
        .attr('fill-opacity', 0.8)
        .on('mouseover', function(d) {
            tooltip.html(d.name + ':' + d.value.toFixed(2))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY + 20) + "px")
                .style("opacity", 1);
        })
        .on('mouseout', function() {
            tooltip.style('opacity', 0)
        })

    svg.select('.circle-label').remove()
    svg.append('g')
        .attr("transform", "translate(0,120)")
        .attr('class', 'circle-label')
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('transform', function(d) {

            var proj = projection([d.lng, d.lat])
            var size = 4 * (d.value / average + 1)

            return 'translate(' + proj[0] + ',' + (proj[1] + size + 10) + ')'
        })
        .text(function(d) { return d.name })
        .attr('font-size', 12)
        .attr('fill', 'white')

}

init()