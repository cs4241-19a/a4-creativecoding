import {GUI} from 'dat.gui';

let gui;
let colorController;
let scaleController;
let lengthController;
let instrumentController;

let FizzyText = function () {
    this.scale = 'Major';
    this.colors = 'Red Gradient';
    this.length = 'Eighth Note';
    this.instrument = 'Synth';
};

const setup = function () {
    let text = new FizzyText();
    gui = new GUI();
    scaleController = gui.add(text, 'scale', ['Major', 'Minor', 'Pentatonic', 'Diatonic']);
    colorController = gui.add(text, 'colors', ['Red Gradient', 'Blue Gradient', 'Rainbow', 'Greyscale']);
    lengthController = gui.add(text, 'length', ['Sixteenth Note', 'Eighth Note', 'Quarter Note', 'Half Note', 'Whole Note']);
    instrumentController = gui.add(text, 'instrument', ['AMSynth', 'DuoSynth', 'FMSynth', 'MembraneSynth', 'MetalSynth', 'MonoSynth',
    'NoiseSynth', 'PluckSynth', 'PolySynth', 'Synth']);
};

export {setup, gui, scaleController, colorController, lengthController, instrumentController};