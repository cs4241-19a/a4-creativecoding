let audioContext = new AudioContext();
let gain = audioContext.createGain();
let oscillator = audioContext.createOscillator();
let pan = audioContext.createStereoPanner();
let reverb = audioContext.createConvolver();
oscillator.connect(gain).connect(pan).connect(audioContext.destination);
gain.connect(reverb).connect(audioContext.destination);

let analyser = audioContext.createAnalyser();
reverb.connect(analyser);
analyser.fftSize = 2048;
let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

let isOscillatorStopped = true;

let oscs = [];

let canvas;
window.onload = () => {
    canvas = document.querySelector("#scope").getContext('2d');
    canvas.clearRect(0, 0, window.innerWidth, window.innerHeight);
    canvas.canvas.width = window.screen.availWidth;
    canvas.canvas.height = window.screen.availHeight * .66;

    oscillator.start();
    isOscillatorStopped = false;
    document.body.onkeyup = function (e) {
        if (e.key === ' ') {
            if (isOscillatorStopped) {
                gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(1, audioContext.currentTime + .03);
            } else {
                gain.gain.setValueAtTime(gain.gain.value, audioContext.currentTime);
                gain.gain.exponentialRampToValueAtTime(.00001, audioContext.currentTime + .03);
            }
            isOscillatorStopped = !isOscillatorStopped;
        }
    };
    fetch(`IMreverbs/${document.querySelector('#reverb').value}.wav`)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            audioContext.decodeAudioData(buffer, (impulse) => {
                reverb.buffer = impulse;
            })
        });
    draw();
};

function draw() {
    requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
    canvas.fillStyle = 'rgb(200, 200, 200)';
    canvas.fillRect(0, 0, window.innerWidth,  window.innerHeight);
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'rgb(0, 0, 0)';
    canvas.beginPath();
    let sliceWidth = window.innerWidth / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {

        let v = dataArray[i] / 128.0;
        let y = v * window.innerHeight / 2;

        if (i === 0) {
            canvas.moveTo(x, y);
        } else {
            canvas.lineTo(x, y);
        }

        x += sliceWidth;
    }
    canvas.lineTo(window.innerWidth, (window.innerHeight * .66)/2);
    canvas.stroke();
}

document.onmousemove = (e) => {
    let newX = e.clientX;
    let newY = window.innerHeight - e.clientY;
    if (!isOscillatorStopped) {
        oscillator.frequency.value = scale(newX, 0, window.innerWidth, 27.5, 4000);
        gain.gain.value = scale(newY, 0, window.innerHeight, .001, 2);
    }
    document.querySelector("#freq").innerHTML = oscillator.frequency.value + " Hz"
};

document.onclick = (e) => {
    let osc = audioContext.createOscillator();
    let gain = audioContext.createGain();
    osc.frequency.value = scale(e.clientX, 0, window.innerWidth, 100, 4000);
    gain.gain.value = scale(e.clientY, 0, window.innerHeight, .001, 2);
    osc.connect(gain).connect(audioContext.destination);
    osc.start();
    oscs.push({osc: osc, gain: gain});
};

function changePan(val) {
    pan.pan.setValueAtTime(val, audioContext.currentTime);
}

function changeReverb() {
    fetch(`IMreverbs/${document.querySelector('#reverb').value}.wav`)
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
            audioContext.decodeAudioData(buffer, (impulse) => {
                reverb.buffer = impulse;
            })
        })
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }
}

