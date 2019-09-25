import {startNote, endNote} from "./piano-sound.js";

let lPiano;
let rPiano;

let noteDuration = 250;
let keyPressedOptions;  // function called on key press
let keyColors = {
    'C': 'red',
    'C#': 'orange',
    'D': 'yellow',
    'D#': 'greenyellow',
    'E': 'green',
    'F': 'cyan',
    'F#': 'lightskyblue',
    'G': 'blue',
    'G#': 'blueviolet',
    'A': 'purple',
    'A#': 'lightpink',
    'B': 'magenta',
};

function changeKeyPressing(type) {
    let keyPressed;
    switch (type) {
        case "click":
            keyPressed = keyPressedOptions.click;
            break;
        case "hover":
            keyPressed = keyPressedOptions.hover;
            break;
        case "clickHold":
            keyPressed = keyPressedOptions.clickHold;
            break;
        case "hoverHold":
            keyPressed = keyPressedOptions.hoverHold;
            break;
    }
    lPiano.bindKeyPress(keyPressed);
    rPiano.bindKeyPress(keyPressed);
}

function setup() {
    lPiano = pianoClosure("piano1");
    rPiano = pianoClosure("piano2");
    keyPressedOptions = keyPressedClosure();
    lPiano.bindKeyPress(keyPressedOptions.click);
    rPiano.bindKeyPress(keyPressedOptions.click);
    lPiano.bindKeyColor(keyColors);
    rPiano.bindKeyColor(keyColors);

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
        const keyClone = key.cloneNode(true);
        key.parentNode.replaceChild(keyClone, key);
        return keyClone;
    }
    function createKeyPressed(downType, downF, upType, upF) {
        return function (key) {
            key = clean(key);
            key.addEventListener(downType, () => downF(key));
            document.addEventListener("keydown", event => {
                if (event.code === keyboardBindings(key) && !event.repeat) {
                    event.preventDefault();
                    console.log("hi", key);
                    downF(key);
                    event.preventDefault();
                    return false;
                }
            });
            if (upType !== undefined && upF !== undefined) {
                key.addEventListener(upType, () => upF(key));
                document.addEventListener("keyup", event => {
                    if (event.code === keyboardBindings(key)) {
                        event.preventDefault();
                        console.log("hi");
                        upF(key);
                        return false;
                    }
                });
            }
        }
    }
    function singleTrigger(key) {
        downTrigger(key);
        upTrigger(key);
    }
    function downTrigger(key) {
        startNote(key);
        key.setAttribute("style", "fill: " + key.dataset.onColor);
    }
    function upTrigger(key) {
        setTimeout(() => {
            endNote(key);
            key.setAttribute("style", "");
        }, noteDuration);
    }
    const click = createKeyPressed('click', singleTrigger);
    const hover = createKeyPressed('mouseenter', singleTrigger);
    const clickHold = createKeyPressed('mousedown', downTrigger, 'mouseup', upTrigger);
    const hoverHold = createKeyPressed('mouseenter', downTrigger, 'mouseleave', upTrigger);

    return {click, hover, clickHold, hoverHold};
}

function pianoClosure(pianoId) {
    const piano = document.getElementById(pianoId);

    const bindKeyPress = function (f) {
        piano.querySelectorAll("rect").forEach(f);
    };

    const bindKeyColor = function (keyColors) {
        piano.querySelectorAll("rect").forEach((key) => {
            key.setAttribute('data-on-color', keyColors[key.dataset.note]);
        });
    };

    return {bindKeyPress, bindKeyColor};
}

export default {setup}