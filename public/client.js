d3.json("/getGeoData", function(json){
    //Width and height
    var width = 850;
    var height = 700;
    var popArea;
    var labels = ["population", "growth", "area" ];
    var label = labels[0];
    var year = 2019;
    var highlight = "All";

    //Define map projection
    var projection = d3.geoMercator()
                           .center([ 132, -28 ])
                           .translate([ width/2, height/2 ])
                           .scale(900);


    //Define path generator
    var path = d3.geoPath()
                     .projection(projection);


    var color = d3.scaleOrdinal(d3.schemeCategory20);

    //Create SVG
    var svg = d3.select("#mapContainer")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
    var config = {
        "opacity": 0.8,
        "fontSize": 12,
        "fontFamily": "Helvetica",
        "category": label,
        "year": year,
        "highlight": "All"
    }
    var gui = new dat.GUI();
    gui.add(config, "opacity", 0.1, 1)
        .onChange(function(value){
            map.attr("opacity", value);
        });
    gui.add(config, "fontSize", 12, 26)
        .onChange(function(value){
            states.attr("font-size", value);
        });
    gui.add(config, "fontFamily", ["Helvetica", "Courier New", "Verdana", "Comic Sans MS", "Trebuchet MS"])
        .onChange(function(value){
            states.attr("font-family", value);
        });
    gui.add(config, "category", labels)
        .onChange(function(value){
            renderPopulation(year, value, highlight);
        });
    gui.add(config, "year", [2017, 2018, 2019])
        .onChange(function(value){
            renderPopulation(value, label, highlight);
        });
    gui.add(config, "highlight", ["All", "New South Wales", "Victoria", "Queensland", "South Australia", "Western Australia", "Tasmania", "Northern Territory", "Australian Capital Territory"])
        .onChange(function(value){
           highlight = value;
           map.attr("fill", fillStates);
           renderPopulation(year, label, value);
        });

    var tooltip = d3.select(".tooltip");

    //Bind data and create one path per GeoJSON feature
    var map = svg.selectAll("path")
       .data(json.features)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("stroke", "#333")
       .attr("stroke-width", 1)
       .attr("opacity", 0.8)
       .attr("fill", fillStates)
       .on("mousemove", function(d) {
            var state = d.properties.STATE_NAME;    
            tooltip.style("visibility", "visible"); 
            var htmlStr = '<h3 class="popover-header">'+state+'</h3>';
            htmlStr += '<div class="popover-body">';
            for(var i=0; i<labels.length; i++) {
                var l = labels[i];
                htmlStr += "<p>" + l + ":&nbsp;"+ formatData(popArea[state][l], l) +"</p>";
            }
            htmlStr += '</div>';
            tooltip.html(htmlStr)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 5) + "px");    
            })                  
        .on("mouseout", function(d) {       
            tooltip.style("visibility", "hidden");   
        });
      
     //States
    var states = svg.selectAll("text")
        .data(json.features)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
        .attr("text-anchor", "middle")
        .attr("dy", "0px")
        .attr("font-size", "12px")
        .text(function(d) {
            return d.properties.STATE_NAME;
        });

    var total = svg.append('text')
    .attr('x', 30)
    .attr('y', 100)
    .attr('fill', 'black')
    .style("font-size", 14)
    .text("Total population of "+year+":");

    renderPopulation(year, label);

    function renderPopulation(year, label, highlight="All") {
        $.get("/getPopulation?year="+year, function(data){
            popArea = data;
            states.html(function(d){
                var state = d.properties.STATE_NAME;
                return "<tspan x='0' dy='1.2em'>" + state+ "</tspan>" 
                        + "<tspan x='0' dy='1.2em'>" + label+ ": " + formatData(data[state][label], label) + "</tspan>"
            });
            if(highlight == "All"){
                total.text("Total population of year "+year+": "+formatData(data["total"]["population"], "population"));
            } else {
                var htmlStr = "<tspan x='0' dy='1.2em'>"+highlight+" ("+year+")"+"</tspan>";
                for(var i=0; i<labels.length; i++) {
                    var l = labels[i];
                    htmlStr += "<tspan  x='0' dy='1.1em'>" + l + ":&nbsp;"+ formatData(popArea[highlight][l], l) +"</tspan>";
                }
                total.html(htmlStr);
            }
            
        });
    }

    function formatData(value, label){
        if(label == "population") {
            return Math.round(value*100)/100+" M";
        }
        if(label == "growth") {
            return value+"%";
        }
        if(label == "area") {
            return value+" Ksq";
        }
    }

    function fillStates(d, i) {
        if(highlight == "All"){
            return color(i);
        }
        if(highlight == d.properties.STATE_NAME){
            return color(i);
        }
        return "#d9d9d9";
    }
});
$('.close').click(function() {
       $(this).parent().hide();
   })
$('.question-mark').click(function(){
    $('.alert').show();
});
            