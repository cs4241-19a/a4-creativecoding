/*jshint esversion: 6 */
import * as game from './game.js';
import * as display from './display.js';

// Defining an object to be exported to modules
const instance = function() {
  this.gameGrid = game.createArray();
  this.gen = 0;
  this.zoom = 1;
  this.stop = true;
  this.cellColor = '#9e00ff';
  this.smooth = false;
  this.layout = 'randSmall';
  this.help = true;
  this.rules = true;
};
var app = new instance();

// Function to initialize the page
const init = function() {
  var gui = new dat.GUI();
  var layoutController = gui.add(app, 'layout', 
      ['randSmall', 'randLarge', 'acorn', 'blinker', 'diehard', 'glider', 'r_pentomino']);
  var helpController = gui.add(app, 'help');
  var rulesController = gui.add(app, 'rules');
  gui.add(app, 'zoom', 1, 10).step(1);
  gui.add(app, 'stop').listen();
  gui.add(app, 'smooth');
  gui.addColor(app, 'cellColor');

  layoutController.onChange(function(layout) {
    game.updateLayout(layout);
  });

  helpController.onChange(function(help) {
    document.getElementById('help').hidden = !help;
  });

  rulesController.onChange(function(rules) {
    document.getElementById('rules').hidden = !rules;
  });

  game.updateLayout(app.layout);
  display.displayGrid();
  loop();
};

// Game loop function
const loop = function() {
  if(!app.stop) {
    game.nextGen();
    display.displayGrid();
    requestAnimationFrame(loop);
  }
  else {requestAnimationFrame(loop);}
};

// Handling get requests for layouts


window.addEventListener('load', init());

export {app};