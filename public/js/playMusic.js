import {context, barColor, speedRate, volumeStrength, songSelected} from "./controlGui.js";

let audio = document.getElementById("audio");
const width = 1024;
const height = 350;
const interval = 256;
let audioctx, analyzer, oscillator, source, frequency, barHeight;
let opacity = 1.0;
let glow = false;
let stereoCreated = false;
let musicPlaying = false;

function play() {
    if(stereoCreated === false) {
        audioctx = new AudioContext();
        analyzer = audioctx.createAnalyser();
        analyzer.fftSize = 2048;
        oscillator = audioctx.createOscillator();
        oscillator.connect(audioctx.destination);
        source = audioctx.createMediaElementSource(audio);
        source.connect(analyzer);
        source.connect(audioctx.destination);
        frequency = new Uint8Array(analyzer.frequencyBinCount);
        barHeight = height;
        stereoCreated = true;
    }
    playSelectedSong();
}

function pauseResume() {
    if(musicPlaying === true) {
        audio.pause();
        musicPlaying = false;
    }
    else {
        audio.play();
        musicPlaying = true;
    }
}

function playSelectedSong() {
    switch(songSelected) {
        case("Azure Lines"):
            audio.src = document.getElementById("azureLines").src;
            break;
        case("Planisphere"):
            audio.src = document.getElementById("planisphere").src;
            break;
        case("Travelers"):
            audio.src = document.getElementById("travelers").src;
            break;
        case("Waypoints"):
            audio.src = document.getElementById("waypoints").src;
            break;
        default:
            console.log("error");
    }
    audio.playbackRate = speedRate;
    audio.volume = volumeStrength;
    audio.play();
    musicPlaying = true;
    draw(barColor);
}

function draw(color) {
    if(!audio.paused) {
        let i;
        let x = 0;
        let barLength = width / interval;
        context.clearRect(0, 0, width, height);
        context.fillStyle = color;
        analyzer.getByteFrequencyData(frequency);
        for(i = 0; i < interval; i = i + 1) {
            let num = i;
            barHeight = ((frequency[num] - 128) * 2);
            context.globalAlpha = opacity;
            if(glow === true) {
                context.shadowBlur = 20;
                context.shadowColor = color;
            }
            else {
                context.shadowBlur = 0;
            }
            context.fillRect(x, height - barHeight, barLength - 1, barHeight);
            x = x + barLength;
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

function adjustGlow(mode) {
    glow = mode;
}

export {playSelectedSong, draw, adjustVolume, adjustSpeed, adjustOpacity, adjustGlow, play, pauseResume};