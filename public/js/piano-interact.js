import {startNote, endNote} from "./piano-sound.js";
import * as dat from '/scripts/dat.gui.module.js';

let lPiano;
let rPiano;
let keyPressedOptions;  // function called on key press
let noteDuration = 250;
let gui;
let pianoGui;




// DAT.GUI //

let PianoGui = function() {
    this.duration = 0.25;
    this.keyboardControl = true;
    this.oscillator = "sine";
    // todo on off for key controls

    this['C'] = '#FF0000';      // red
    this['C#'] = '#FFA500';     // orange
    this['D'] = '#FFFF00';      // yellow
    this['D#'] = '#ADFF2F';     // greenyellow
    this['E'] = '#008000';      // green
    this['F'] = '#00FFFF';      // cyan
    this['F#'] = '#87CEFA';     // lightskyblue
    this['G'] = '#0000FF';      // blue
    this['G#'] = '#8A2BE2';     // blueviolet
    this['A'] = '#800080';      // purple
    this['A#'] = '#FFB6C1';     // lightpink
    this['B'] = '#FF00FF';      // magenta

    this.octaveL = 4;
    this.playFormL = 'click';
    this.octaveR = 5;
    this.playFormR = 'click';

};

function setupGui() {
    gui = new dat.GUI({hideable: false});
    pianoGui = new PianoGui();
    gui.add(pianoGui, 'duration').min(0);
    gui.add(pianoGui, 'keyboardControl');
    gui.add(pianoGui, 'oscillator', {'Sine': 'sine', 'Square': 'square', 'Sawtooth': 'sawtooth', 'Triangle': 'triangle'});

    const colors = gui.addFolder('Key Colors');
    colors.addColor(pianoGui, 'C');
    colors.addColor(pianoGui, 'C#');
    colors.addColor(pianoGui, 'D');
    colors.addColor(pianoGui, 'D#');
    colors.addColor(pianoGui, 'E');
    colors.addColor(pianoGui, 'F');
    colors.addColor(pianoGui, 'F#');
    colors.addColor(pianoGui, 'G');
    colors.addColor(pianoGui, 'G#');
    colors.addColor(pianoGui, 'A');
    colors.addColor(pianoGui, 'A#');
    colors.addColor(pianoGui, 'B');


    const lPianoFolder = gui.addFolder('Left');
    lPianoFolder.add(pianoGui, 'octaveL', 1, 7, 1);
    // cant hold function so hold string for switch
    lPianoFolder.add(pianoGui, 'playFormL', {'Click': 'click', 'Hover': 'hover', 'Click Hold': 'clickHold', 'Hover Hold': 'hoverHold'})
        .onFinishChange(function(value) {
            lPiano.bindKeyPress(chooseKeyPress(value));
        });

    const rPianoFolder = gui.addFolder('Right');
    rPianoFolder.add(pianoGui, 'octaveR', 1, 7).step(1);
    // cant hold function so hold string for switch
    rPianoFolder.add(pianoGui, 'playFormR', {'Click': 'click', 'Hover': 'hover', 'Click Hold': 'clickHold', 'Hover Hold': 'hoverHold'})
        .onFinishChange(function(value) {
            rPiano.bindKeyPress(chooseKeyPress(value));
        });


}

function chooseKeyPress(type) {
    switch (type) {
        case "click": return keyPressedOptions.click;
        case "hover": return keyPressedOptions.hover;
        case "clickHold": return keyPressedOptions.clickHold;
        case "hoverHold": return keyPressedOptions.hoverHold;
    }
}




function setup() {
    lPiano = pianoClosure("piano1");
    rPiano = pianoClosure("piano2");
    keyPressedOptions = keyPressedClosure();
    lPiano.bindKeyPress(keyPressedOptions.click);
    rPiano.bindKeyPress(keyPressedOptions.click);
    setupGui();
}

function keyboardBindings(key) {
    if (key.parentElement.id === "piano1") {
        switch (key.dataset.note) {
            case 'C': return "Tab";         // tab
            case 'D': return "KeyQ";        // q
            case 'E': return "KeyW";        // w
            case 'F': return "KeyE";        // e
            case 'G': return "KeyR";        // r
            case 'A': return "KeyT";        // t
            case 'B': return "KeyY";        // y
            case 'C#': return "Digit1";     // 1
            case 'D#': return "Digit2";     // 2
            case 'F#': return "Digit4";     // 4
            case 'G#': return "Digit5";     // 5
            case 'A#': return "Digit6";     // 6
        }
    } else if (key.parentElement.id === "piano2") {
        switch (key.dataset.note) {
            case 'C': return "KeyB";        // b
            case 'D': return "KeyN";        // n
            case 'E': return "KeyM";        // m
            case 'F': return "Comma";       // ,
            case 'G': return "Period";      // .
            case 'A': return "Slash";       // /
            case 'B': return "ShiftRight";  // rshift
            case 'C#': return "KeyH";       // h
            case 'D#': return "KeyJ";       // j
            case 'F#': return "KeyL";       // l
            case 'G#': return "Semicolon";  // ;
            case 'A#': return "Quote";      // '
        }
    }
}

function keyPressedClosure() {
    function clean(key) {
        key.removeEventListener('click', singleTrigger);
        key.removeEventListener('mouseenter', singleTrigger);
        document.removeEventListener('keydown', singleTrigger);
        key.removeEventListener('mousedown', downTrigger);
        key.removeEventListener('mouseup', upTrigger);
        key.removeEventListener('mouseenter', downTrigger);
        key.removeEventListener('mouseleave', upTrigger);
        document.removeEventListener('keydown', downTrigger);
        document.removeEventListener('keyup', upTrigger);
    }
    function createKeyPressedListeners(downType, downF, upType, upF) {
        return function(key) {
            const downFunc = () => downF(key);
            const upFunc = () => upF(key);
            const keyFunc = (f) => {
                return (event) => {
                    if (event.code === keyboardBindings(key)) {
                        event.preventDefault();
                        f(key);
                        return false;
                    }
                };
            };
            const downKeyFunc = keyFunc(downFunc);
            const upKeyFunc = keyFunc(upFunc);

            let add = function () {
                key.addEventListener(downType, downFunc);
                document.addEventListener("keydown", downKeyFunc);
                if (upType !== undefined && upF !== undefined) {
                    key.addEventListener(upType, upFunc);
                    document.addEventListener("keyup", upKeyFunc);
                }
            };

            let remove = function () {
                key.removeEventListener(downType, downFunc);
                document.removeEventListener("keydown", downKeyFunc);
                if (upType !== undefined && upF !== undefined) {
                    key.removeEventListener(upType, upFunc);
                    document.removeEventListener("keyup", upKeyFunc);
                }
            };

            add();
            return {remove};
        };
    }
    function singleTrigger(key) {
        downTrigger(key);
        upTrigger(key);
    }
    function downTrigger(key) {
        console.log(pianoGui);
        startNote(key);
        key.setAttribute("style", "fill: " + pianoGui[key.dataset.note])
    }
    function upTrigger(key) {
        setTimeout(() => {
            endNote(key);
            key.setAttribute("style", "");
        }, noteDuration);
    }
    const click = createKeyPressedListeners('click', singleTrigger);
    const hover = createKeyPressedListeners('mouseenter', singleTrigger);
    const clickHold = createKeyPressedListeners('mousedown', downTrigger, 'mouseup', upTrigger);
    const hoverHold = createKeyPressedListeners('mouseenter', downTrigger, 'mouseleave', upTrigger);

    return {click, hover, clickHold, hoverHold};
}

function pianoClosure(pianoId) {
    const piano = document.getElementById(pianoId);
    let listeners = [];

    const bindKeyPress = function (f) {
        // remove old listeners
        listeners.forEach((l) => {
            l.remove();
        });
        // add new listeners
        piano.querySelectorAll("rect").forEach((key) => {
            listeners.push(f(key));
        });
    };

    return {bindKeyPress};
}

export default {setup}