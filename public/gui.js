import * as dat from 'dat.gui';
import {color} from "dat.gui";

let gui;
let colorController;
let scaleController;

let FizzyText = function() {
    this.scale = 'Major';
    this.colors = 'Red Gradient' ;
};

const setup = function() {
    let text = new FizzyText();
    gui = new dat.GUI();
    scaleController = gui.add(text, 'scale', [ 'Major', 'Minor', 'Pentatonic', 'Diatonic' ] );
    colorController = gui.add(text, 'colors', [ 'Red Gradient', 'Blue Gradient', 'Rainbow', 'Greyscale' ] );
};

export {setup, gui, scaleController, colorController}