var ps4data = [];
var xboxdata = [];

const fetchPS4Data = function() {
  fetch("/ps4data", {
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      ps4data = data;
      console.log(ps4data);
    })
    .catch(err => {
      console.log(err);
    });
};

const fetchXboxData = function() {
  fetch("/xboxdata", {
    method: "GET",
    credentials: "include"
  })
    .then(response => response.json())
    .then(data => {
      xboxdata = data;
    })
    .then(function() {
      visualize();
    })
    .catch(err => {
      console.log(err);
    });
};

const svgHeight = 300,
  svgWidth = 1000,
  minYear = 2012.5,
  maxYear = 2019.5,
  maxSales = 20,
  minSales = 0,
  circleSize = 8;

// Takes in a value and returns a custom color based on the value
const customColor = function(value) {
  let r = Math.pow(value, 2) * 5;
  let g = 0;
  let b = Math.pow(value, 2) * 5;
  return `rgb(${r}, ${g}, ${b})`;
};

const visualize = function() {
  var svg = d3
    .select(".sales")
    .attr("width", svgWidth)
    .attr("height", svgHeight + 20);

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip-donut")
    .text( function() {
      return "yo"
    })
    .style("opacity", 0);

  // The scale converts the data from the input domain, to an output range
  // These functions map an input domain to an output range. https://www.dashingd3js.com/d3js-scales
  var xScale = d3
    .scaleLinear()
    .domain([minYear, maxYear])
    .range([0, svgWidth]);

  var yScale = d3
    .scaleLinear()
    .domain([maxSales, minSales])
    .range([0, svgHeight]);

  var yAxisScale = d3 // custom axis for the scale so we can invert it
    .scaleLinear()
    .domain([maxSales, minSales])
    .range([0, svgHeight]);

  const xAxisTicks = xScale.ticks().filter(tick => Number.isInteger(tick));

  var xAxis = d3
    .axisBottom(xScale)
    .tickValues(xAxisTicks) // remove non-integer ticks
    .tickFormat(d3.format("d"));

  var yAxis = d3.axisRight(yAxisScale);

  svg
    .append("g")
    .attr("transform", `translate(0, ${svgHeight})`) // use backtick for template literals, very cool :D
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(yAxis);

  var barChart = svg
    .selectAll("circle")
    .data(ps4data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return xScale(d.Year);
    })
    .attr("cy", function(d) {
      return yScale(d.Europe);
    })
    .attr("r", circleSize + "px")
    .attr("fill", function(d) {
      return customColor(d.Europe);
    })
    .on("mouseover", function(d, i) {
      d3.select(this)
        .transition()
        .duration(50)
        .attr("opacity", .5);

      
        // Make the div appear with the game and value
      div
        .transition()
        .duration("50")
        .style("opacity", 1);
      
        // Assign the div the game and value
      div.html(d.Game + ": " + d.Europe);
    })
    .on("mouseout", function(d, i) {
      d3.select(this)
        .transition()
        .duration(50)
        .attr("opacity", 1);

      div
        .transition()
        .duration("50")
        .style("opacity", 0);
    });
};

window.onload = function() {
  fetchPS4Data();
  fetchXboxData();
};
