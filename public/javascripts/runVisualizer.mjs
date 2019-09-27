import {formatNum} from "./numberUtil.mjs";

let pause = false;
let thresholdValue  = 500;




export function updateThresholdValue(){
    const threshold = document.getElementById("freezeThreshold");
    thresholdValue = parseInt(threshold.value)
}
export function pauseButton(){
    const pauseSwitch = document.getElementById("pause");
    if(pause){
        pause = false;
        const audioControls = document.getElementById("audioControls");
        audioControls.play();
        pauseSwitch.style.background = "green";
        pauseSwitch.style.outlineColor = "green";
        pauseSwitch.innerText = "Pause"
    }
    else {
        pause = true;
        const audioControls = document.getElementById("audioControls");
        audioControls.pause();
        pauseSwitch.style.background = "#8b0000";
        pauseSwitch.style.outlineColor = "#8b0000";
        pauseSwitch.innerText = "Resume"

    }
}
export function runVisualizer(analyzer, audioContext) {
    document.getElementById("visualizerDiv").hidden = false;
    document.getElementById("startupControls").hidden = true;

    let canvas = document.getElementById("visualizer");

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let canvasContext = canvas.getContext("2d");
    analyzer.fftSize = 256;
    const bufferSize = analyzer.frequencyBinCount;
    let audioDataArray = new Uint8Array(bufferSize);
    let labelArray = new Array(bufferSize);

    const frequencyBarWidth = (audioContext.sampleRate/bufferSize)/2;
    //Format Numbers for labels
    for (let i = 0; i < bufferSize; i++){
        labelArray[i] = formatNum(Math.round(frequencyBarWidth * (i + 1)))
    }


    let barWidth = (canvasWidth/bufferSize) * 2.5;
    let currentFrequency;
    let barHeight;
    let request;
    let labelOffset = 30;
    let currentTallest = 0;
    let red = 0;
    let green= 0;
    let blue = 255;
    let frequencyOffset;

    function renderFrame() {
        request = requestAnimationFrame(renderFrame);
        frequencyOffset = 0;
        if (pause === false) {
            analyzer.getByteFrequencyData(audioDataArray);
            currentTallest = 0
        }
        canvasContext.fillStyle = "#000000";
        canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);

        //canvasContext.beginPath()
        //canvasContext.strokeStyle = "#FF0000"
        //canvasContext.setLineDash([5, 15])
        //canvasContext.moveTo(0, thresholdValue)
        //canvasContext.lineTo(canvasWidth, thresholdValue)
        //canvasContext.stroke()

        canvasContext.fillStyle = "#FF0000";
        canvasContext.fillRect(0, canvasHeight - thresholdValue-labelOffset, canvasWidth, 10);
        for (let i = 0; i < bufferSize; i++) {
            red = 0;
            green= 0;
            blue = 255;
            barHeight = audioDataArray[i];
            currentFrequency = labelArray[i];
            frequencyOffset += barWidth + 1;
            if (barHeight > thresholdValue) {
                if(barHeight >= currentTallest){
                    currentTallest = barHeight;
                    canvasContext.fillStyle = "#FFFFFF";
                    canvasContext.font = "20px sans-serif";
                    green = 255;
                    blue = 0;
                    canvasContext.fillText(currentFrequency + " HZ", frequencyOffset-10, (canvasHeight - barHeight) - labelOffset - 10)
                }
                if(!pause) {
                    pauseButton()
                }
            }
            canvasContext.fillStyle = "RGB("+ red + "," + green + "," + blue +")";
            canvasContext.fillRect(frequencyOffset, (canvasHeight - barHeight)- labelOffset, barWidth, barHeight);
            if(i%4===0) {
                canvasContext.fillStyle = "#FFFFFF";
                canvasContext.font = "20px sans-serif";
                canvasContext.fillText(currentFrequency, frequencyOffset, canvasHeight - 10,)
            }
        }
    }
    renderFrame();
}

