import * as game from './game.js';
import * as display from './display.js';

var instance = function() {
  this.gameGrid = game.createArray();
  this.visited = [];
  this.gen = 0;
  this.zoom = 1;
  this.stop = false;
  this.cellColor = '#9e00ff'
  this.smooth = false;
}

var app = new instance();

function init() {
  var gui = new dat.GUI();
  gui.add(app, 'zoom', 1, 10).step(1);
  gui.add(app, 'stop');
  gui.add(app, 'smooth');
  gui.addColor(app, 'cellColor');

  game.randomLarge();
  display.displayGrid();
  loop();
}

function loop() {
  if(!app.stop) {
    game.nextGen();
    display.displayGrid();
    requestAnimationFrame(loop);
  }
  else {requestAnimationFrame(loop)};
}

window.addEventListener('load', init());

export {app};