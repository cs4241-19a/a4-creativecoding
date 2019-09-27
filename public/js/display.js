/*jshint esversion: 6 */
import {app} from './main.js';

// Draws the contents of a game grid onto the canvas
function displayGrid() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  if(app.smooth) {
    // Filling with a white layer for trail effects
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(0, 0, 800, 600);
  }
  else {ctx.clearRect(0, 0, 800, 600);}

  // Drawing current game grid
  ctx.fillStyle = app.cellColor;
  for(var j = 1; j < 800; j++) {
  for(var k = 1; k < 600; k++) {
    if(app.gameGrid[j][k] === 1) {
      ctx.fillRect(j * app.zoom, k * app.zoom, app.zoom, app.zoom);
    }
  }
  }

  // Updating gen count
  document.getElementById('genCount').innerHTML = 'Current generation: ' + app.gen;
}

export {displayGrid};