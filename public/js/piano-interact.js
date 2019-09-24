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
    lPiano.bindKeys(keyPressedOptions.hover);
    rPiano.bindKeys(keyPressedOptions.hoverHold);
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
            key.addEventListener(downType, downF);
            key.addEventListener("keydown", event => {
                if (event.isComposing || event.keyCode === 229) return;
                if (event.code === 32) {
                    console.log("hi");
                    downF(event);
                }
            });
            if (upType !== undefined && upF !== undefined) {
                key.addEventListener(upType, upF);
                key.addEventListener("keyup", event => {
                    if (event.isComposing || event.keyCode === 229) return;
                    if (event.code === 32) {
                        console.log("hi");
                        upF(event);
                    }
                });
            }
        }
    }
    function singleTrigger(event) {
        downTrigger(event);
        upTrigger(event);
    }
    function downTrigger(event) {
        startNote(event);
    }
    function upTrigger(event) {
        setTimeout(() => endNote(event), noteDuration);
    }
    const click = createKeyPressed('click', singleTrigger);
    const hover = createKeyPressed('mouseenter', singleTrigger);
    const clickHold = createKeyPressed('mousedown', downTrigger, 'mouseup', upTrigger);
    const hoverHold = createKeyPressed('mouseenter', downTrigger, 'mouseleave', upTrigger);

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