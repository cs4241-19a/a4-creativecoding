const audioContext = new AudioContext();
const audio = document.querySelector('audio');
// oscillatorLow = audioContext.createOscillator();
// oscillatorLow.type = "sine";
// oscillatorLow.frequency.value = 500;
// oscillatorLow.start();
//
// oscillatorHigh = audioContext.createOscillator();
// oscillatorHigh.type = "sine";
// oscillatorHigh.frequency.value = 5000;
// oscillatorHigh.start();

const source = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();

source.connect(analyser);
source.connect(audioContext.destination);

// oscillatorHigh.connect(analyser);
// oscillatorHigh.connect(audioContext.destination);
// oscillatorLow.connect(analyser);
// oscillatorLow.connect(audioContext.destination);


const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

analyser.fftSize = 8192;

let bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);

let frequencyData = new Uint8Array(bufferLength);


let WIDTH = canvas.width;
let HEIGHT = canvas.height;
let circleBars = 400;
let circleBarWidth = 2;
let barWidth = (WIDTH / bufferLength) * 2.5;
let barHeight;
let x = 0;


function renderFrame() {
    requestAnimationFrame(renderFrame);
    bar();
    circle();
}

function bar() {
    x = 0;
    analyser.getByteFrequencyData(frequencyData);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    for (var i = 0; i < bufferLength; i++) {
        barHeight = frequencyData[i];

        var r = barHeight + (25 * (i / bufferLength));
        var g = 250 * (i / bufferLength);
        var b = 50;

        ctx.fillStyle = "rgb(" + b + "," + r + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
    }
}

// const playButton = document.querySelector('button');
// playButton.addEventListener(
//     'click',
//     function () {
//         // check if context is in suspended state (autoplay policy)
//         if (audioContext.state === 'suspended') {
//             audioContext.resume();
//         }
//
//         // play or pause source depending on state
//         if (this.dataset.playing === 'false') {
//             audio.play();
//             this.dataset.playing = 'true';
//         } else if (this.dataset.playing === 'true') {
//             audio.pause();
//             this.dataset.playing = 'false';
//         }
//     },
//     false);

function circle() {
    // set to the size of device
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;
    const radius = 150;

    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
    gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
    // ctx.fillStyle = gradient;
    // ctx.fillRect(0,0,canvas.width,canvas.height);

    //draw a circle
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    analyser.getByteFrequencyData(frequencyData);
    let low = bufferLength * .50;
    let high = bufferLength * 0.75;
    for (let i = low; i < high; i++) {

        let rads = Math.PI * 2 / (high - low);

        let bar_height = frequencyData[i] * 0.7;
        const cos = Math.cos(rads * i);
        const sin = Math.sin(rads * i);
        let x = center_x + cos * radius;
        let y = center_y + sin * radius;
        let x_end = center_x + cos * (radius + bar_height);
        let y_end = center_y + sin * (radius + bar_height);

        drawBar(x, y, x_end, y_end, circleBarWidth, frequencyData[i]);

    }
}

function drawBar(x1, y1, x2, y2, width, frequency) {

    var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// bar()
renderFrame();
audioContext.resume();
