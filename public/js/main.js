let audio = document.getElementById("audio");
const width = 1024;
const height = 600;
const interval = 128;
let canvas, context, audioctx, analyzer, oscillator, source, freqArr, barHeight;

const initialize = function() {
    canvas = document.getElementById("studio-canvas");
    context = canvas.getContext("2d");
    const buttonTest = document.getElementById("testButton");
    buttonTest.onclick = playSong;
    const buttonTest2 = document.getElementById("testButton2");
    buttonTest2.onclick = playSong2;
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
};

function draw() {
    console.log("in draw method");
    if(!audio.paused) {
        let bigBars = 0;
        let x = 0;
        context.clearRect(0, 0, width, height);
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
            context.fillRect(x, height - barHeight, (width/interval) - 1, barHeight);
            x += width/interval;
        }
    }
    window.requestAnimationFrame(draw);
}


const playSong = function(e) {
    e.preventDefault();
    console.log("playSong method");
    let azureLines = document.getElementById("audio");
    azureLines.play();
    window.requestAnimationFrame(draw);
};

const playSong2 = function(e) {
    e.preventDefault();
    let azureSky = document.getElementById("azureSky");
    azureSky.play();
};

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

window.onload = function() {
    initialize();
};