import { convertToRadians, getY } from './trig.js'
import { checkShift, getMidPoints } from './canvasUpdate.js'

const script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.min.js'
document.head.appendChild(script)

// Keep track of how far to shift wave forward
let shift = 0

// Wave obj to store parameters from dat.gui
const wave = {
  Amplitude: 60,
  Frequency: 1,
  PhaseShift: 0,
  VertShift: 0,
  Speed: 2
}

// Obj to store color of wave
const waveStroke = {
  Color: '#ff0000'
}

window.onload = function () {
  init()
  const gui = new dat.GUI()
  gui.add(wave, 'Amplitude', 10, 300)
  gui.add(wave, 'Frequency', 0.1, 20)
  gui.add(wave, 'PhaseShift', -10, 10)
  gui.add(wave, 'VertShift', -200, 200)
  gui.add(wave, 'Speed', 0, 30)
  gui.addColor(waveStroke, 'Color')

  const helpButton = document.getElementById('helpButton')
  helpButton.onclick = showHelp

  const closeButton = document.getElementById('closeButton')
  closeButton.onclick = hideHelp
}

// initialize canvas
function init () {
  window.requestAnimationFrame(draw)
}

// draw sine wave
// @param ctx context of canvas
// @param shift horizontal shift based on motion
function drawWave (ctx, shift) {
  const canvas = document.getElementById('canvas')
  const width = canvas.width
  const height = canvas.height
  ctx.beginPath()
  ctx.strokeStyle = waveStroke.Color
  ctx.lineWidth = 3

  let x = 0
  let y

  while (x < width) {
    const radians = convertToRadians(x + shift)
    y = getY(wave.Amplitude, radians, wave.Frequency, wave.PhaseShift, wave.VertShift) + (height / 2)
    ctx.lineTo(x, y)
    x++
  }

  ctx.stroke()
}

// refresh and redraw canvas window for each frame
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
  shift = checkShift(shift, wave.Frequency)
  window.requestAnimationFrame(draw)
}

// Draw x and y axis in canvas
function drawAxis (ctx, width, height) {
  const midPoints = getMidPoints(document.getElementById('canvas'))
  const midX = midPoints.midX
  const midY = midPoints.midY
  ctx.beginPath()
  ctx.moveTo(midX, 0)
  ctx.lineTo(midX, height)
  ctx.moveTo(0, midY)
  ctx.lineTo(width, midY)

  ctx.lineWidth = 3
  ctx.stroke()
  ctx.moveTo(0, midY)
}

// hide help menu
function hideHelp () {
  const menu = document.getElementById('helpMenu')
  menu.style.visibility = 'hidden'
}

// show help menu
function showHelp () {
  const menu = document.getElementById('helpMenu')
  menu.style.visibility = 'visible'
  menu.style.position = 'absolute'
}
