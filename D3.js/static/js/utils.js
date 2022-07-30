var csv = d3.dsv(',', 'text/csv;charset=gb2312')

function pickCol(data, colName) {
  return data.map(function (d) {
    return d[colName]
  })
}

function getCitys(data) {
  var row, citys = []
  if (data.length) {
    row = data[0]
    citys = Object.keys(row).filter(function (k) {
      return k !== '日期'
    })
  }
  return citys
}

var timeFormat = d3.time.format('%Y%m%d')
function combineLineData(dates, data) {
  return dates.map(function (d, i) {
    return {
      date: d,
      value: data[i]
    }
  })
}