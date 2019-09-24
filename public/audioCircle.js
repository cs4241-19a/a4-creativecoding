let center_x;
let center_y;
let radius;
let bars;
let x_end;
let y_end;
let bar_height;
let bar_width;


bars = 200;
bar_width = 2;

const audioContext = new AudioContext();
const audio = new Audio();
audio.src = "Jupiter.mp3"; // the source path
const source = audioContext.createMediaElementSource(audio);

const analyser = audioContext.createAnalyser();
source.connect(analyser);
source.connect(audioContext.destination);


let frequency_array = new Uint8Array(analyser.frequencyBinCount);

audio.play();
animationLooper();

function initPage(){

}

function animationLooper(){
    // set to the size of device
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    // find the center of the window
    center_x = canvas.width / 2;
    center_y = canvas.height / 2;
    radius = 150;

    // style the background
    var gradient = ctx.createLinearGradient(0,0,0,canvas.height);
    gradient.addColorStop(0,"rgba(35, 7, 77, 1)");
    gradient.addColorStop(1,"rgba(204, 83, 51, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    //draw a circle
    ctx.beginPath();
    ctx.arc(center_x,center_y,radius,0,2*Math.PI);
    ctx.stroke();

    analyser.getByteFrequencyData(frequency_array);
    for(var i = 0; i < bars; i++){

        //divide a circle into equal parts
        rads = Math.PI * 2 / bars;

        bar_height = frequency_array[i]*0.7;

        // set coordinates
        x = center_x + Math.cos(rads * i) * (radius);
        y = center_y + Math.sin(rads * i) * (radius);
        x_end = center_x + Math.cos(rads * i)*(radius + bar_height);
        y_end = center_y + Math.sin(rads * i)*(radius + bar_height);

        //draw a bar
        drawBar(x, y, x_end, y_end, bar_width,frequency_array[i]);

    }
    requestAnimationFrame(animationLooper);
}

// for drawing a bar
function drawBar(x1, y1, x2, y2, width,frequency){

    var lineColor = "rgb(" + frequency + ", " + frequency + ", " + 205 + ")";

    ctx.strokeStyle = lineColor;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}
