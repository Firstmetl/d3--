var width = 1000;
var height = 750;
var isMapRendered = false


var svg = d3.select(".map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0,120)");
var tooltip = d3.select("body")
    .append("div")
    .attr("opacity", 0.0)
    .attr("class", "tooltip");

var projection = d3.geo.mercator()
    .center([107, 31])
    .scale(850)
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .projection(projection);


d3.json("./js/china.json", function(error, root) {

    if (error)
        return console.error(error);
    // console.log(root.features);

    svg.selectAll("path")
        .data(root.features)
        .enter()
        .append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", '#69c')
        .attr("d", path)
    svg.selectAll("text")
        .data(root.features)
        .enter()
        .append("text")
        //设置各个文本（省份名称）显示的文字
        .attr("transform", function(d, i) {
            if (d.properties.id == "20") //河北
            {
                return "translate(" + (path.centroid(d)[0]) + "," + (path.centroid(d)[1]) + ")";
            }
            return "translate(" + (path.centroid(d)[0] - 10) + "," + path.centroid(d)[1] + ")";
        })
        //显示省名
        .text(function(d) {
            return d.properties.name;
        })
        .attr("font-size", 12);

    isMapRendered = true

});