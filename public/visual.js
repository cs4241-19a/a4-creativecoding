const audio = document.querySelector('audio');
const audioContext = new AudioContext();
const source = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();
analyser.fftSize = 8192;

source.connect(analyser);
source.connect(audioContext.destination);

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);

let frequencyData = new Uint8Array(bufferLength);


let WIDTH = canvas.width;
let HEIGHT = canvas.height;
// let circleBars = 400;
let circleBarWidth = 2;
let barHeight;

function newBar(low, high) {
    let bar = {
        draw() {
            // requestAnimationFrame(this.draw.bind(this));
            // analyser.getByteFrequencyData(frequencyData);
            let x = 0;
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = this.low; i < this.high; i++) {
                barHeight = frequencyData[i];

                let r = barHeight + (25 * (i / bufferLength));
                let g = 250 * (i / bufferLength);
                let b = 50;

                ctx.fillStyle = "rgb(" + r + "," + b + "," + g + ")";
                ctx.fillRect(x, HEIGHT - barHeight, this.barWidth, barHeight);

                x += this.barWidth + 1;
            }
        }
    };
    bar.low = low;
    bar.high = high;
    bar.barWidth = (WIDTH / (high - low)) * 2.5;

    return bar;
}


function newCircle(low, high, radius) {
    let circle = {
        draw: function () {
            // requestAnimationFrame(this.draw.bind(this));
            // analyser.getByteFrequencyData(frequencyData);
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

        drawBar: function (i) {
            let frequency = frequencyData[i];
            let bar_height = frequencyData[i] * 0.7;
            const cos = Math.cos(this.rads * i);
            const sin = Math.sin(this.rads * i);
            let x = this.center_x + cos * this.radius;
            let y = this.center_y + sin * this.radius;
            let x_end = this.center_x + cos * (this.radius + bar_height);
            let y_end = this.center_y + sin * (this.radius + bar_height);

            ctx.strokeStyle = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";
            ctx.lineWidth = circleBarWidth;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x_end, y_end);
            ctx.stroke();
        }
    };

    circle.low = low;
    circle.high = high;
    circle.rads = Math.PI * 2 / (this.high - this.low);
    circle.center_x = canvas.width / 2;
    circle.center_y = canvas.height / 2;
    circle.radius = radius;
    circle.draw();
    return circle;
}

let circle1 = newCircle(0, bufferLength * .625, 75);
let bar1 = newBar(0, bufferLength * 0.5);

function renderFrame() {
    requestAnimationFrame(renderFrame);
    analyser.getByteFrequencyData(frequencyData);
    bar1.draw();
    circle1.draw();
}

renderFrame();
