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
// let circleBars = 400;
// let circleBarWidth = 2;
let barWidth = (WIDTH / bufferLength) * 2.5;
let barHeight;
let x = 0;

class bar {
    constructor(low, high){
        this.low = low;
        this.high = high;
    }

    draw() {
        x = 0;
        analyser.getByteFrequencyData(frequencyData);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = this.low; i < this.high; i++) {
            barHeight = frequencyData[i];

            let r = barHeight + (25 * (i / bufferLength));
            let g = 250 * (i / bufferLength);
            let b = 50;

            ctx.fillStyle = "rgb(" + b + "," + r + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
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

class circle {
    constructor(low, high) {
        this.low = low;
        this.high = high;
        this.rads = Math.PI * 2 / (this.high - this.low);
        this.center_x = canvas.width / 2;
        this.center_y = canvas.height / 2;
        this.radius = 150;
    }

    draw() {
        let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "rgba(35, 7, 77, 1)");
        gradient.addColorStop(1, "rgba(204, 83, 51, 1)");
        // ctx.fillStyle = gradient;
        // ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.beginPath();
        ctx.arc(this.center_x, this.center_y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();

        analyser.getByteFrequencyData(frequencyData);
        for (let i = this.low; i < this.high; i++) {
            this.drawBar(i);
        }
    }

    drawBar(i) {
        let frequency = frequencyData[i];
        let bar_height = frequencyData[i] * 0.7;
        const cos = Math.cos(this.rads * i);
        const sin = Math.sin(this.rads * i);
        let x = this.center_x + cos * this.radius;
        let y = this.center_y + sin * this.radius;
        let x_end = this.center_x + cos * (this.radius + bar_height);
        let y_end =this. center_y + sin * (this.radius + bar_height);

        ctx.strokeStyle = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
        ctx.lineWidth = barWidth;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x_end, y_end);
        ctx.stroke();
    }
}


let circle1 = new circle(bufferLength * .50, bufferLength * .75);
let bar1 = new bar(0, bufferLength);
function renderFrame() {
    requestAnimationFrame(renderFrame);
    bar1.draw();
    circle1.draw();
}
renderFrame();
audioContext.resume();
