

var ps4data = [];
var xboxdata = [];

/* let vars = {
  svgHeight: 300,
  svgWidth: 1000,
  minYear: 2012.5,
  maxYear: 2019.5,
  maxSales: 20,
  minSales: 0,
  circleSize: 8
}; */

const closeHelper = function() {
  var helperText = document.getElementById("helper-text")
  if(helperText.style.opacity == 0.0) {
    helperText.style.opacity = 1
  } else {
    helperText.style.opacity = 0
  }
}

const fetchPS4Data = function() {
  return new Promise(
    function(resolve, reject) {
      fetch("/ps4data", {
        credentials: "include"
      })
        .then(response => response.json())
        .then(data => {
          ps4data = data
          resolve("done")
        })
        .catch(err => {
          reject("error")
          console.log(err);
        });
    }
  )
  
};

const fetchXboxData = function() {
  return new Promise(
    function(resolve, reject) {
      fetch("/xboxdata", {
        method: "GET",
        credentials: "include"
      })
        .then(response => response.json())
        .then(data => {
          xboxdata = data;
          resolve("done")
        })
        .catch(err => {
          reject("error")
          console.log(err);
        });
    }
  )
};



// Takes in a value and returns a custom color based on the value
const customColor = function(value) {
  let r = Math.pow(value, 2) * 5;
  let g = 0;
  let b = Math.pow(value, 2) * 5;
  return `rgb(${r}, ${g}, ${b})`;
};



var visualize = function() {
    this.svgHeight = 300;
    this.svgWidth = 1000;
    this.minYear = 2012.5;
    this.maxYear = 2019.5;
    this.minSales = 0;
    this.maxSales = 20;
    this.circleSize = 8;

  var svg = d3
    .select(".sales")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight + 20);

  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .text( function() {
      return "yo"
    })
    .style("opacity", 0);

  // The scale converts the data from the input domain, to an output range
  // These functions map an input domain to an output range. https://www.dashingd3js.com/d3js-scales
  var xScale = d3
    .scaleLinear()
    .domain([this.minYear, this.maxYear])
    .range([0, this.svgWidth]);

  var yScale = d3
    .scaleLinear()
    .domain([this.maxSales, this.minSales])
    .range([0, this.svgHeight]);

  var yAxisScale = d3 // custom axis for the scale so we can invert it
    .scaleLinear()
    .domain([this.maxSales, this.minSales])
    .range([0, this.svgHeight]);

  const xAxisTicks = xScale.ticks().filter(tick => Number.isInteger(tick));

  var xAxis = d3
    .axisBottom(xScale)
    .tickValues(xAxisTicks) // remove non-integer ticks
    .tickFormat(d3.format("d"));

  var yAxis = d3.axisRight(yAxisScale);

  svg
    .append("g")
    .attr("transform", `translate(0, ${this.svgHeight})`) // use backtick for template literals, very cool :D
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
    .attr("r", this.circleSize + "px")
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

  var helper = document.getElementById("helper").onclick = closeHelper

  fetchPS4Data()
    .then(fetchXboxData)
    .then(function() {
      var visuals = new visualize();
      var gui = new dat.GUI();
      gui.add(visuals, "circleSize").min(0).max(30)
      gui.add(visuals, "minSales").min(0).max(18)
      gui.add(visuals, "maxSales").min(2).max(20)
    });
};

