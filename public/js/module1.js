console.log('module1.js')

function start () {
  arena.start()
}

// Canvas
var arena = {
  canvas: document.getElementById('gameCanvas'),
  start: function () {
    this.canvas.width = screen.width
    this.canvas.height = screen.height
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.interval = setInterval(updateArena, 20)
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

function updateArena () {
  //arena.clear()
  // arena.newPos()
  //arena.update()
}

function hello () {
  console.log('hello from module 1')
}

// Export functions and const
export { start, hello }
