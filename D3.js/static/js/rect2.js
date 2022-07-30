const data2 = [{
    地区: '北京',
    人工林面积: 43.48
}, {
    地区: '天津',
    人工林面积: 12.98
}, {
    地区: '河北',
    人工林面积: 263.54
}, {
    地区: '山西',
    人工林面积: 167.63
}, {
    地区: '内蒙古自治区',
    人工林面积: 600.01
}, {
    地区: '辽宁',
    人工林面积: 315.32
}, {
    地区: '吉林',
    人工林面积: 175.94
}, {
    地区: '黑龙江',
    人工林面积: 243.26
}, {
    地区: '上海',
    人工林面积: 8.9
}, {
    地区: '江苏',
    人工林面积: 150.83
}, {
    地区: '浙江',
    人工林面积: 244.69
}, {
    地区: '安徽',
    人工林面积: 232.91
}, {
    地区: '福建',
    人工林面积: 385.59
}, {
    地区: '江西',
    人工林面积: 368.7
}, {
    地区: '山东',
    人工林面积: 256.11
}, {
    地区: '河南',
    人工林面积: 245.78
}, {
    地区: '湖北',
    人工林面积: 197.42
}, {
    地区: '湖南',
    人工林面积: 501.51
}, {
    地区: '广东',
    人工林面积: 615.51
}, {
    地区: '广西',
    人工林面积: 733.53
}, {
    地区: '海南',
    人工林面积: 140.4
}, {
    地区: '重庆',
    人工林面积: 95.93
}, {
    地区: '四川',
    人工林面积: 502.22
}, {
    地区: '贵州',
    人工林面积: 315.45
}, {
    地区: '云南',
    人工林面积: 507.68
}, {
    地区: '西藏',
    人工林面积: 7.84
}, {
    地区: '陕西',
    人工林面积: 310.53
}, {
    地区: '甘肃',
    人工林面积: 126.56
}, {
    地区: '青海',
    人工林面积: 19.1
}, {
    地区: '宁夏',
    人工林面积: 43.55
}, {
    地区: '新疆',
    人工林面积: 121.42
}, ]
const svg6 = d3.select('#fugailv3-2').append('svg')
    .attr('width', 1200)
    .attr('height', 600);
const width1 = 1200;
const height1 = 600;
const margin1 = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 30
};
const innerWidth1 = width1 - margin1.left - margin1.right;
const innerHeight1 = height1 - margin1.bottom - margin1.top;

const yScale2 = d3.scaleLinear()
    .domain([d3.max(data2, d => d.人工林面积), 0])
    .range([0, innerHeight1]);
const xScale2 = d3.scaleBand()
    .domain(data2.map(d => d.地区))
    .range([0, innerWidth1])
    .padding(0.1);
const g1 = svg6.append('g').attr('id', 'maingroup')
    .attr('transform', `translate(${margin1.left},${margin1.top})`);


const xAxis2 = d3.axisBottom(xScale2);
g1.append('g').call(xAxis2).attr('font-size', '7').attr('transform', `translate(0,${innerHeight1})`)
    .selectAll("text")
    .attr("dy", ".75em")
    .attr('transform', 'rotate(-14)');;
const yAxis2 = d3.axisLeft(yScale2);
g1.append('g').call(yAxis2);

data2.forEach(d => {
    g1.append('rect')
        .attr('height', innerHeight1 * d.人工林面积 / 733.53)
        .attr('width', function(d) {
            return (height1 - margin1.left - margin1.right) / data2.length
        })
        .attr('fill', 'blue')
        .attr('opacity', 0.8)
        .attr('x', xScale2(d.地区) + 13)
        .attr('y', innerHeight1 - innerHeight1 * d.人工林面积 / 733.53)
        .on("mouseover", function(d, i) {
            d3.select(this)
                .attr("fill", "yellow");
        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", "blue");
        });
});
g1.selectAll('text1').data(data2).enter()
    .append('text')
    .attr('fill', 'blue')
    .attr('x', function(d, i) {
        return 18 + (i * 35);
    })
    .attr('y', function(d) {
        return innerHeight1 - d.人工林面积 * innerHeight1 / 733.53;
    })
    .attr('font-size', '1em')
    .text(function(d) {
        return d.人工林面积;
    })

d3.selectAll('.tick text').attr('font-size', '2em')
g1.append('text').text('人工林面积')
    .attr('font-size', '2em')
    .attr('fill', 'orange')
    .attr('transform', `translate(${innerWidth1 / 2},0)`)
    .attr('text-anchor', 'middle')