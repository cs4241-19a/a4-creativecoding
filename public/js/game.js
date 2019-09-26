import {app} from './main.js';

// Creates an array with specified number of rows
// TODO make it variable
function createArray() {
  var arr = [];
  for(var i = 0; i < 800; i++) {
    arr[i] = [];
  }
  return arr;
}

// Returns a totall randomly populated grid
// Warning: Experimental. Causes lots of lag
function randomLarge() {
  for(var j = 0; j < 800; j++) {
    for(var k = 0; k < 600; k++) {
      let rand = Math.round(Math.random());
      app.gameGrid[j][k] = rand;
      app.visited.push({j: j, k: k});
    }
  }
}

// Populates a 200 by 150 size grid
function randomSmall() {
  // Initializing all to zero
  for(var j = 0; j < 800; j++) {
    for(var k = 0; k < 600; k++) {
      app.gameGrid[j][k] = 0;
    }
  }

  // Filling in smaller area randomly
  for(var j = 299; j < 500; j++) {
    for(var k = 199; k < 400; k++) {
      let rand = Math.round(Math.random());
      app.gameGrid[j][k] = rand;
      app.visited.push({j: j, k: k});
    }
  }
}

// Returns the next generation of a grid
// TODO have variable 
function nextGen() {
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
          app.visited.push({j: j, k: k});
        }
        // No birth
        else newGrid[j][k] = 0;
      }
    }
  }

  // Assigning new grid cells to game grid
  for(var j = 0; j < 800; j++) {
    for(var k = 0; k < 600; k++) {
      app.gameGrid[j][k] = newGrid[j][k];
    }
  }
  app.gen++;
}

export {createArray, randomLarge, randomSmall, nextGen};