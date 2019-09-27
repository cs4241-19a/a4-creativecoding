/*
 * Client-side JS for CS 4241 Assignment 4
 * by Terry Hearst
 */

const THREE = require('three')
const dat = require('dat.gui')

// ########################
// ## SETUP GAME OF LIFE ##
// ########################

const GameOfLifeClass = function () {
  this.running = false
  this.speed = 3
  this.edit = function () {
    window.alert('Button pressed')
  }
  this.showHelp = function () {
    window.alert('Show help')
  }
}

const gameOfLife = new GameOfLifeClass()

// ###################
// ## SETUP DAT.GUI ##
// ###################

window.onload = function () {
  const gui = new dat.GUI()

  gui.add(gameOfLife, 'running').name('Running')
  gui.add(gameOfLife, 'speed', 1, 20).name('Iterations/sec').step(1)
  gui.add(gameOfLife, 'edit').name('Edit board contents')
  gui.add(gameOfLife, 'showHelp').name('Show help')
}

// ###########################
// ## SETUP THREE.JS CANVAS ##
// ###########################

const viewportElement = document.getElementById('viewport')

const renderer = new THREE.WebGLRenderer()
const canvas = renderer.domElement

viewportElement.appendChild(canvas)

const w = canvas.clientWidth
const h = canvas.clientHeight

console.log('CANVAS SIZE: ', w, h)

renderer.setSize(w, h)

// ###########################
// ## SETUP ACTUAL 3D SCENE ##
// ###########################

// Setup Scene and Camera objs
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)

camera.position.z = 8

// Create knot
const geo1 = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3)
const mat1 = new THREE.MeshStandardMaterial({ color: 0x0000FF })
const mesh1 = new THREE.Mesh(geo1, mat1)

scene.add(mesh1)

// Define lighting
const ambLight = new THREE.AmbientLight(0x404040)
const dirLight = new THREE.DirectionalLight(0xFFFFFF)

scene.add(ambLight)
scene.add(dirLight)

// Grid
var gridHelper = new THREE.GridHelper(10, 20)
gridHelper.rotation.x = Math.PI / 2
scene.add(gridHelper)

// ##############################
// ## MAIN RENDERING FUNCTIONS ##
// ##############################

// Checks to see if the canvas was resized and handles that properly
function resize () {
  const width = viewportElement.clientWidth
  const height = viewportElement.clientHeight
  if (canvas.width !== width || canvas.height !== height) {
    // console.log("Canvas resized from ", canvas.width, canvas.height, " to ", width, height)
    canvas.clientWidth = width
    canvas.clientHeight = height
    canvas.width = width
    canvas.height = height

    camera.aspect = (width / height)
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
}

// Update the geometry every frame
function update () {
  resize()

  mesh1.rotation.x += 0.01
  mesh1.rotation.y += 0.01
}

// MAIN render function. This is what should requestAnimationFrame
function render () {
  update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
