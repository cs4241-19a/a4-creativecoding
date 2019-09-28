
export function actionOnMouseOver(pathOpacity, toolTipOpacity, svg, div, data){
    return function(g){
        div.transition()
            .duration(200)
            .style("opacity", toolTipOpacity);
        div.style("bottom", 20 + "px");
        div.style("left", 20 + "px");
        div.style("font-size", "1.15em")
            .html(function(){
                return "Character1: "+ data.nameByIndex[g.source.index].toString() + "<br/>" +
                    "Character2: " + data.nameByIndex[g.target.index].toString() + "<br/>" +
                    "Number of times: " + data.matrix[g.source.index][g.target.index]});

        stylePath(svg, data, g, pathOpacity);
    }

}

export function stylePath(svg, data, g, pathOpacity){
    svg.selectAll("path")
        .filter(function(d) {
            console.log("source",  data.nameByIndex[g.source.index], "target",data.nameByIndex[g.target.index], "data", data.matrix[g.source.index][g.target.index]);
            return (d.source.index !== g.source.index || d.target.index !== g.target.index);
        })
        .transition()
        .style("opacity", pathOpacity);
}

// Returns an event handler for fading a given chord group.
export function actionOnMouseOut(pathOpacity, toolTipOpacity, svg, div, data) {
    return function (g) {
        div.transition()
            .duration(500)
            .style("opacity", toolTipOpacity);

        stylePath(svg, data, g, pathOpacity);
    };
}

