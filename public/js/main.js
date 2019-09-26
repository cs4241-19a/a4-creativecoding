import { openInfo, startup } from './alert.js';
import { saveImage, triggerClick } from './files.js';

var canvas = document.getElementById('canvasArea');
var context = canvas.getContext('2d');
context.lineWidth = 5;
context.lineCap = 'round';
var down = false;

var xPos;
var yPos;

canvas.addEventListener('mousemove', draw);

/* function for drawing */
canvas.addEventListener('mousedown', function () {
  down = true;
  context.beginPath();
  context.moveTo(xPos, yPos);
  canvas.addEventListener('mousemove', draw);
});

/* stop drawing */
canvas.addEventListener('mouseup', function () {
  down = false;
});

/* stop drawing when mouse leaves canvas */
canvas.addEventListener('mouseleave', function () {
  down = false;
});

/* draw stuff */
function draw (e) {
  xPos = e.clientX - canvas.offsetLeft;
  yPos = e.clientY - canvas.offsetTop;
  if (down === true) {
    context.lineTo(xPos, yPos);
    context.stroke();
  }
}

/* change the brush color */
function changeColor (color) {
  context.strokeStyle = color;
  context.fillStyle = color;
  document.getElementById('currentColor').style.background = color;
  document.getElementById('colorSelect').value = color;
}

/* clear the canvas */
function clearCanvas () {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

/* change the brush size */
function changeBrushSize (size) {
  context.lineWidth = size;
}

/* ill the canvas with the current color */
function fillCanvas () {
  context.fillRect(0, 0, canvas.width, canvas.height);
}

/* change the style of the brush */
function changeBrushStyle (brush) {
  context.lineCap = brush;
}

/* load an image file */
document.getElementById('file').addEventListener('change', function (e) {
  clearCanvas();
  var URL;
  URL = URL || window.webkitURL;
  var temp = URL.createObjectURL(e.target.files[0]);
  var image = new window.Image();
  image.src = temp;
  image.addEventListener('load', function () {
    var imageWidth = image.naturalWidth;
    var imageHeight = image.naturalHeight;
    var newImageWidth = imageWidth;
    var newImageHeight = imageHeight;
    var originalImageRatio = imageWidth / imageHeight;
    if (newImageWidth > newImageHeight && newImageWidth > 800) {
      newImageWidth = 800;
      newImageHeight = 800 / originalImageRatio;
    }
    if ((newImageWidth >= newImageHeight || newImageHeight > newImageWidth) && newImageHeight > 500) {
      newImageHeight = 500;
      newImageWidth = 500 * originalImageRatio;
    }

    context.drawImage(image, 0, 0, newImageWidth, newImageHeight);
    URL.revokeObjectURL(temp);
  });
});

/* select a custom color */
function customColor () {
  var color = document.getElementById('colorSelect').value;
  changeColor(color);
}

/* click on the color selector field */
function clickColor () {
  document.getElementById('colorSelect').click();
}

/* display the startup message */
startup();

export { openInfo, clickColor, customColor, saveImage, triggerClick, changeBrushStyle, fillCanvas, changeBrushSize, clearCanvas, changeColor, draw };
