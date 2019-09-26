
console.log("Welcome to Assignment 4!")


// global data to hold earthquake data
var earthquakeData = []

// get earthquake data from server
const getQuakeData = function() {
    fetch('/earthquakes', {
      method:'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data from server: ")
        console.log(data)
        // clear out earthquake data
        earthquakeData = []

        for (var i = 0; i < data.length; i++) {
            currObj = data[i]

            obj = {mag: currObj.mag, place: currObj.place, 
                time: currObj.time, updated: currObj.updated, 
                url: currObj.url, detail: currObj.detail, 
                type: currObj.type, title: currObj.title, 
                coordinates: currObj.coordinates, id: currObj.id}

            // add to global array
            earthquakeData.push(obj)
        }
        console.log(earthquakeData)
        
    })
    .catch(err => {
        console.log(err)
    })
}


/*************************************************************************************
 *                                                                                   *
 *                                  MAP Maker                                        *
 *                                                                                   *
 *************************************************************************************/

 mapConfig = {
    pointSize: 2
}

const makeMap = function() {

    //Create SVG element and append map to the SVG
    var svg = d3.select("svg");

    // set projection
    var projection = d3.geoMercator();

    var path = d3.geoPath()

    var div = d3.select("body").append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0);

        
    d3.json("https://d3js.org/us-10m.v2.json", function(error, us) {
        if (error) throw error;

        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path);

        svg.append("path")
            .attr("class", "state-borders")
            .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })))
        
        //adjust scale 
        projection
            .scale(1000)
            .center([-97.5,41])

        // add circles to svg
        svg.selectAll("circle")
            .data(earthquakeData)
            .enter()
                .append("circle")
                .attr("cx", function(d) { console.log(d.coordinates); return projection(d.coordinates)[0]; })
                .attr("cy", function(d) { return projection(d.coordinates)[1]; } )
                // adjust circle size
                .attr("r", mapConfig.pointSize + "px")
                // change circle color
                .attr("fill", "red")
                .on("mouseover", function(d) {     
                    div.transition()        
                    .duration(200)      
                    .style("opacity", 1);      
                    div.html(d.place)
                    .style("left", (d3.event.pageX + 15) + "px")     
                    .style("top", (d3.event.pageY - 28) + "px")
                    console.log("mouseover")   
                })               
                .on("mouseout", function(d) {     
                    div.transition()        
                    .duration(500)      
                    .style("opacity", 0);   
                })
                .on("click", function(d) {
                    window.open(d.url) 
                })
    });
}


/*************************************************************************************
 *                                                                                   *
 *                                  On Load                                          *
 *                                                                                   *
 *************************************************************************************/

 window.onload = function() {

    // get earthquake data
    getQuakeData()
    
    // draw map & plot points
    makeMap()

    var gui = new dat.GUI();
    gui.add(mapConfig, "pointSize", 0, 10).onChange(function() {
        console.log("Value changed");
    })
}