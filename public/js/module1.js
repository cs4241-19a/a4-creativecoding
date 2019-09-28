console.log('module1.js')

var astronaut
var asteroids = []
var ctx
var lives = 3
var score = 0

function start () {
  arena.start()
  astronaut = new Component(30, 30, 'white', 10, 120)
}

function restart () {
  reset()
  start()
}

// Canvas
var arena = {
  canvas: document.getElementById('gameCanvas'),
  start: function () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.canvas.style.cursor = 'none'
    this.context = this.canvas.getContext('2d')
    document.body.insertBefore(this.canvas, document.body.childNodes[0])
    this.frameNum = 0
    this.interval = setInterval(updateArena, 20) // refresh every 20 ms

    document.getElementById('livesTxt').innerHTML = 'Lives: ' + lives

    // mouse controller
    window.addEventListener('mousemove', function (e) {
      arena.x = e.pageX
      arena.y = e.pageY
    })
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  stop: function () {
    clearInterval(this.interval)
    this.canvas.style.cursor = 'auto'
    console.log('Game ended')
  }
}

function updateArena () {
  score = Math.floor(arena.frameNum / 50)
  document.getElementById('scoreTxt').innerHTML = 'Score: ' + score
  document.getElementById('livesTxt').innerHTML = 'Lives: ' + lives

  if (lives === 0) {
    stopBgMusic()
    arena.stop()
    return
  }
  var x, y, i
  for (i = 0; i < asteroids.length; i += 1) {
    if (astronaut.crashWith(asteroids[i])) {
      console.log('crash')
      asteroids.splice(i, 1)
      lives--
    }
  }

  arena.clear()
  arena.frameNum += 1

  if (spawninterval(10)) {
    x = getRandomInt(0, screen.width)
    y = getRandomInt(-30, -10)
    asteroids.push(new Component(30, 30, 'red', x, y))
  }

  for (i = 0; i < asteroids.length; i += 1) {
    asteroids[i].y += 4
    asteroids[i].update()
  }

  // rocket follows mouse
  if (arena.x && arena.y) {
    astronaut.x = arena.x
    astronaut.y = arena.y
  }

  astronaut.update()
}

function spawninterval (n) {
  if ((arena.frameNum / n) % 1 === 0) { return true }
  return false
}

// Objects
function Component (width, height, color, x, y, landed) {
  this.width = width
  this.height = height
  this.speedX = 0
  this.speedY = 0
  this.x = x
  this.y = y
  this.landed = 0
  this.update = function () {
    ctx = arena.context
    ctx.fillStyle = color
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
  this.newPos = function () {
    this.x += this.speedX
    this.y += this.speedY
  }
  this.crashWith = function (otherobj) {
    var myleft = this.x
    var myright = this.x + (this.width)
    var mytop = this.y
    var mybottom = this.y + (this.height)
    var otherleft = otherobj.x
    var otherright = otherobj.x + (otherobj.width)
    var othertop = otherobj.y
    var otherbottom = otherobj.y + (otherobj.height)
    var crash = true
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false
    }
    return crash
  }
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

var bgMusic

function playBgMusic () {
  bgMusic = new Sound('bensound-betterdays.mp3')
  bgMusic.play()
}

function stopBgMusic () {
  bgMusic.stop()
}

function Sound (src) {
  this.sound = document.createElement('audio')
  this.sound.src = src
  this.sound.setAttribute('preload', 'auto')
  this.sound.setAttribute('controls', 'none')
  this.sound.setAttribute('loop', 'none')
  this.sound.style.display = 'none'
  document.body.appendChild(this.sound)
  this.play = function () {
    this.sound.play()
  }
  this.stop = function () {
    this.sound.pause()
  }
}

function reset () {
  arena.stop()
  stopBgMusic()
  astronaut = null
  asteroids = []
  ctx = null
  lives = 3
  score = 0
}

// Export functions and const
export { start, playBgMusic, restart }
