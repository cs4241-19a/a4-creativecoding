const drawGrid = function (grid, w, h, size) {
  var c = document.getElementById('myCanvas')
  var ctx = c.getContext('2d')
  for (var i = 0; i < w; i++) {
    ctx.beginPath()
    ctx.moveTo(i * size, 0)
    ctx.lineTo(i * size, h * size)
    ctx.stroke()
  }
  for (i = 0; i < h; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * size)
    ctx.lineTo(w * size, i * size)
    ctx.stroke()
  }
}
const drawSquares = function (grid, w, h, size) {
  var c = document.getElementById('myCanvas')
  var ctx = c.getContext('2d')
  ctx.fillStyle = '#FF0000'
  for (var i = 0; i < w; i++) {
    for (var j = 0; j < h; j++) {
      if (grid[i][j]) {
        ctx.fillRect(i * size, j * size, size, size)
      }
    }
  }
}
const drawAll = function (grid, w, h, size) {
  var c = document.getElementById('myCanvas')
  var ctx = c.getContext('2d')
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, w * size, h * size)
  drawSquares(grid, w, h, size)
  if (size > 3) {
    drawGrid(grid, w, h, size)
  }
}
export default drawAll
