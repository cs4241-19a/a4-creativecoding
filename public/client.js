const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
}

addEventListener('mousemove', event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

const start = function () {
  // document.body.innerHTML = ''
  document.body.appendChild(canvas)
  const script = document.createElement('script')
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js'
  document.head.appendChild(script)
  const gui = new dat.GUI()
  gui.addColor(options, 'color')
  gui.add(options, 'shape', ['circle', 'spikes'])
  gui.add(options, 'stacked', ['yes', 'no']).name('stacked circles')
  gui.add(options, 'radius', 0, 4).name('size')
  gui.addColor(options, 'color1')
  gui.addColor(options, 'color2')
  // gui.add(options, 'speed')
  gui.add(options, 'Instructions')
  // audio init
  const audioCtx = new AudioContext()
  const audioElement = document.createElement('audio')
  document.body.appendChild(audioElement)

  // audio graph setup
  const analyser = audioCtx.createAnalyser()
  console.log(canvas.width)
  analyser.fftSize = (2048) // 1024 bins
  const player = audioCtx.createMediaElementSource(audioElement)
  player.connect(audioCtx.destination)
  player.connect(analyser)

  audioElement.src = 'https://cdn.glitch.com/81114d6f-b2df-463e-a279-bf48f357b862%2FThe%20Legend%20of%20Zelda%20Ocarina%20of%20Time%201.mp3?v=1569463425353'
  audioElement.crossOrigin = 'anonymous'
  // audioElement.playbackRate = 2.0
  audioElement.play()

  const results = new Uint8Array(analyser.frequencyBinCount)

  const draw = function () {
    // temporal recursion, call tthe function in the future
    window.requestAnimationFrame(draw)
    // style the background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    const c1 = 'rgba(' + options.color1[0] + ', ' + options.color1[1] + ', ' + options.color1[2] + ', ' + options.color1[3] + ')'
    const c2 = 'rgba(' + options.color2[0] + ', ' + options.color2[1] + ', ' + options.color2[2] + ', ' + options.color2[3] + ')'
    const c3 = 'rgb(' + options.color[0] + ', ' + options.color[1] + ', ' + options.color[2] + ')'
    gradient.addColorStop(0, c1)
    gradient.addColorStop(1, c2)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    audioElement.playbackRate = options.speed
    analyser.getByteFrequencyData(results)
    let stacker = 0
    for (let i = 0; i < analyser.frequencyBinCount; i++) {
      if (options.stacked === 'yes') {
        stacker = 0
      } else {
        stacker = 1
      }
      if (options.shape === 'circle') {
        makeCircles(mouse.x - (i * stacker), mouse.y, results[i] * options.radius, c3)
        // ctx.beginPath()
        // ctx.arc(mouse.x - (i * stacker), mouse.y, results[i] * options.radius, 0, 2 * Math.PI)
        // ctx.fillStyle = c3
        // ctx.fill()
        // ctx.stroke()
        // ctx.closePath()
      } else {
        makeRect(i, canvas.height, -results[i] * options.radius, c3)
        // ctx.fillRect(i, canvas.height, 1, -results[i] * options.radius) // rightside up
        // ctx.fillStyle = c3
        // ctx.fill()
      }
    }
  }
  draw()
}

const options = {
  color: [35, 205, 77],
  shape: 'circle',
  stacked: 'yes',
  radius: 1,
  color1: [0, 157, 85, 1],
  color2: [252, 87, 200, 1],
  speed: 1,
  Instructions: function () {
    $('#dialog').dialog('open')
  }
}

const makeCircles = function (x, y, radius, color) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

const makeRect = function (x, y, intensity, color) {
  ctx.fillRect(x, y, 1, intensity) // rightside up
  ctx.fillStyle = color
  ctx.fill()
}

window.onload = function () {
  start()
}

// export {start, options}
