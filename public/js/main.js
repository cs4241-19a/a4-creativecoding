let canvas = $('#drawArea')[0],
	ctx = canvas.getContext("2d"),
	color = "#ff0000",
	backgroundColor = '#ffffff',
	size = 10,
	currentBrush = "Pencil";
    
import * as ui from './ui.js';
import * as drawing from './drawing.js';
ui.init();
drawing.resize();

function changeColor(newColor){
	color = newColor;
}

function changeBackgroundColor(newColor){
	backgroundColor = newColor;
}

function changeSize(newSize){
	size = newSize;
}

function changeBrush(newBrush){
	currentBrush = newBrush;
}

export{canvas,ctx,color,backgroundColor,size,currentBrush, changeColor, changeBackgroundColor, changeSize, changeBrush};