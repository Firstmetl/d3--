// var colors = d3.range(20).map(d3.scale.category20())
var count = 6
var colors = d3.range(count).map(function(d) { return (d + 1) / count }).map(d3.interpolateRgb('#aec7e8', '#ff7f0e'))
    /**
     * 数据范围映射成颜色值
     * @param {number} val 数值
     * @param {array} ranges 范围数组 [[0,50], [50,100],...]
     */
function colorRange(val, ranges) {
    var index = 0
    var result = ranges.some(function(range, i) {
        if (range[0] <= val && range[1] > val) {
            index = i
            return true
        }
        return false
    })
    if (!result) {
        index = ranges.length - 1
    }
    return colors[index]
}
// 生成日历组件
function Calendar(option) {
    var container = d3.select(option.el)
    var xOffset = 20
    var yOffset = 60
    var calY = 50
    var calX = 25
    var cellSize = 20
    var width = option.width || '100%'
    var height = option.height || 400
    var data = option.data
    var weekDay = ['日', '一', '二', '三', '四', '五', '六']
    var ranges = option.ranges
    var colorScale = function(val) {
        return colorRange(val, ranges)
    }
    var monthGap = 1


    container.select('svg').remove()
    var svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
    svg.append('g')
        .attr('class', 'cal')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('x', function(d) {
            return xOffset + calX + (d3.time.weekOfYear(d.date) * cellSize) + monthGap * (d.date.getMonth())
        })
        .attr('y', function(d) { return calY + (d.date.getDay() * cellSize) })
        .attr('fill', function(d) { return colorScale(d.value) })
    svg.append('g')
        .attr('class', 'week-label')
        .selectAll('text')
        .data(weekDay)
        .enter()
        .append('text')
        .attr('x', 10)
        .attr('y', function(d, i) {
            return calY + (cellSize * i) + (cellSize * 4 / 5)
        })
        .text(function(d) { return d })
    svg.append('g')
        .attr('class', 'month-label')
        .selectAll('text')
        .data(d3.range(1, 13))
        .enter()
        .append('text')
        .attr('y', 32)
        .attr('x', function(d, i) {
            return xOffset + calX + (((4 * cellSize + 8) * i) + (5 * cellSize / 2))
        })
        .text(function(d) {
            return d + ' 月'
        })
    var legendWidth = 120
    var legend = svg.append('g')
        .attr('class', 'legend')
        .selectAll('g')
        .data(ranges)
        .enter()
        .append('g')
        .attr('transform', function(d, i) {
            return 'translate(' + (i * legendWidth + xOffset + calX) + ', ' + (calY + 7 * cellSize + 40) + ')'
        })
    legend.append('rect')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('fill', function(d, i) { return colors[i] })
    legend.append('text')
        .attr('x', cellSize + 10)
        .attr('y', 16)
        .text(function(d) {
            return d.join('~')
        })
}