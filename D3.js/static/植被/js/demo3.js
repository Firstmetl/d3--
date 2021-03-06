function demo3() {
    const svg = d3.select('#mainsvg');
    const width = svg.attr('width');
    const height = svg.attr('height');
    const margin = {
        top: 60,
        bottom: 60,
        left: 150,
        right: 50
    }
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const g = svg.append('g').attr('id', 'maingroup')
        .attr('transform', `translate(${margin.left},${margin.top})`)
    const data = [{
        地区: '北京',
        森林覆盖率: 43.8
    }, {
        地区: '天津',
        森林覆盖率: 12.1
    }, {
        地区: '河北',
        森林覆盖率: 26.8
    }, {
        地区: '山西',
        森林覆盖率: 20.5
    }, {
        地区: '内蒙古自治区',
        森林覆盖率: 22.1
    }, {
        地区: '辽宁',
        森林覆盖率: 39.2
    }, {
        地区: '吉林',
        森林覆盖率: 41.5
    }, {
        地区: '黑龙江',
        森林覆盖率: 43.8
    }, {
        地区: '上海',
        森林覆盖率: 14
    }, {
        地区: '江苏',
        森林覆盖率: 15.2
    }, {
        地区: '浙江',
        森林覆盖率: 59.4
    }, {
        地区: '安徽',
        森林覆盖率: 28.7
    }, {
        地区: '福建',
        森林覆盖率: 66.8
    }, {
        地区: '江西',
        森林覆盖率: 61.2
    }, {
        地区: '山东',
        森林覆盖率: 17.5
    }, {
        地区: '河南',
        森林覆盖率: 24.1
    }, {
        地区: '湖北',
        森林覆盖率: 39.6
    }, {
        地区: '湖南',
        森林覆盖率: 49.7
    }, {
        地区: '广东',
        森林覆盖率: 53.5
    }, {
        地区: '广西',
        森林覆盖率: 60.2
    }, {
        地区: '海南',
        森林覆盖率: 57.4
    }, {
        地区: '重庆',
        森林覆盖率: 43.1
    }, {
        地区: '四川',
        森林覆盖率: 38
    }, {
        地区: '贵州',
        森林覆盖率: 43.8
    }, {
        地区: '云南',
        森林覆盖率: 55
    }, {
        地区: '西藏',
        森林覆盖率: 12.1
    }, {
        地区: '陕西',
        森林覆盖率: 43.1
    }, {
        地区: '甘肃',
        森林覆盖率: 11.3
    }, {
        地区: '青海',
        森林覆盖率: 5.8
    }, {
        地区: '宁夏',
        森林覆盖率: 12.6
    }, {
        地区: '新疆',
        森林覆盖率: 4.9
    }, ]
    var color = d3.scaleLinear()
        .domain([d3.min(data, d => d.森林覆盖率), d3.max(data, d => d.森林覆盖率)])
        .range(['green', 'blue']);
    g.selectAll('rect').data(data).enter()
        .append('rect')
        .attr('height', function(d) {
            return d.森林覆盖率 * 10;
        })
        .attr('width', 50)
        .attr('x', function(d, i) {
            return i * 60;
        })
        .attr('y', function(d) {
            return innerHeight - d.森林覆盖率 * 10 - 40;
        })
        .attr('fill', function(d, i) {
            return color(i)
        })
        .on("mouseover", function(d, i) {
            d3.select(this)
                .attr("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .transition()
                .duration(10)
                .attr("fill", function(d, i) {
                    return color(i)
                });
        });
    g.selectAll('text').data(data).enter()
        .append('text')
        .attr('fill', 'black')
        .attr('x', function(d, i) {
            return i * 60 + 10;
        })
        .attr('y', function(d) {
            return innerHeight - 20;
        })
        .text(function(d) {
            return d.地区;
        })
        .attr('font-size', '1em');
    g.selectAll('text1').data(data).enter()
        .append('text')
        .attr('fill', 'blue')
        .attr('x', function(d, i) {
            return i * 60;
        })
        .attr('y', function(d) {
            return innerHeight - d.森林覆盖率 * 10 - 40;
        })
        .attr('font-size', '1.5em')
        .text(function(d) {
            return d.森林覆盖率;
        })

    function sort_by_ascending() {
        data.sort(d3.ascending);
        update_bar_chart(data => d.森林覆盖率);
    }

}