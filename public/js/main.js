import {initializeCanvas, createGui} from "./controlGui.js";
import {play, pauseResume} from "./playMusic.js";

const initialize = function() {
    const buttonPlay = document.getElementById("playButton");
    buttonPlay.onclick = playSong;
    const buttonPauseResume = document.getElementById("pauseResumeButton");
    buttonPauseResume.onclick = resumePause;
    initializeCanvas();
    createGui();
};

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