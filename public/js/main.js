var ps4data = [];
var xboxdata = [];

const closeHelper = function () {
  var helperText = document.getElementById("helper-text")
  if (helperText.style.opacity == 0.0) {
    helperText.style.opacity = 1
  } else {
    helperText.style.opacity = 0
  }
}

const fetchPS4Data = function () {
  return new Promise(
    function (resolve, reject) {
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

const fetchXboxData = function () {
  return new Promise(
    function (resolve, reject) {
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
const customColor = function (value) {
  let r = Math.min(Math.pow(Math.round(value), 2) * 15, 255);
  let g = 0;
  let b = 0;
  return `rgb(${r}, ${g}, ${b})`;
};

var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .text(function () {
    return "yo"
  })
  .style("opacity", 0);

var visualize = function () {
  this.svgHeight = 300;
  this.svgWidth = 1000;
  this.minYear = 2012.5;
  this.maxYear = 2019.5;
  this.minSales = 0;
  this.maxSales = 20;
  this.circleSize = 8;
  this.fill = "white";
  this.border = "white"
  this.yValue = "Europe";

  var svg = d3
    .select(".sales")
    .attr("width", this.svgWidth)
    .attr("height", this.svgHeight + 20)
    .attr('style', "background-color: " + this.fill + '; border: 2px solid' + this.border)

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

  const xAxisTicks = xScale.ticks().filter(tick => Number.isInteger(tick));

  var xAxis = d3
    .axisBottom(xScale)
    .tickValues(xAxisTicks) // remove non-integer ticks
    .tickFormat(d3.format("d"));

  var yAxis = d3.axisRight(yScale);

  svg
    .append("g")
    .attr("transform", `translate(0, ${this.svgHeight})`) // use backtick for template literals, very cool :D
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", `translate(0, 0)`)
    .call(yAxis);

  var vm = this

  var barChart = svg
    .selectAll("circle")
    .data(ps4data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.Year);
    })
    .attr("cy", function (d) {
      return yScale(d[vm.yValue]);
    })
    .attr("r", this.circleSize + "px")
    .attr("fill", function (d) {
      return customColor(d[vm.yValue]);
    })
    .on("mouseover", function (d, i) {
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
      div.html(d.Game + ": " + d[vm.yValue]);
    })
    .on("mouseout", function (d, i) {
      d3.select(this)
        .transition()
        .duration(50)
        .attr("opacity", 1);

      div
        .transition()
        .duration("50")
        .style("opacity", 0);
    });

  this.updateCircleSize = function () {
    barChart.attr('r', this.circleSize + 'px')
  }

  this.updateYValue = function (value) {
    var country = document.getElementById('country')
    if (value === "Japan")
      vm.yValue = "Japan"
    if (value === "Europe")
      vm.yValue = "Europe"
    if (value === "North America")
      vm.yValue = "North America"
    if (value === "Rest of World")
      vm.yValue = "Rest of World"
    if (value === "Global")
      vm.yValue = "Global"
    
    country.innerHTML = value
    barChart.attr("cy", function (d) {
      return yScale(d[vm.yValue]);
    })
  }

  this.updateMaxSales = function (value) {
    vm.maxSales = value
    yScale = d3
      .scaleLinear()
      .domain([vm.maxSales, vm.minSales])
      .range([0, vm.svgHeight]);

    barChart
      .attr("cy", function (d) {
        return yScale(d[vm.yValue]);
      })

    yAxis = d3.axisRight(yScale);

    svg.selectAll('g').remove()

    svg.append('g')
      .attr("transform", 'translate(0, 0)')
      .call(yAxis);

    svg
      .append("g")
      .attr("transform", `translate(0, ${this.svgHeight})`) // use backtick for template literals, very cool :D
      .call(xAxis);
  }

  this.updateMinSales = function (value) {
    vm.minSales = value
    yScale = d3
      .scaleLinear()
      .domain([vm.maxSales, vm.minSales])
      .range([0, vm.svgHeight]);

    barChart
      .attr("cy", function (d) {
        return yScale(d[vm.yValue]);
      })

    yAxis = d3.axisRight(yScale);

    svg.selectAll('g').remove()

    svg.append('g')
      .attr("transform", 'translate(0, 0)')
      .call(yAxis);

    svg
      .append("g")
      .attr("transform", `translate(0, ${this.svgHeight})`) // use backtick for template literals, very cool :D
      .call(xAxis);
  }

  this.updateColor = function(value) {
    vm.fill = value
    svg.attr("style", "background-color: " + vm.fill + "; border: 2px solid " + vm.border)
  } 

  this.updateBorder = function(value) {
    vm.border = value
    svg.attr("style", "border: 1px solid " + vm.border + "; background-color: " + vm.fill)
  }
};

window.onload = function () {

  var helper = document.getElementById("helper").onclick = closeHelper

  fetchPS4Data()
    .then(fetchXboxData)
    .then(function () {
      var visuals = new visualize();
      var gui = new dat.GUI();

      var circleSize = gui.add(visuals, "circleSize").min(0).max(30);
      circleSize.onChange(function (value) {
        visuals.updateCircleSize();
      });

      gui.add(visuals, "minSales").min(0).max(18).onChange(function (value) {
        visuals.updateMinSales(value)
      })
      gui.add(visuals, "maxSales").min(2).max(20).onChange(function (value) {
        visuals.updateMaxSales(value)
      })
      gui.add(visuals, "fill", ["white", "orange", "violet", "pink", "red", "black", "blue"]).onChange(function (value) {
        visuals.updateColor(value)
      })
      gui.add(visuals, "border", ["white", "orange", "violet", "pink", "red", "black", "blue"]).onChange(function (value) {
        visuals.updateBorder(value)
      })
      var yValue = gui.add(visuals, "yValue", ["Europe", "Japan", "North America", "Rest of World", "Global"]);
      yValue.onChange(function (value) {
        visuals.updateYValue(value);
      })
    });
};

