const data1 = [{
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
const svg5 = d3.select('#fugailv3-1').append('svg')
    .attr('width', 1200)
    .attr('height', 600);
const width = 1200;
const height = 600;
const margin = {
    top: 60,
    bottom: 60,
    left: 40,
    right: 30
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.bottom - margin.top;

const yScale = d3.scaleLinear()
    .domain([100, 0])
    .range([0, innerHeight]);
const xScale = d3.scaleBand()
    .domain(data1.map(d => d.地区))
    .range([0, innerWidth])
    .padding(0.1);
const g = svg5.append('g').attr('id', 'maingroup')
    .attr('transform', `translate(${margin.left},${margin.top})`);


const xAxis = d3.axisBottom(xScale);
g.append('g').call(xAxis).attr('font-size', '7').attr('transform', `translate(0,${innerHeight})`)
    .selectAll("text")
    .attr("dy", ".75em")
    .attr('transform', 'rotate(-14)');;
const yAxis = d3.axisLeft(yScale);
g.append('g').call(yAxis);

data1.forEach(d => {
    g.append('rect')
        .attr('height', innerHeight * 0.01 * d.森林覆盖率)
        .attr('width', function(d) {
            return (height - margin.left - margin.right) / data1.length
        })
        .attr('fill', 'blue')
        .attr('opacity', 0.8)
        .attr('x', xScale(d.地区) + 8)
        .attr('y', innerHeight - innerHeight * d.森林覆盖率 * 0.01)
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
g.selectAll('text1').data(data1).enter()
    .append('text')
    .attr('fill', 'blue')
    .attr('x', function(d, i) {
        return 8 + (i * 36);
    })
    .attr('y', function(d) {
        return innerHeight - d.森林覆盖率 * innerHeight * 0.01;
    })
    .attr('font-size', '1em')
    .text(function(d) {
        return d.森林覆盖率;
    })

d3.selectAll('.tick text').attr('font-size', '2em')
g.append('text').text('森林覆盖率')
    .attr('font-size', '2em')
    .attr('fill', 'orange')
    .attr('transform', `translate(${innerWidth / 2},0)`)
    .attr('text-anchor', 'middle')