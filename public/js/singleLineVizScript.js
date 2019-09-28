import {prepAudio} from "./prepareAudioForAnalysis.js"

window.onload = function () {
    vizInit()
}


let file, fileLabel, mediaElement, gainNode;

//will get the submitted audio file, label it,
// and assign it to a table for future use
//after user submits the file
let vizInit = function () {

    file = document.getElementById("thefile");
    fileLabel = document.querySelector("label.file");
    mediaElement = document.getElementById("audio");


    //if the user changes the file
    file.onchange = function () {
        fileLabel.classList.add('normal');
        mediaElement.classList.add('active');
        let files = this.files;

        mediaElement.src = URL.createObjectURL(files[0]);
        mediaElement.load();
        mediaElement.play();

        //call the function that generates the graphics
        spectogram()
    }
}

function spectogram() {
    let analyser;

    let audioElements = prepAudio(mediaElement);
    analyser = audioElements.analyser;
    gainNode = audioElements.gainNode;

    //generate waveform from frequency extracted from song by analyzer
    const waveform = new Float32Array(analyser.frequencyBinCount);
    analyser.getFloatTimeDomainData(waveform);

    //updates the waveform based on frequencies in every frame
    //to keep up with the song
    function updateWaveform() {
        requestAnimationFrame(updateWaveform);
        analyser.getFloatTimeDomainData(waveform)
    }

    updateWaveform();

    //draw the waveform on a canvas
    const canvas = document.getElementById('oscillatingElement');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');

    //updates the image shown so that it is he same as the new waveform fro every frame
    function drawOscilloscope() {
        requestAnimationFrame(drawOscilloscope);
        context.clearRect(0, 0, canvas.width, canvas.height); //clear canvas for updating waveform line
        context.beginPath();
        for (let i = 0; i < waveform.length; i++) {
            const x = (window.innerWidth/2)-(waveform.length/2) + i; //x position - centering the waveform
            const y = (1 + waveform[i] / 3) * canvas.height/1.8; //y position
            context.strokeStyle = getGreenToRed(Math.abs(waveform[i])*1500)
            context.lineWidth = 3;
            context.arc(x, y+Math.abs(waveform[i]*10), Math.abs(waveform[i]*30), Math.PI*Math.abs(waveform[i]*1000), Math.PI * 2, true);

        }
        context.stroke()
    }
    drawOscilloscope()
}


//function that converts percentage to a rgb value between green and red
//taken from https://stackoverflow.com/questions/7128675/from-green-to-red-color-depend-on-percentage
function getGreenToRed(percent){
    let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
    let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
    return 'rgb('+r+','+g+',0)';
}

