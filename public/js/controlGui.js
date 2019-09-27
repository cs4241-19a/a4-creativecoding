let barColor = '#ffffff';
let speedRate = 1;
let volumeStrength = 1;
import {draw, adjustVolume, adjustSpeed, adjustOpacity} from "./playMusic.js";

function displayInfo() {
    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

}

function createGui() {
    const adjustableValues = {
        color: barColor,
        opacity: 1.0,
        speed: speedRate,
        volume: volumeStrength,
    };
    const gui = new dat.GUI();
    const stereoBars = gui.addFolder('Stereo Bars')
    stereoBars.addColor(adjustableValues, 'color').onChange(function (newValue) {
        barColor = newValue;
        draw(newValue);
    });
    stereoBars.add(adjustableValues, 'opacity', 0, 1).onChange(function (newValue) {
        adjustOpacity(newValue);
    })
    gui.add(adjustableValues, 'speed', 0, 2).onChange(function (newValue) {
        speedRate = newValue;
        adjustSpeed(newValue);
    })
    gui.add(adjustableValues, 'volume', 0, 1).onChange(function (newValue) {
        volumeStrength = newValue;
        adjustVolume(newValue);
    });
};

export {barColor, speedRate, volumeStrength, displayInfo, createGui};