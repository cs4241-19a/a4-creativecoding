import {barColor, speedRate, volumeStrength} from "./controlGui.js";

let audio = document.getElementById("audio");
const width = 1024;
const height = 600;
const interval = 128;
let canvas, context, audioctx, analyzer, oscillator, source, freqArr, barHeight;
let opacity = 1.0;

function initializeStereo() {
    canvas = document.getElementById("studio-canvas");
    context = canvas.getContext("2d");
    audioctx = new AudioContext();
    analyzer = audioctx.createAnalyser();
    analyzer.fftSize = 2048;
    oscillator = audioctx.createOscillator();
    oscillator.connect(audioctx.destination);
    source = audioctx.createMediaElementSource(audio);
    source.connect(analyzer);
    source.connect(audioctx.destination);
    freqArr = new Uint8Array(analyzer.frequencyBinCount);
    barHeight = height;
}

function playSelectedSong() {
    const selectedOption = document.getElementById("songList").value;
    switch(selectedOption) {
        case("azureLinesOption"):
            audio.src = document.getElementById("azureLines").src;
            break;
        case("azureSkyOption"):
            audio.src = document.getElementById("azureSky").src;
            break;
        case("planisphereOption"):
            audio.src = document.getElementById("planisphere").src;
            break;
        case("travelersOption"):
            audio.src = document.getElementById("travelers").src;
            break;
        case("waypointsOption"):
            audio.src = document.getElementById("waypoints").src;
            break;
        default:
            console.log("error");
            break;
    }
    audio.playbackRate = speedRate;
    audio.volume = volumeStrength;
    audio.play();
    draw(barColor);
}

function draw(color) {
    if(!audio.paused) {
        let bigBars = 0;
        let x = 0;
        context.clearRect(0, 0, width, height);
        context.fillStyle = color;
        analyzer.getByteFrequencyData(freqArr);
        for(let i = 0; i < interval; i++) {
            if(barHeight >= 240) {
                bigBars++;
            }
            //max = 900; //default placeholder
            let num = i;
            barHeight = ((freqArr[num] - 128) * 2) + 2;
            if(barHeight <= 1){
                barHeight = 2;
            }
            context.globalAlpha = opacity;
            context.fillRect(x, height - barHeight, (width/interval) - 1, barHeight);
            x += width/interval;
        }
    }
    window.requestAnimationFrame(draw);
};

function adjustVolume(vol) {
    audio.volume = vol;
}

function adjustSpeed(speed) {
    audio.playbackRate = speed;
}

function adjustOpacity(op) {
    opacity = op;
}

export {initializeStereo, playSelectedSong, draw, adjustVolume, adjustSpeed, adjustOpacity};