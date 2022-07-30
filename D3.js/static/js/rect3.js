const data3 = [{
    地区: '北京',
    森林面积: 71.82
}, {
    地区: '天津',
    森林面积: 13.64
}, {
    地区: '河北',
    森林面积: 502.69
}, {
    地区: '山西',
    森林面积: 321.09
}, {
    地区: '内蒙古自治区',
    森林面积: 2614.85
}, {
    地区: '辽宁',
    森林面积: 571.83
}, {
    地区: '吉林',
    森林面积: 784.87
}, {
    地区: '黑龙江',
    森林面积: 1990.46
}, {
    地区: '上海',
    森林面积: 8.9
}, {
    地区: '江苏',
    森林面积: 155.99
}, {
    地区: '浙江',
    森林面积: 604.99
}, {
    地区: '安徽',
    森林面积: 395.85
}, {
    地区: '福建',
    森林面积: 811.58
}, {
    地区: '江西',
    森林面积: 1021.02
}, {
    地区: '山东',
    森林面积: 266.51
}, {
    地区: '河南',
    森林面积: 403.18
}, {
    地区: '湖北',
    森林面积: 736.27
}, {
    地区: '湖南',
    森林面积: 1052.58
}, {
    地区: '广东',
    森林面积: 945.98
}, {
    地区: '广西',
    森林面积: 1429.65
}, {
    地区: '海南',
    森林面积: 194.49
}, {
    地区: '重庆',
    森林面积: 354.97
}, {
    地区: '四川',
    森林面积: 1839.77
}, {
    地区: '贵州',
    森林面积: 771.03
}, {
    地区: '云南',
    森林面积: 2106.16
}, {
    地区: '西藏',
    森林面积: 1490.99
}, {
    地区: '陕西',
    森林面积: 886.84
}, {
    地区: '甘肃',
    森林面积: 509.73
}, {
    地区: '青海',
    森林面积: 419.75
}, {
    地区: '宁夏',
    森林面积: 65.6
}, {
    地区: '新疆',
    森林面积: 802.23
}, ]
const svg7 = d3.select('#fugailv3-3').append('svg')
    .attr('width', 1200)
    .attr('height', 600);
const width2 = 1200;
const height2 = 600;
const margin2 = {
    top: 60,
    bottom: 60,
    left: 60,
    right: 30
};
const innerwidth2 = width2 - margin2.left - margin2.right;
const innerheight2 = height2 - margin2.bottom - margin2.top;

const yScale1 = d3.scaleLinear()
    .domain([d3.max(data3, d => d.森林面积), 0])
    .range([0, innerheight2]);
const xScale1 = d3.scaleBand()
    .domain(data3.map(d => d.地区))
    .range([0, innerwidth2])
    .padding(0.1);
const g2 = svg7.append('g').attr('id', 'maingroup')
    .attr('transform', `translate(${margin2.left},${margin2.top})`);


const xAxis1 = d3.axisBottom(xScale1);
g2.append('g').call(xAxis1).attr('font-size', '7').attr('transform', `translate(0,${innerheight2})`)
    .selectAll("text")
    .attr("dy", ".75em")
    .attr('transform', 'rotate(-14)');;
const yAxis1 = d3.axisLeft(yScale1);
g2.append('g').call(yAxis1);

data3.forEach(d => {
    g2.append('rect')
        .attr('height', innerheight2 * d.森林面积 / 2614.85)
        .attr('width', function(d) {
            return (height2 - margin2.left - margin2.right) / data3.length
        })
        .attr('fill', 'blue')
        .attr('opacity', 0.8)
        .attr('x', xScale(d.地区) + 13)
        .attr('y', innerheight2 - innerheight2 * d.森林面积 / 2614.85)
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
g2.selectAll('text1').data(data3).enter()
    .append('text')
    .attr('fill', 'blue')
    .attr('x', function(d, i) {
        return 18 + (i * 35);
    })
    .attr('y', function(d) {
        return innerHeight - d.森林面积 * innerHeight / 2614.85;
    })
    .attr('font-size', '1em')
    .text(function(d) {
        return d.森林面积;
    })

d3.selectAll('.tick text').attr('font-size', '2em')
g2.append('text').text('森林面积')
    .attr('font-size', '2em')
    .attr('fill', 'orange')
    .attr('transform', `translate(${innerwidth2 / 2},0)`)
    .attr('text-anchor', 'middle')