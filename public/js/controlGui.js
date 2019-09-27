let barColor = '#d03c87';
let speedRate = 1;
let volumeStrength = 1;
let songSelected = "Azure Lines";
let canvas, context;
import {draw, adjustVolume, adjustSpeed, adjustOpacity, adjustGlow} from "./playMusic.js";

function initializeCanvas() {
    canvas = document.getElementById("studio-canvas");
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    context = canvas.getContext("2d");
}

function displayInstructions() {
    document.getElementById("modal").style.display = "";
    document.getElementById("helpButton").style.display = "none";
}

function closeInstructions() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("helpButton").style.display = "";
}

function createGui() {
    const adjustableValues = {
        color: barColor,
        opacity: 1.0,
        speed: speedRate,
        volume: volumeStrength,
        song: "Azure Lines",
        glow: false
    };
    const gui = new dat.GUI();
    const stereoBars = gui.addFolder('Stereo Bars')
    stereoBars.addColor(adjustableValues, 'color').onChange(function (newValue) {
        barColor = newValue;
        console.log(document.getElementsByClassName("slider-fg"));
        let sliderList = document.getElementsByClassName("slider-fg");
        let i;
        for(i = 0; i < sliderList.length; i = i + 1) {
          sliderList[i].style.backgroundColor = newValue.toString() + " !important";
          console.log(sliderList[i].style.backgroundColor);
        }
        //.querySelector("#slider-fg").style.background = "background-color: " + newValue;
        draw(newValue);
    });
    stereoBars.add(adjustableValues, 'opacity', 0, 1).onChange(function (newValue) {
        adjustOpacity(newValue);
    })
    stereoBars.add(adjustableValues, 'glow').onChange(function (newValue) {
        adjustGlow(newValue);
    });
    gui.add(adjustableValues, 'speed', 0, 2).onChange(function (newValue) {
        speedRate = newValue;
        adjustSpeed(newValue);
    })
    gui.add(adjustableValues, 'volume', 0, 1).onChange(function (newValue) {
        volumeStrength = newValue;
        adjustVolume(newValue);
    });
    gui.add(adjustableValues, 'song', ["Azure Lines", "Planisphere", "Travelers", "Waypoints"]).onChange(function (newValue) {
        songSelected = newValue;
    });
};

export {canvas, context, barColor, speedRate, volumeStrength, songSelected, initializeCanvas, createGui, displayInstructions, closeInstructions};