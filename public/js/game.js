/*jshint esversion: 6 */
import {app} from './main.js';
import { displayGrid } from './display.js';

// Creates an array with specified number of rows
// TODO make it variable
const createArray = function() {
  var arr = [];
  for(var i = 0; i < 800; i++) {
    arr[i] = [];
  }
  return arr;
};

// Returns a totall randomly populated grid
// Warning: Experimental. Causes lots of lag
const randomLarge = function() {
  for(var j = 0; j < 800; j++) {
    for(var k = 0; k < 600; k++) {
      let rand = Math.round(Math.random());
      app.gameGrid[j][k] = rand;
    }
  }
};

// Populates a 200 by 150 size grid
const randomSmall = function() {
  // Filling in smaller area randomly
  for(var j = 299; j < 500; j++) {
    for(var k = 199; k < 400; k++) {
      let rand = Math.round(Math.random());
      app.gameGrid[j][k] = rand;
    }
  }
};

// Returns the next generation of a grid
// TODO have variable 
const nextGen = function() {
  var newGrid = createArray();

  // Checking all cells in grid
  for(var j = 1; j < 800 - 1; j++) {
    for(var k = 1; k < 600 - 1; k++) {
      //console.log('j:', j, 'k:', k);
      let neighbors = 0;

      // Calculating number of neighbors for cell
      neighbors += app.gameGrid[j - 1][k - 1];
      neighbors += app.gameGrid[j - 1][k];
      neighbors += app.gameGrid[j - 1][k + 1];

      neighbors += app.gameGrid[j][k - 1];
      neighbors += app.gameGrid[j][k + 1];

      neighbors += app.gameGrid[j + 1][k - 1];
      neighbors += app.gameGrid[j + 1][k];
      neighbors += app.gameGrid[j + 1][k + 1];

      // Handling live cells
      if(app.gameGrid[j][k] === 1) {
        // Survival
        if(neighbors === 2 || neighbors === 3) {
          newGrid[j][k] = 1;
        }
        // Death
        else newGrid[j][k] = 0;
      }
      // Handling dead cells
      else {
        // Birth
        if(neighbors === 3) {
          newGrid[j][k] = 1;
        }
        // No birth
        else newGrid[j][k] = 0;
      }
    }
  }

  // Assigning new grid cells to game grid
  for(var x = 0; x < 800; x++) {
    for(var y = 0; y < 600; y++) {
      app.gameGrid[x][y] = newGrid[x][y];
    }
  }
  app.gen++;
};

// Updates layout for a new grid
const updateLayout = function(layout) {
  // Clearing game grid
  for(var j = 1; j < 800 - 1; j++) {
    for(var k = 1; k < 600 - 1; k++) {
      app.gameGrid[j][k] = 0;
    }
  }
  app.gen = 0;

  // Checking for randoms
  if(layout === 'randSmall') {
    randomSmall();
    return;
  } 
  else if(layout === 'randLarge') {
    randomLarge();
    return;
  }

  // Getting data for selected layout
  fetch('/layout', {
    method: 'POST',
    body: JSON.stringify({layout: layout}),
    headers: {'Content-Type': 'application/json'}
  })
  .then(res => res.json())
  .then(json => {
    console.log(json);
    if(json.name != layout) {
      throw 'Wrong Layout';
    }
    json.cells.forEach(cell => {
      app.gameGrid[cell.j][cell.k] = 1;
    });
  })
  .then(displayGrid())
  .catch(err => console.error(err));
};

export {createArray, randomLarge, randomSmall, nextGen, updateLayout};