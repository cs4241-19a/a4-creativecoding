// Creates an array with specified number of rows
// TODO make it variable
function createArray() {
  var arr = [];
  for(var i = 0; i < 100; i++) {
    arr[i] = [];
  }
  return arr;
}

// Returns a randomly populated grid
function randomGrid() {
  var newGrid = createArray();

  for(var j = 0; j < 100; j++) {
    for(var k = 0; k < 100; k++) {
      let rand = Math.round(Math.random());
      newGrid[j][k] = rand;
    }
  }
  return newGrid;
}

// Returns the next generation of a grid
// TODO have variable 
function nextGen() {
  var newGrid = createArray();

  // Checking all cells in grid
  for(var j = 0; j < 100; j++) {
    for(var k = 0; k < 100; k++) {
      let neighbors = 0;

      // Calculating number of neighbors for cell
      neighbors += gameGrid[j - 1][k - 1];
      neighbors += gameGrid[j - 1][k];
      neighbors += gameGrid[j - 1][k + 1];

      neighbors += gameGrid[j][k - 1];
      neighbors += gameGrid[j][k + 1];

      neighbors += gameGrid[j + 1][k - 1];
      neighbors += gameGrid[j + 1][k];
      neighbors += gameGrid[j + 1][k + 1];

      // Handling live cells
      if(gameGrid[j][k] === 1) {
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
  return newGrid;
}