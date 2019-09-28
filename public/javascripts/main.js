// based on an example found here: https://codepen.io/programking/pen/MyOQpO
const THREE = require('three')
const dat = require('dat.gui')
const OrbitControls = require('three-orbitcontrols')

// need to declare these variables globally
// creating a scene
var scene, camera, renderer
// gui stuff
var gui

var controller, controls

var name, width, height, length, wireframe, color

window.onload = function () {

  scene = new THREE.Scene()
  gui = new dat.GUI()

  controller = new THREE.Object3D()
  controller.objects = []
  controller.scene = scene
  controller.gui = gui
  controller.color = 0xFFFFFF
  controller.number_of_objects = controller.objects.length
  controller.selected_cube = 'test123'

  scene.background = new THREE.Color(0xf0f0f0)
  scene.add(new THREE.AmbientLight(0x505050))
  var light = new THREE.SpotLight(0xffffff, 1.5)
  light.position.set(0, 500, 2000)
  light.angle = Math.PI / 9
  light.castShadow = true
  light.shadow.camera.near = 1000
  light.shadow.camera.far = 4000
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  scene.add(light)

  createCubes()

  resetGui(controller)

  camera = new THREE.PerspectiveCamera(
    70, window.innerWidth / window.innerHeight,
    0.1, 5000)
  camera.position.z = 1200

  camera.lookAt(scene.position)
  camera.updateMatrixWorld()

  // rendering
  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  // controls
  controls = new OrbitControls(camera, renderer.domElement)

  controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05
  controls.screenSpacePanning = false
  controls.minDistance = 100
  controls.maxDistance = 1200

  document.addEventListener('mousedown', onDocumentMouseDown)
  document.addEventListener('keydown', keyPress)

  render()
}

var createCubes = function () {
  var geometry = new THREE.BoxBufferGeometry(40, 40, 40)
  for (var i = 0; i < 200; i++) {
    var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }))
    object.position.x = Math.random() * 1000 - 500
    object.position.y = Math.random() * 600 - 300
    object.position.z = Math.random() * 800 - 400
    object.rotation.x = Math.random() * 2 * Math.PI
    object.rotation.y = Math.random() * 2 * Math.PI
    object.rotation.z = Math.random() * 2 * Math.PI
    object.scale.x = Math.random() * 2 + 1
    object.scale.y = Math.random() * 2 + 1
    object.scale.z = Math.random() * 2 + 1
    object.castShadow = true
    object.receiveShadow = true
    object.name = 'cube_' + controller.objects.length
    // console.log(object.name)

    controller.scene.add(object)
    controller.objects.push(object)
    controller.number_of_objects = controller.objects.length
    controller.selected_cube = object
  }
}

var keyPress = function (event) {
  console.log(event.which)
  switch (event.which) {
    case 32:
      scene.background = new THREE.Color(Math.random() * 0xffffff)
      break
  }
}

var resetGui = function (theController) {
  var params = {
    color: 0xff00ff
  }

  name = gui.add(theController.selected_cube, 'name').listen()
  width = gui.add(theController.selected_cube.scale, 'x', 0, 5).name('Width').listen()
  height = gui.add(theController.selected_cube.scale, 'y', 0, 5).name('Height').listen()
  length = gui.add(theController.selected_cube.scale, 'z', 0, 5).name('Length').listen()
  wireframe = gui.add(theController.selected_cube.material, 'wireframe').listen()
  color = gui.addColor(params, 'color').onChange(function () { controller.selected_cube.material.color.set(params.color) })
}

// cube animation
var render = function () {
  requestAnimationFrame(render)

  controls.update()

  renderer.render(scene, camera)
}

function onDocumentMouseDown (event) {
  event.preventDefault()
  var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1, 0.5)
  var raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse3D, camera)
  var intersects = raycaster.intersectObjects(controller.objects)
  // console.log("hello")

  if (intersects.length > 0) {
    var selectedObject = intersects[0].object
    controller.selected_cube = selectedObject
    controller.selected_cube.material.color.setHex(0x37e584)

    gui.remove(name)
    gui.remove(length)
    gui.remove(width)
    gui.remove(height)
    gui.remove(wireframe)
    gui.remove(color)

    resetGui(controller, name, width, height, length)
  }
}
