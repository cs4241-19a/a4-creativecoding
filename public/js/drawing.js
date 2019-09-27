import * as main from './main.js';

let mouse = {x: 0, y: 0},
	ctx = $('#drawArea')[0].getContext("2d");

function resize() {
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
}
 
ctx.canvas.addEventListener('mousemove', function(e) {
	mouse.x = e.pageX - this.offsetLeft;
	mouse.y = e.pageY - this.offsetTop;
}, false);
 
ctx.canvas.addEventListener('mousedown', function(e) {
	ctx.beginPath();
	ctx.moveTo(mouse.x, mouse.y);
	if(main.currentBrush == "Eraser")
		ctx.strokeStyle = main.backgroundColor;
	else
		ctx.strokeStyle = main.color;
	ctx.lineWidth = main.size;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.canvas.addEventListener('mousemove', paint, false);
}, false);
  

ctx.canvas.addEventListener('mouseup', function() {
	ctx.canvas.removeEventListener('mousemove', paint, false);
}, false);
  
var paint = function() {
	ctx.lineTo(mouse.x, mouse.y);
	ctx.stroke();
};

export{resize}; 