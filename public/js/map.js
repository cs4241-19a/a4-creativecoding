import * as data from './data.js'

/*************************************************************************************
 *                                                                                   *
 *                                  MAP Maker                                        *
 *                                                                                   *
 *************************************************************************************/

// global vars to hold shift and scale
var centerShift = [-97.5, 41]
var scale = 1000

// function to get shift
const getShift = function () {
  console.log('getting shift of ' + centerShift)
  return centerShift
}

// function to getScale
const getScale = function () {
  console.log('getting scale of ' + scale)
  return scale
}

const makeMap = function () {
  this.pointSize = 5
  this.pointColor = 'red'
  this.stateColor = 'rgb(' + 181 + ',' + 210 + ',' + 214 + ')'
  this.titleBackground = 'white'
  this.stateBorders = 'rgb(' + 71 + ',' + 186 + ',' + 224 + ')'
  this.titleTextColor = 'black'

  // Create SVG element and append map to the SVG
  var svg = d3.select('svg')

  // set projection
  var projection = d3.geoMercator()

  var path = d3.geoPath()

  var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  d3.json('https://d3js.org/us-10m.v2.json', function (error, us) {
    if (error) throw error

    svg.append('g')
      .attr('class', 'states')
      .selectAll('path')
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append('path')
      .attr('d', path)

    svg.append('path')
      .attr('class', 'state-borders')
      .attr('d', path(topojson.mesh(us, us.objects.states, function (a, b) { return a !== b })))

    // adjust scale
    projection
      .scale(getScale())
      .center(getShift())

    // add circles to svg
    svg.selectAll('circle')
      .data(data.earthquakeData)
      .enter()
      .append('circle')
      .attr('cx', function (d) { console.log(d.coordinates); return projection(d.coordinates)[0] })
      .attr('cy', function (d) { return projection(d.coordinates)[1] })
      // adjust circle size
      .attr('r', this.pointSize + 'px')
      // change circle color
      .attr('fill', 'red')
      .on('mouseover', function (d) {
        div.transition()
          .duration(200)
          .style('opacity', 1)
        div.html(d.place)
          .style('left', (d3.event.pageX + 15) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px')
        console.log('mouseover')
      })
      .on('mouseout', function (d) {
        div.transition()
          .duration(500)
          .style('opacity', 0)   
      })
      .on('click', function (d) {
        window.open(d.url)
      })

    this.updateSize = function () {
      svg.selectAll('circle')
        .attr('r', this.pointSize + 'px')
      console.log(this.pointSize)
    }

    this.updateColor = function () {
      svg.selectAll('circle')
        .attr('fill', this.pointColor)
      console.log(this.pointSize)
    }

    this.changeStateBorders = function () {
      svg.selectAll('path')
        .attr('stroke', this.stateBorders)
    }

    this.changeInfoBackground = function () {
      d3.select('body').select('div')
        .attr('style', 'background: ' + this.titleBackground)
    }

    this.changeInfoTextColor = function () {
      d3.select('body').select('div')
        .attr('style', 'color: ' + this.titleTextColor)
    }

    this.changeStateColor = function () {
      svg.select('g')
        .attr('style', 'fill: ' + this.stateColor)
    }
  }.bind(this))
}

export { makeMap, getScale, getShift } // add one more function
