function Bubble(options) {
  var data = { children: options.data }
  var el = options.el
  var width = options.width || 500
  var height = options.height || 400
  var pack = d3.layout.pack();
  pack = pack.padding(2).size([400, 300]).sort(function (a, b) { return b.value - a.value; });
  var nodes = pack.nodes(data);
  nodes = nodes.filter(function (d) { return d.parent; });
  var color = d3.scale.category20();
  var container = d3.select(el)
  container.selectAll('svg').remove()
  var svg = container.append('svg')
    .attr('width', width)
    .attr('height', height)
  svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr({
      cx: function (d) { return d.x; },
      cy: function (d) { return d.y; },
      r: function (d) { return d.r; },
      fill: function () { return color(Math.floor(Math.random() * 20) % 20) },
      stroke: "none",
    });

  svg.selectAll("text").data(nodes).enter()
    .append("text")
    .attr({
      x: function (d) { return d.x; },
      y: function (d) { return d.y; },
      "text-anchor": "middle",
    })
    .text(function (d) { return d.name })
    .attr('font-size', '16')
    .attr('fill', '#fff')
}