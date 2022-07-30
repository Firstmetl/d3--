var width = 1000;
var height = 1000;

var svg4 = d3.select("#fugailv-map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(100,0)");
var tooltip4 = d3.select("body")
    .append("div")
    .attr("opacity", 0.0)
    .attr("class", "tooltip");

var projection4 = d3.geo.mercator()
    .center([107, 31])
    .scale(850)
    .translate([width / 2, height / 2]);

var path4 = d3.geo.path()
    .projection(projection4);


var color = d3.scale.category20();


d3.json("../js/china.json", function(error, root) {

    if (error)
        return console.error(error);
    console.log(root.features);

    svg4.selectAll("path")
        .data(root.features)
        .enter()
        .append("path")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("fill", '#ccc')
        .attr("d", path4)
    svg4.selectAll("text")
        .data(root.features)
        .enter()
        .append("text")
        //设置各个文本（省份名称）显示的文字
        .attr("transform", function(d, i) {
            if (d.properties.id == "20") //河北
            {
                return "translate(" + (path4.centroid(d)[0]) + "," + (path4.centroid(d)[1]) + ")";
            }
            return "translate(" + (path4.centroid(d)[0] - 10) + "," + path4.centroid(d)[1] + ")";
        })

    /* 	.attr("x", function(d) { 
                   return (path.centroid(d)[0]-10);
               
           })
         .attr("y", function(d) { 
         
             if(d.properties.id =="20") //河北
               {
                   return (path.centroid(d)[1]+30);
               }
                 return (path.centroid(d)[1]);
         
          })   */
    //显示省名
    .text(function(d) {
            return d.properties.name;
        })
        .attr("font-size", 12);


    d3.csv("../scv/森林覆盖率.csv", function(error, dataset) {
        console.log(dataset)
            //将数据保存在数组中,(数组索引号为各省的名称)
        var datas = [];
        var datam = [];
        for (var i = 0; i < dataset.length; i++) {
            var name = dataset[i].地区;
            var value = dataset[i].森林覆盖率;
            datas[name] = value; //例如 datas[北京]=14149
            datam.push(value); //datam 数组用于求中间值

        }

        console.log("datas--------------------------------");
        console.log(datas);
        console.log("datam--------------------------------");
        console.log(datam);

        //取出数据中的最大值和最小值
        var maxdata = 100;
        var mindata = 0;

        //定义一个线性比例尺
        var linear = d3.scale.linear()
            .domain([mindata, maxdata])
            .range([0, 2]);

        //定义颜色
        var b = d3.rgb(34, 139, 34);
        var a = d3.rgb(255, 255, 180);

        //设置颜色插值
        var color = d3.interpolate(a, b);


        svg4.selectAll('path').attr('fill', function(d, i) {
                var t = linear(datas[d.properties.name]);
                var col = color(t);
                return col.toString();
            })
            //提示框
            .on("mouseover", function(d, i) {
                d3.select(this).attr("fill", "#ccc");

                tooltip4.html(d.properties.name + ":" + datas[d.properties.name])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity", 1.0);
            })
            .on("mouseout", function(d, i) {
                d3.select(this).attr('fill', function(d, i) {
                    var t = linear(datas[d.properties.name]);
                    var col = color(t);
                    return col.toString();
                })

                tooltip.style("opacity", 0.0);
            });

        //显示渐变矩形条
        var defs = svg4.append("defs");

        var linearGradient = defs.append("linearGradient")
            .attr("id", "linearColor4")
            //颜色渐变方向
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        //设置矩形条开始颜色
        var stop1 = linearGradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", a.toString());
        //设置结束颜色
        var stop2 = linearGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", b.toString());

        var colorRect1 = svg4.append("rect")
            //x,y 矩形的左上角坐标
            .attr("x", 50)
            .attr("y", 50)
            //矩形的宽高
            .attr("width", 200)
            .attr("height", 20)
            //引用上面的id 设置颜色
            .style("fill", "url(#" + linearGradient.attr("id") + ")");
        //设置文字

        //数据初值
        var startText = svg4.append("text")
            .attr("x", 50)
            .attr("y", 45)
            .text(mindata);
        //数据中间值
        var middleText = svg4.append("text")
            .attr("x", 125)
            .attr("y", 45)
            .text(
                50 //中间值
            );
        //数据末值
        var endText = svg4.append("text")
            .attr("x", 250)
            .attr("y", 45)
            .text(maxdata);
        var tickText = svg4.append('text')
            .attr('x', 50)
            .attr('y', 85)
            .attr('fill', 'green')
            .text('森林面积')
    });
});