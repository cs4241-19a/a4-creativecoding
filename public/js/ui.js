let imageLoader = $('#imageLoader')[0];
imageLoader.addEventListener('change', handleImage, false);
import * as main from './main.js';

let FizzyText = function() {
	this.Color = "#ff0000";
	this.Background_Color = '#ffffff';
	this.Brush_Size = 5;
	this.Brushes = "Pencil";
	this.Clear = function(){
		main.ctx.fillStyle = main.backgroundColor;
		main.ctx.fillRect(0, 0, main.canvas.width, main.canvas.height);
	};
	this.Save_Image = function(){
		let canvasImage = document.getElementById('drawArea').toDataURL('image/jpeg', 1.0);
		$("#downloadIm").attr("href", canvasImage);
		document.getElementById("downloadIm").click();
	};
	this.Load_File = function(){
		imageLoader.click();
	};
	this.Welcome = function(){
		helpPopup();
	};
  
};

function init() {
	console.log('Hello');
	main.ctx.fillStyle = main.backgroundColor;
	main.ctx.fillRect(0, 0, main.canvas.width, main.canvas.height);
	let text = new FizzyText();
	let gui = new dat.GUI();
	let brushes = gui.add(text, "Brushes", ["Pencil" ,"Eraser"]);
	let getColor = gui.addColor(text, 'Color');
	let brushSize = gui.add(text, 'Brush_Size', 1, 100);
	let getBackColor = gui.addColor(text, 'Background_Color');
	let clear = gui.add(text, 'Clear');
	let download = gui.add(text, 'Save_Image');
	let load = gui.add(text, "Load_File");
	let welcome = gui.add(text, "Welcome");

	getColor.onFinishChange(function(){
		main.changeColor(getColor.object.Color);
	});
	brushSize.onFinishChange(function() {
		main.changeSize(brushSize.object.Brush_Size);
	});

	brushes.onFinishChange(function(){
		main.changeBrush(brushes.object.Brushes);
	});
	getBackColor.onFinishChange(function(){
		main.changeBackgroundColor(getBackColor.object.Background_Color);
		main.ctx.fillStyle = main.backgroundColor;
		main.ctx.fillRect(0, 0, main.canvas.width, main.canvas.height);
	});
	helpPopup();
};


function handleImage(e){
	var reader = new FileReader();
	reader.onload = function(event){
		var img = new Image();
		img.onload = function(){
			main.ctx.drawImage(img,0,0);
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(e.target.files[0]);     
}

function helpPopup(){
	$("#dialog").dialog();
}

export{init};