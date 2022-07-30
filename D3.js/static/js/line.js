/**
 * 生成折线图
 * @param {object} options 配置项
 * @param {object} options.rect 图形的宽高边距
 * @param {string} options.el dom选择器
 * @param {object} options.data 数据
 */
function Line(options) {
  var rect = options.rect
  var el = options.el
  var data = options.data
  var margin = rect.margin
  var width = rect.width - margin.left - margin.right
  var height = rect.height - margin.top - margin.bottom
  var tickNum = options.tickNum || 5
  var dataCopy = data.map(function (d) {
    return {
      date: timeFormat.parse(d.date),
      value: parseFloat(d.value)
    }
  })
  var dates = pickCol(dataCopy, 'date')
  var values = pickCol(dataCopy, 'value')

  var svg = d3.select(el)
    .html('')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
  var x = d3.time.scale().domain(d3.extent(dates)).range([0, width]).nice()
  var y = d3.scale.linear().domain(d3.extent(values)).range([0, height]).nice()
  var interpolate = d3.interpolate.apply(d3, d3.extent(values))
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.svg.axis()
      .scale(x)
      .ticks(tickNum)
      .tickFormat(d3.time.format('%m%d'))
      .orient('bottom')
    )

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,0)')
    .call(d3.svg.axis().scale(y.range([height, 0])).orient('left'))

  svg.append('path')
    .datum(dataCopy)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('d', d3.svg.line()
      .x(function (d) {
        return x(d.date);
      })
      .y(function (d) {
        if (isNaN(d.value)) return interpolate(0.5)
        return y(d.value)
      })
    )

}