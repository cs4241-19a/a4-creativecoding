import {displayInfo, createGui} from "./controlGui.js";
import {initializeStereo, playSelectedSong, draw} from "./playMusic.js";

const initialize = function() {
    const buttonTest = document.getElementById("testButton");
    buttonTest.onclick = playSong;
    displayInfo();
    initializeStereo();
    createGui();
};

const playSong = function(e) {
    e.preventDefault();
    playSelectedSong();
};

window.onload = function() {
    initialize();
};

export {draw};