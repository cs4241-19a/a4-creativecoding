// Draws the contents of a game grid onto the canvas
function displayGrid() {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  // Clearing canvas before redraw
  ctx.clearRect(0, 0, 690, 420);
  ctx.fillStyle = '#FF0000'

  for(var j = 0; j < 100; j++) {
    for(var k = 0; k < 100; k++) {
      if(gameGrid[j][k] === 1) {
        ctx.fillRect(j, k, 1, 1);
      }
    }
  }
}