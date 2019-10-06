const sounds = require('./sounds.js');
const analyzer = sounds.analyzer;
analyzer.fftSize = 2048;
let bufferLength = analyzer.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
let isFreqAnalysis = false;
let canvas;

function init() {
  canvas = document.querySelector('#scope').getContext('2d');
  canvas.clearRect(0, 0, window.innerWidth, window.innerHeight * 2 / 3);
  canvas.canvas.width = window.innerWidth;
  canvas.canvas.height = window.innerHeight * 2 / 3;
  draw();

  $('.fa-clock').click(() => {
    analyzer.fftSize = 2048;
    bufferLength = analyzer.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    canvas.clearRect(0, 0, canvas.canvas.innerWidth, canvas.canvas.innerHeight);
    isFreqAnalysis = false;
  });

  $('.fa-signal').click(() => {
    analyzer.fftSize = 256;
    bufferLength = analyzer.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    canvas.clearRect(0, 0, canvas.canvas.innerWidth, canvas.canvas.innerHeight);
    isFreqAnalysis = true;
  });
}

let fpsInterval = 1000 / 15;
let then = Date.now();

function draw() {
  requestAnimationFrame(draw);
  let now = Date.now();
  let elapsed = now - then;

  // if enough time has elapsed, draw the next frame

  if (elapsed < fpsInterval) {

    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    return;
  }
  then = now - (elapsed % fpsInterval);
  if (!isFreqAnalysis) {
    analyzer.getByteTimeDomainData(dataArray);

    canvas.fillStyle = 'rgb(5,26,96)';
    canvas.fillRect(0, 0, window.innerWidth, window.innerHeight * 2 / 3);
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'rgb(255,255,255)';
    canvas.beginPath();
    let sliceWidth = window.innerWidth / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * window.innerHeight * 2 / 3 / 2;

      if (i === 0) {
        canvas.moveTo(x, y);
      } else {
        canvas.lineTo(x, y);
      }

      x += sliceWidth;
    }
    canvas.lineTo(window.innerWidth, (window.innerHeight * 2 / 3) / 2);
    canvas.stroke();
  } else {
    analyzer.getByteFrequencyData(dataArray);
    canvas.fillStyle = 'rgb(5, 26, 96)';
    canvas.fillRect(0, 0, window.innerWidth, window.innerHeight * 2 / 3);
    let barWidth = (window.innerWidth / bufferLength) * 5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 2;

      canvas.fillStyle = 'rgb(' + 255 + ',255,255)';
      canvas.fillRect(x, 0, barWidth, barHeight);

      x += barWidth + 1;
    }
  }
}

module.exports = {init: init, draw: draw, isFreqAnalysis: isFreqAnalysis};
