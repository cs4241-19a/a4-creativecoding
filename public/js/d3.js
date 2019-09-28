import {generateCircleGraph} from "./generateCircleGraphModule.js";
let innerRadius = 200;

// //The symmetric matrix about movie collaborations between the Avengers
let matrix = [
    [0,4,3,2,5,2], //Black Widow
    [4,0,3,2,4,3], //Captain America
    [3,3,0,2,3,3], //Hawkeye
    [2,2,2,0,3,3], //The Hulk
    [5,4,3,3,0,2], //Iron Man
    [2,3,3,3,2,0], //Thor
];

let data1 = {
    matrix: matrix,
    indexByName: {
        "Black Widow": 0,
        "Captain America": 1,
        "Hawkeye": 2,
        "The Hulk": 3,
        "Iron Man": 4,
        "Thor": 5
    },
    nameByIndex: {
        0: "Black Widow",
        1: "Captain America",
        2: "Hawkeye",
        3: "The Hulk",
        4: "Iron Man",
        5: "Thor"
    }
};

let colors = [ "#440154ff", "#407ea4", "#1ab530", "#fdb021", "#31668dff","#fde735ff"];


window.onload = function(){

    //generating the first data correlation circle
    init1(".visTitle", "#my_dataviz", data1);
    // init2()

};


function init1(className, idName, data){
    //create the div area that contains the tooltip to be shown on hover
    let div1 = d3.select(className).append("div")
        .attr("class", "tooltip")
        .attr("style", "position: absolute;")
        .style("opacity", 0);

    // create the svg area
    let svg1 = d3.select(idName)
        .append("svg")
        .attr("width", window.innerWidth/2)
        .append("g")
        .attr("transform", "translate(400,300)")

    // 6 groups, so create a vector of 6 colors
    generateCircleGraph(svg1, div1, data, colors, innerRadius);
}


