/*
 * Client-side JS for CS 4241 Assignment 4
 * by Terry Hearst
 */

const THREE = require('three')
const GameOfLifeModule = require('./gameoflife.js')
const MyDatModule = require('./mydat.js')

const golBoard = new GameOfLifeModule()

// ########################
// ## SETUP GAME OF LIFE ##
// ########################

const gridSize = 20

function showHelp () {
  const popups = document.getElementsByClassName('popup-text')
  for (let i = 0; i < popups.length; i++) {
    popups[i].classList.toggle('show')
  }
}

const GameOfLifeClass = function () {
  this.running = false
  this.speed = 3
  this.rotSpeed = 0.6
  this.editMode = false
  this.showHelp = showHelp
  this.singleStep = function () {
    golBoard.runIteration()
    this.changed = true
  }

  golBoard.setupBoard(gridSize)
  this.changed = true
}

const gameOfLife = new GameOfLifeClass()

// ###################
// ## SETUP DAT.GUI ##
// ###################

window.onload = function () {
  MyDatModule.init(gameOfLife, golBoard)

  // Show the help screen at the start
  showHelp()
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
const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)

camera.position.z = 11

// Create different geometries (and make them all the correct size)
const geos =
[
  /* Blank  */ new THREE.Geometry(),
  /* Sphere */ new THREE.SphereGeometry(1.3 / (gridSize / 2), 8, 6),
  /* Torus  */ new THREE.TorusGeometry(1.3 / (gridSize / 2), 0.5 / (gridSize / 2), 8, 16),
  /* Knot 1 */ new THREE.TorusKnotGeometry(1.3 / (gridSize / 2), 0.5 / (gridSize / 2), 64, 8, 2, 3),
  /* Knot 2 */ new THREE.TorusKnotGeometry(1.5 / (gridSize / 2), 0.45 / (gridSize / 2), 64, 8, 3, 4)
]

// Create different materials
const mats =
[
  new THREE.MeshStandardMaterial({ color: 0xFF0000 }),
  new THREE.MeshStandardMaterial({ color: 0xFFFF00 }),
  new THREE.MeshStandardMaterial({ color: 0x30FF30 }),
  new THREE.MeshNormalMaterial(/* { color: 0x4040FF } */)
]

// HELPER - Maps a value from one range to another
function map (x, low1, high1, low2, high2) {
  const r1 = high1 - low1
  const r2 = high2 - low2
  return ((x - low1) * (r2 / r1)) + low2
}

// HELPER - Calculate x, y position of cell based on i, j index
function calcCellPosition (i, j) {
  return {
    x: map(i, 0, gridSize - 1, 5 * (-(gridSize - 1) / gridSize), 5 * ((gridSize - 1) / gridSize)),
    y: -map(j, 0, gridSize - 1, 5 * (-(gridSize - 1) / gridSize), 5 * ((gridSize - 1) / gridSize))
  }
}

// Create a mesh for each cell
const meshes = []
for (let j = 0; j < gridSize; j++) {
  meshes[j] = []
  for (let i = 0; i < gridSize; i++) {
    const rand1 = Math.floor(Math.random() * 5)

    const mesh = new THREE.Mesh(geos[rand1], mats[rand1 >= 0 ? rand1 - 1 : 0])

    // Position all meshes in the center of that mesh's square
    const cellPosition = calcCellPosition(i, j)
    mesh.position.x = cellPosition.x
    mesh.position.y = cellPosition.y

    const rotationOffset = Math.random() * Math.PI * 2
    mesh.rotation.x = rotationOffset
    mesh.rotation.y = rotationOffset

    scene.add(mesh)

    meshes[j][i] = mesh
  }
}

// TEST - make mesh for the corners of the board
/*
const meshCornerTopLeft = new THREE.Mesh(geos[2], mats[3])
const meshCornerBottomRight = new THREE.Mesh(geos[3], mats[3])

meshCornerTopLeft.position.x = -5
meshCornerTopLeft.position.y = 5
meshCornerBottomRight.position.x = 5
meshCornerBottomRight.position.y = -5

scene.add(meshCornerTopLeft)
scene.add(meshCornerBottomRight)
*/

// Define lighting
const ambLight = new THREE.AmbientLight(0x303030)
scene.add(ambLight)

const dirLight = new THREE.DirectionalLight(0xFFFFFF)
const lightTarget = new THREE.Object3D()
lightTarget.position.x = -5
lightTarget.position.z = -5
lightTarget.position.y = -5
scene.add(lightTarget)
scene.add(dirLight)
dirLight.target = lightTarget

// Make grid
const gridColor = 0x808080
const gridHelper = new THREE.GridHelper(10, gridSize, gridColor, gridColor)
gridHelper.rotation.x = Math.PI / 2
scene.add(gridHelper)

// Make mesh for the object that will assist you in edit mode
const s = 3 / (gridSize / 2)
const editGeo = new THREE.CubeGeometry(s, s, s)
const editMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.3 })

const editMesh = new THREE.Mesh(editGeo, editMat)
scene.add(editMesh)

// ############################
// ## HANDLE MOUSE MOVEMENTS ##
// ############################

// Get screen coords for the board
// Taken from https://stackoverflow.com/questions/27409074/converting-3d-position-to-2d-screen-position-r69
/*
 * NOTE:
 * I originally was trying to use the above solution which *apparently* you're supposed to be able to give it an object
 * or position (there were variations) that would return the screen space coords. I tried all of them. All of them gave
 * me positions of +/- infinity for both x and y. So I use this janky method that WILL WORK assuming that you don't
 * change the camera's position. Whatever.
 */
const boardBoundaries = { x1: 0, y1: 0, x2: 0, y2: 0 }
function calculateBoardCornerScreenCoordinates () {
  // uhh yeah, I just measured these...
  // they work in all resolutions I promise... at least they're close enough

  const top = map(140, 0, 1287, 0, canvas.clientHeight)
  const distFromCenter = (canvas.clientHeight / 2) - top

  boardBoundaries.x1 = Math.round((canvas.clientWidth / 2) - distFromCenter)
  boardBoundaries.y1 = Math.round((canvas.clientHeight / 2) - distFromCenter)

  boardBoundaries.x2 = Math.round((canvas.clientWidth / 2) + distFromCenter)
  boardBoundaries.y2 = Math.round((canvas.clientHeight / 2) + distFromCenter)

  console.log('New board screen coordinates:')
  console.log('x1: ', boardBoundaries.x1)
  console.log('y1: ', boardBoundaries.y1)
  console.log('x2: ', boardBoundaries.x2)
  console.log('y2: ', boardBoundaries.y2)
}

calculateBoardCornerScreenCoordinates()

window.onmousemove = function (event) {
  if (gameOfLife.editMode) {
    const i = Math.floor(map(event.x, boardBoundaries.x1, boardBoundaries.x2, 0, gridSize))
    const j = Math.floor(map(event.y, boardBoundaries.y1, boardBoundaries.y2, 0, gridSize))

    // console.log(i, j)

    if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
      const cellPosition = calcCellPosition(i, j)
      editMat.opacity = 0.3

      editMesh.position.x = cellPosition.x
      editMesh.position.y = cellPosition.y
    } else {
      editMat.opacity = 0
    }
  } else {
    editMat.opacity = 0
  }
}

window.onmousedown = function (event) {
  if (gameOfLife.editMode) {
    const i = Math.floor(map(event.x, boardBoundaries.x1, boardBoundaries.x2, 0, gridSize))
    const j = Math.floor(map(event.y, boardBoundaries.y1, boardBoundaries.y2, 0, gridSize))

    if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
      console.log('Clicked at ', i, j)
      golBoard.toggleCell(i, j)
      gameOfLife.changed = true
    }
  }
}

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

    calculateBoardCornerScreenCoordinates()
  }
}

// Update the geometry every frame
// dt - time in seconds since last frame
let elapsed = 0

function update (dt) {
  resize()

  if (gameOfLife.running) {
    elapsed += dt
    // console.log(elapsed)
  }

  if (elapsed >= (1 / gameOfLife.speed)) {
    gameOfLife.changed = true
    elapsed -= (1 / gameOfLife.speed)
    golBoard.runIteration()
  }

  // Set each mesh's properties
  if (gameOfLife.changed) {
    gameOfLife.changed = false
    for (let j = 0; j < gridSize; j++) {
      for (let i = 0; i < gridSize; i++) {
        const mesh = meshes[j][i]
        const cell = golBoard.getCell(i, j)
        if (cell.alive) {
          if (cell.count < 5) {
            mesh.geometry = geos[1]
            mesh.material = mats[0]
          } else if (cell.count < 8) {
            mesh.geometry = geos[2]
            mesh.material = mats[1]
          } else if (cell.count < 11) {
            mesh.geometry = geos[3]
            mesh.material = mats[2]
          } else /* if (cell.count < 16) */ {
            mesh.geometry = geos[4]
            mesh.material = mats[3]
          }
        } else {
          mesh.geometry = geos[0]
        }
      }
    }
  }

  // Rotate all meshes
  for (let j = 0; j < gridSize; j++) {
    for (let i = 0; i < gridSize; i++) {
      const mesh = meshes[j][i]
      mesh.rotation.x += (gameOfLife.rotSpeed * dt)
      mesh.rotation.y += (gameOfLife.rotSpeed * dt)
    }
  }
}

// Get the timestamp from the previous frame to ensure consistent times even with different framerates
// CODE TAKEN FROM:
// https://codeincomplete.com/posts/javascript-game-foundations-the-game-loop/
function timestamp () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime()
}
let now, dt
let last = timestamp()

// MAIN render function. This is what should requestAnimationFrame
function render () {
  now = timestamp()
  dt = (now - last) / 1000 // to get time in seconds
  if (dt > 1 / 20) dt = (1 / 20) // will slow down time if framerate dips below 20fps
  last = now

  update(dt)
  renderer.render(scene, camera)
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)
