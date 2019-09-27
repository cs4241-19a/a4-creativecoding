var svg = d3.select('svg')
var margin = { top: 20, right: 20, bottom: 30, left: 80 }
var width = +svg.attr('width') - 200 - margin.left - margin.right
var height = +svg.attr('height') - 150 - margin.top - margin.bottom
var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var x0 = d3.scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1)

var x1 = d3.scaleBand()
  .padding(0.05)

var y = d3.scaleLinear()
  .rangeRound([height, 0])

var z = d3.scaleOrdinal()
  .range(['#D892C1', '#7EADD6', '#3ABBAE', '#7AB96A', '#D8C252', '#F88E6A'])

var retArr = [x0, x1, y, z]

export default retArr
