import {initializeCanvas, createGui, displayInstructions, closeInstructions} from "./controlGui.js";
import {play, pauseResume} from "./playMusic.js";

const initialize = function() {
    const buttonPlay = document.getElementById("playButton");
    buttonPlay.onclick = playSong;
    const buttonPauseResume = document.getElementById("pauseResumeButton");
    buttonPauseResume.onclick = resumePause;
    let buttonClose = document.getElementById("closeButton");
    buttonClose.onclick = closeHelp;
    let buttonHelp = document.getElementById("helpButton");
    buttonHelp.onclick = displayHelp;
    initializeCanvas();
    createGui();
};

const closeHelp = function(e) {
    e.preventDefault();
    closeInstructions();
}

const displayHelp = function(e) {
    e.preventDefault();
    displayInstructions();
}

const playSong = function(e) {
    e.preventDefault();
    play();
};

const resumePause = function(e) {
    e.preventDefault();
    pauseResume();
}

window.onload = function() {
    initialize();
};