import {actionOnMouseOver, actionOnMouseOut} from "./d3ActionOnMouseEvent.js";

//generates the graph
export function generateCircleGraph(svg, div, data, colors, innerRadius){
    // give this matrix to d3.chord()
    let res = d3.chord()
        .padAngle(0.05)
        .sortGroups(d3.descending)
        .sortSubgroups(d3.descending)
        (data.matrix);


// Add the links between groups
    svg
        .datum(res)
        .append("g")
        .selectAll("path")
        .data(function(d) { return d; })
        .enter()
        .append("path")
        .attr("d", d3.ribbon()
            .radius(innerRadius)
        )
        .style("fill", function(d){ return(colors[d.source.index]) }) // colors depend on the source group. Change to target otherwise.
        .attr("fill-opacity", 0.67) //opacity of ribbons
        .style("stroke", "black")
        .on("mouseover", actionOnMouseOver(.3, 0.9, svg, div, data))
        .on("mouseout", actionOnMouseOut(1, 0, svg, div, data));



    // this group object uses each group of the data.groups object
    let group = svg
        .datum(res)
        .append("g")
        .selectAll("g")
        .data(function(d) { return d.groups; })
        .enter();


// Add the ticks
    group
        .selectAll(".group-tick")
        .data(function(d) { return groupTicks(d, 1); })    // Controls the number of ticks: one tick each 25 here.
        .enter()
        .append("g")
        .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + innerRadius + ",0)"; })
        .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
        .attr("x2", 6)
        .attr("stroke", "black");


// Add the labels to ticks:
    group
        .selectAll(".group-tick-label")
        .data(function(d) { return groupTicks(d, 1); })
        .enter()
        // .filter(function(d) { return d.value % 25 === 0; })
        .append("g")
        .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + innerRadius + ",0)"; })
        .append("text")
        .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("x", 15)
        .attr("y", 10)
        .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
        .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
        .text(function(d) { return d.value })
        .style("font-size", 12);

    //adding text to show which color represents which attribute
    group.append("text")
        .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
        .attr("x", 15)
        .attr("y", 10)
        .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + (innerRadius+10)+ ",0)"; })
        .text(d => data.nameByIndex[d.index])
}


// Returns an array of tick angles and values for a given group and step.
function groupTicks(d, step) {
    let k = (d.endAngle - d.startAngle) / d.value;
    return d3.range(0, d.value, step).map(function(value) {
        return {value: value, angle: value * k + d.startAngle};
    });
}
