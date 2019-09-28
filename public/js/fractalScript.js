// 'use Strict'
let c, ctx, canvCenterX, canvCenterY, theRadius;
let circle;
let isPaused = true;
let willReset = false; //to use when controls get updated and we want to kill the remaining drawings waiting to be run


let startColor = "rgb(27,213,222)";

window.onload = function () {
    "use strict";
    document.getElementById("playPause").addEventListener("onclick", playPause);

    c = document.getElementById("fractalHolder");
    ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    canvCenterX = c.width/2;
    canvCenterY = c.height/2;
    theRadius = 700;
    init(theRadius, 50, startColor, 10);
};


function init(radius, minRadius, aStartColor, blurRate){
    "use strict";

    startDrawingCircles(radius, minRadius, aStartColor, blurRate);

    let controls = new function () {
        this.radius = theRadius;
        this.minRadius = 20;
        this.blurRate = 10;
        this.aStartColor = startColor;

        //to update the parameters for characteristics
        this.redraw = function () {
            let newStartCol =  hexToRgb(controls.aStartColor);

            // remove the old plane if the radius or blurriness attribute was changed otherwise keep going
            if (!isCanvasBlank(c) && newStartCol===startColor) {
                ctx.clearRect(0, 0, c.width, c.height);
                willReset = true;
                ctx.beginPath();
                willReset = false;
            }
            startColor = hexToRgb(controls.aStartColor);
            startDrawingCircles(controls.radius, controls.minRadius, hexToRgb(controls.aStartColor), controls.blurRate);
        };
    }();

    //generate controls box on the gui that for every changed attribute calls the redraw function
    let gui = new dat.GUI();

    gui.add(controls, 'radius', 100, 800).step(1).onChange(controls.redraw);
    gui.add(controls, 'minRadius', 5, 99).step(1).onChange(controls.redraw);
    gui.add(controls, 'blurRate', 0, 20).step(1).onChange(controls.redraw);
    gui.addColor(controls, 'aStartColor').onChange(controls.redraw);

    gui.close();
    controls.redraw();

    //initial function that will draw cirles on the corners and the middle
    function startDrawingCircles(radius, minRadius, aStartColor, blurRate){

        drawCircleRecursive(0, 0,theRadius, minRadius, aStartColor, blurRate);
        drawCircleRecursive(window.innerWidth, 0, theRadius, minRadius, aStartColor, blurRate);

        drawCircleRecursive(canvCenterX, canvCenterY, theRadius, minRadius, aStartColor, blurRate);

        drawCircleRecursive(0, window.innerHeight,theRadius, minRadius, aStartColor, blurRate);
        drawCircleRecursive(window.innerWidth, window.innerHeight,theRadius, minRadius, aStartColor, blurRate);
    }
}





//drawing circle recursively
function drawCircleRecursive(centerX, centerY, radius, minRadius, color, blurRate){
    if(isPaused === false) {
        console.log("NOT PAUSED");
        if (color === startColor && willReset === false) {
            ctx.beginPath();
            circle = ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = color;
            ctx.shadowBlur = blurRate;
            ctx.shadowColor = color;
            ctx.stroke();

            //checking that radius is still bigger than the min radius and that the color is the same as the global color
            //if the color isnt the same that means it's an old process, the color has been updated so the process needs to be terminated
            //also checking if the pause parameter is on or off
            if (radius > minRadius) {
                    setTimeout(function () {
                        drawCircleRecursive(centerX + radius / 2, centerY, radius / 2, minRadius, color, blurRate);
                    }, 0);
                    setTimeout(function () {
                        drawCircleRecursive(centerX - radius / 2, centerY, radius / 2, minRadius, color, blurRate);
                    }, 0);
                    setTimeout(function () {
                        drawCircleRecursive(centerX, centerY + radius / 2, radius / 2, minRadius, color, blurRate);
                    }, 0);
                    setTimeout(function () {
                        drawCircleRecursive(centerX, centerY - radius / 2, radius / 2, minRadius, color, blurRate);
                    }, 0);
            }
        }
    }
    else {
            console.log("PAUSED");
            setTimeout(function () {
                console.log(centerX, centerY, radius, minRadius, color, blurRate);
                drawCircleRecursive(centerX, centerY, radius, minRadius, color, blurRate);
            }, 50);
    }
}



function onResize() {
    ctx.width = c.width;
    ctx.height = c.height;
}


//function to check if canvas is blank
function isCanvasBlank(c) {
    const blank = document.createElement('canvas');

    blank.width = c.width;
    blank.height = c.height;

    return c.toDataURL() === blank.toDataURL();
}


//function that converts hex values to rgb, for
function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")" : hex;
}

function playPause() {
    let btnContainer = document.getElementById("tempText")
    let btnPlayPause = document.getElementById("playPause");
    // let currentChild = document.children[0];
    // console.log("current child", currentChild);
    let curInnerHTML = btnPlayPause.innerHTML;
    if (curInnerHTML.includes("fa-play")) {
        //want to play
        isPaused = false;
        //turn btn to pause
        curInnerHTML = "";
        btnPlayPause.innerHTML = '<i class="fas fa-pause fa-2x" onclick="playPause()"></i>';
        btnContainer.innerText += 'Click here to continue!'
        // btnContainer.getElementById("tempText").setAttribute("style", "color: ghostwhite")
    } else {
        //want to pause
        isPaused = true;
        curInnerHTML = "";
        btnPlayPause.innerHTML = '<i class="fas fa-play fa-2x" onclick="playPause()"></i>';
        btnContainer.innerText = ""

    }

}