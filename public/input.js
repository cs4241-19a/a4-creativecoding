//document.getElementById ("help").addEventListener ("click", help, false);


export function updatePage(){
var xspeed = document.getElementById("xspeedRange");
var xspeedVal = document.getElementById("xspeedVal");
xspeedVal.innerHTML = xspeed.value;

xspeed.oninput = function () {
    xspeedVal.innerHTML = this.value;
};

var size = document.getElementById("sizeRange");
var sizeVal = document.getElementById("sizeVal");
sizeVal.innerHTML = size.value;

size.oninput = function () {
    sizeVal.innerHTML = this.value;
};

var yspeed = document.getElementById("yspeedRange");
var yspeedVal = document.getElementById("yspeedVal");
yspeedVal.innerHTML = yspeed.value;

yspeed.oninput = function () {
    yspeedVal.innerHTML = this.value;
};

var zspeed = document.getElementById("zspeedRange");
var zspeedVal = document.getElementById("zspeedVal");
zspeedVal.innerHTML = zspeed.value;

zspeed.oninput = function () {
    zspeedVal.innerHTML = this.value;
};

var xPos = document.getElementById("xPos");
var xPosVal = document.getElementById("xPosVal");
xPosVal.innerHTML = xPos.value;

xPos.oninput = function () {
    xPosVal.innerHTML = this.value;
};

var yPos = document.getElementById("yPos");
var yPosVal = document.getElementById("yPosVal");
yPosVal.innerHTML = yPos.value;

yPos.oninput = function () {
    yPosVal.innerHTML = this.value;
};
}

