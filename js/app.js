const script = document.createElement('script')
script.src = '../dat.gui.min.js'
document.head.appendChild(script)
// import * as dat from '../dat.gui.min.js'

var shift = 0
var wave = {
  Amplitude: 60,
  Frequency: 1,
  PhaseShift: 0,
  VertShift: 0,
  Speed: 2
}

var waveStroke = {
  color: 'black'
}

window.onload = function () {
  init()
  const gui = new dat.GUI()
  gui.add(wave, 'Amplitude', 10, 300)
  gui.add(wave, 'Frequency', 0.1, 20)
  gui.add(wave, 'PhaseShift', -10, 10)
  gui.add(wave, 'VertShift', -200, 200)
  gui.add(wave, 'Speed', 0, 20)

//   gui.add(text, 'Frequency', 1, 10)
}

function init () {
  //   const canvas = document.getElementById('canvas')
  //   const ctx = canvas.getContext('2d')
  //   drawWave(ctx)
  window.requestAnimationFrame(draw)
}

function drawWave (ctx, shift) {
  const canvas = document.getElementById('canvas')
//   const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  
//   drawAxis(ctx, width, height)

  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.lineWidth = 3

  let x = 0
  let y

  while (x < width) {
    const radians = convertToRadians(x + shift)
    y = wave.Amplitude * Math.sin(radians * wave.Frequency + wave.PhaseShift) + (height / 2) + wave.VertShift
    ctx.lineTo(x, y)
    x++
  }

  ctx.stroke()

}

function draw () {
  const canvas = document.getElementById('canvas')
  const width = canvas.width
  const height = canvas.height
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, width, height)
  drawAxis(ctx, width, height)
  ctx.save()
  drawWave(ctx, shift)
  ctx.restore()
  shift += wave.Speed
  console.log('Step', shift)
  if (shift / (365 / wave.Frequency) >= 1) { // depends on frequency, change to divide by > 1
    shift = 5
  }
  window.requestAnimationFrame(draw)
}

function convertToRadians (degrees) {
  return degrees * Math.PI / 180
}

function drawAxis (ctx, width, height) {
  ctx.beginPath()
  ctx.moveTo(width / 2, 0)
  ctx.lineTo(width / 2, height)
  ctx.moveTo(0, height / 2)
  ctx.lineTo(width, height / 2)

  ctx.strokeStyle = 'black'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.moveTo(0, height / 2)
}

// draw()
