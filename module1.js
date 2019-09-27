export default function seperateData () {
  var svg = d3.select('svg')
  var margin = { top: 20, right: 20, bottom: 30, left: 80 }
  var width = +svg.attr('width') - 200 - margin.left - margin.right
  var height = +svg.attr('height') - 150 - margin.top - margin.bottom
  var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var i
  for (i = 1; i < 600; i = i + 70) {
    svg.append('line')
      .style('stroke', 'gray')
      .attr('x1', 150 + i) // x position of the first end of the line
      .attr('y1', 20) // y position of the first end of the line
      .attr('x2', 150 + i) // x position of the second end of the line
      .attr('y2', height + 170) // y position of the second end of the line
      .style('stroke-dasharray', ('10, 12')) // <== This line here!!
  }
}
