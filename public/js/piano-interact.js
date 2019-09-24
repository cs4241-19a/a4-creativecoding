import {startNote, endNote} from "./piano-sound.js";

let lPiano;
let rPiano;

let noteDuration = 200;
let keyPressedOptions;  // function called on key press

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
    lPiano.bindKeys(keyPressed);
    rPiano.bindKeys(keyPressed);
}

function setup() {
    lPiano = pianoClosure("piano1");
    rPiano = pianoClosure("piano2");
    keyPressedOptions = keyPressedClosure();
    lPiano.bindKeys(keyPressedOptions.clickHold);
    rPiano.bindKeys(keyPressedOptions.clickHold);
}

function keyPressedClosure() {
    function clean(key) {
        const keyClone = key.cloneNode(true);
        key.parentNode.replaceChild(keyClone, key);
        return keyClone;
    }
    const click = function(key) {
        key = clean(key);
        key.addEventListener('click', (event) => {
            startNote(event);
            setTimeout(() => endNote(event), noteDuration);
        });
    };
    const hover = function(key) {
        key = clean(key);
        key.addEventListener('mouseenter', (event) => {
            startNote(event);
            setTimeout(() => endNote(event), noteDuration);
        });
    };
    const clickHold = function(key) {
        key = clean(key);
        key.addEventListener('mousedown', (event) => {
            startNote(event);
        });
        key.addEventListener('mouseup', (event) => {
            setTimeout(() => endNote(event), noteDuration);
        });
    };
    const hoverHold = function(key) {
        key = clean(key);
        key.addEventListener('mouseenter', (event) => {
            startNote(event);
        });
        key.addEventListener('mouseleave', (event) => {
            setTimeout(() => endNote(event), noteDuration);
        });
    };

    return {click, hover, clickHold, hoverHold};
}

function pianoClosure(pianoId) {
    const piano = document.getElementById(pianoId);

    const bindKeys = function (f) {
        piano.querySelectorAll("rect").forEach(f)
    };

    return {bindKeys}
}

export default {setup}