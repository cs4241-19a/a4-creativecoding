(function () { function r (e, n, t) { function o (i, f) { if (!n[i]) { if (!e[i]) { var c = typeof require === 'function' && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = 'MODULE_NOT_FOUND', a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = typeof require === 'function' && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    function myFunction () {
      alert('To change the scale of the graph, select a gray circle on the right hand side of the graph. Any data that exceeds the scale will be more transparent. Note the change in Y-axis.  Hover over any bar to see the production details on the right, under the graph scaling options.')
    }

    function resetData () {
      console.log('Graphhh')
      createGraph(-1, 'All')
    }

    window.open('/instructions.html', 'popUpWindow',
     	'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')

    globalY = -1

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

    var myData = 'https://gist.githubusercontent.com/dkaravoussianis/0516292448e2518d93eb09fe54cbaccb/raw/63f86a6fc9f42a600d887932c414f69461db77ac/modifiedDataProtein2.csv'
    d3.csv(myData, function (d, i, columns) {
      for (var i = 1, n = columns.length; i < n; ++i) { d[columns[i]] = +d[columns[i]] }
      return d
    }, function (error, data) {
      if (error) throw error

      var keys = data.columns.slice(1)

      createGraph(-1, 'All')

      function createGraph (yVal, Animal) {
      // remove the previous display
        svg.selectAll('rect').remove()
        g.selectAll('axis').remove()
        g.selectAll('text').remove()
        g.selectAll('g').remove()

        x0.domain(data.map(function (d) { console.log(d); return d.Region }))
        x1.domain(keys).rangeRound([0, x0.bandwidth()])
        if (yVal == -1) {
          y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key] }) })]).nice()
        } else {
		 y.domain([0, yVal])
        }
        g.append('g')
          .selectAll('g')
          .data(data)
          .enter().append('g')
          .attr('transform', function (d) { return 'translate(' + x0(d.Region) + ',0)' })
          .selectAll('rect')
          .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key], region: d.Region } }) })
          .enter().append('rect')
          .attr('x', function (d) { return x1(d.key) })
          .attr('y', function (d) { return y(d.value) })
          .attr('width', x1.bandwidth())
          .attr('height', function (d) { return height - y(d.value) })
          .attr('fill', function (d) { return z(d.key) })
          .style('stroke', 'black')
          .style('stroke-width', 0.5)
          .attr('opacity', function (d) {
            if (d.value > yVal && yVal != -1) {
              return 0.15
            } else if (Animal != d.key && Animal != 'All') {
              return 0
            } else { return 1 }
          })
          .on('mouseover', function (d) {
            console.log(d)
            var xPosition = parseFloat(d3.select(this).attr('x') + x0.bandwidth() + x0(d.region))
            var yPosition = parseFloat(d3.select(this).attr('y')) / 2 + height / 2

            d3.select('#tooltip')
              .style('left', 800 + 'px')
              .style('top', 350 + 'px')
              .select('#value')
              .html('Region: ' + d.region + '</br>' + ' Animal: ' + d.key + '<br/>Production: ' + numberWithCommas(d.value) + ' kg protein')

            //	console.log(x0.domain);
            d3.select('#tooltip').classed('hidden', false)
	   })
	   .on('mouseout', function () {
            d3.select('#tooltip').classed('hidden', true)
	   })

        g.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x0))
          .selectAll('text')
          .attr('transform', 'rotate(90)')
          .style('text-anchor', 'start')
          .on('click', function (d) { console.log('clicked ' + d) })

        g.append('g')
          .attr('class', 'axis')
          .call(d3.axisLeft(y))
          .append('text')
          .attr('x', 2)
          .attr('y', y(y.ticks().pop()) + 0.5)
          .attr('dy', '0.32em')
          .attr('fill', '#000')
          .attr('font-weight', 'bold')
          .attr('text-anchor', 'start')
          .attr('transform', 'translate(0,' + -10 + ')')
          .text('Production (kg Protein)')

        var legend = g.append('g')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('text-anchor', 'end')
          .selectAll('g')
          .data(keys.slice().reverse())
          .enter().append('g')
          .attr('transform', function (d, i) { return 'translate(' + 140 + ',' + i * 20 + ')' })

        legend.append('rect')
          .attr('x', width - 19)
          .attr('width', 19)
          .attr('height', 19)
          .style('stroke', 'black')
          .style('stroke-width', 0.5)
          .attr('fill', z)
          .on('click', function (clickVal) {
            createGraph(globalY, clickVal)
          })

        legend.append('text')
          .attr('x', width - 24)
          .attr('y', 9.5)
          .attr('dy', '0.32em')
          .text(function (d) { return d })

        var legend2 = g.append('g')
          .attr('font-family', 'sans-serif')
          .attr('font-size', 10)
          .attr('text-anchor', 'end')
          .selectAll('g')
          .data(['All Data', 'Under 15,000,000,000', 'Under 9,000,000,000', 'Under 2,000,000,000'])
          .enter().append('g')
          .attr('transform', function (d, i) { return 'translate(' + 150 + ',' + (150 + (i * 20)) + ')' })

        legend2.append('circle')
          .attr('cx', width - 19)
          .attr('r', 10)
          .attr('fill', 'grey')
          .on('click', function (d) {
            if (d == 'All Data') {
              yVal = -1; createGraph(yVal, 'All')
              glabalY = yVal
            }
            if (d == 'Under 15,000,000,000') {
              yVal = 15000000000; createGraph(yVal, 'All')
              glabalY = yVal
            }
            if (d == 'Under 9,000,000,000') {
              yVal = 9000000000; createGraph(yVal, 'All')
              glabalY = yVal
            }
            if (d == 'Under 2,000,000,000') {
              yVal = 2000000000; createGraph(yVal, 'All')
              glabalY = yVal
            }
          })

        legend2.append('text')
          .attr('x', width - 40)
          .attr('y', 0)
          .attr('dy', '0.32em')
          .text(function (d, i) { return d })

        seperateData()
      }
    })
    // function that creates gridlines to help seperate the different regions
    function seperateData () {
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

    function numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    document.onkeydown = function (e) {
      e = e || window.event
      var key = e.which || e.keyCode
      if (key === 191) {
      //   console.log("Key Pressed");
      //   createGraph(-1, "All");
        window.open('/instructions.html', 'popUpWindow',
     	'height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
      }

      if (key === 82) {
    	location.reload()
      }

      if (key === 66) {
    	if (document.getElementById('bio').style.visibility == 'visible') {
    		document.getElementById('bio').style.visibility = 'hidden'
    	} else {
    		document.getElementById('bio').style.visibility = 'visible'
    	}
      }
    }
  // });
  }, {}]
}, {}, [1])
