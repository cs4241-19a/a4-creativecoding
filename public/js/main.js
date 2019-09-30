import {update, futureUpdate} from "./update.js";
import {mainGraph} from "./graph.js";

let mainData = {};
let currData = [];

let chart;

setInterval(futureUpdate(chart, mainData), 5000);

window.onload = function () {
    update(currData, mainData);
    mainGraph(chart, mainData);
};