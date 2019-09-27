//import * as dat from 'dat.gui';
//const dat = require('dat.gui');

var params = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.size = 10;
}

const showGui = function () {

    var gui = new dat.GUI();
    gui.add(params, 'rotationSpeed', 0, 0.5);
    gui.add(params, 'bouncingSpeed', 0, 0.5);
    gui.add(params, 'size');

}

export {
    showGui
}