import { datGUI, guiControls } from './modules/dat.js'
import { scene, camera, renderer, controls, spotLight } from './modules/scene.js'
import { cubeGeometry, cylinderGeometry, coneGeometry } from './modules/geometry.js'
import { greet, changeMusicWarn, changeMusicSuccess, changeMusicCancel } from './modules/swal.js'

let energyMusic = document.getElementById('energy')
let coolMusic = document.getElementById('cool')
let swagMusic = document.getElementById('swag')
let ctx, audio, audioSrc, analyser, frequencyData
const stats = new Stats()
let fov, zoom, inc
let cube

// Initialize
greet().then(() => {
    ctx = new AudioContext()
    audio = energyMusic
    setAudio(energyMusic)

    init()
    animate()
})

// ================================================================================

// Control Panel
document.getElementById('play').onclick = function() { audio.play() }
document.getElementById('pause').onclick = function() { audio.pause() }
document.getElementById('stop').onclick = function() {
    audio.pause()
    audio.currentTime = 0
}
document.getElementById('question').onclick = function() { greet() }

const setAudio = function(music) {
    if (audioSrc) audioSrc.disconnect
    audio = music
    audioSrc = ctx.createMediaElementSource(audio)
    analyser = ctx.createAnalyser()
    frequencyData = new Uint8Array(analyser.frequencyBinCount)
    audioSrc.connect(analyser)
    audioSrc.connect(ctx.destination)
}
const changeAudio = function(music) {
    changeMusicWarn().then((value) => {
        if (value) {
            changeMusicSuccess()
            setAudio(music)
        } else changeMusicCancel()
    })
}

document.getElementById('setEnergy').onclick = function() {
    changeAudio(energyMusic)
}
document.getElementById('setCool').onclick = function() {
    changeAudio(coolMusic)
}
document.getElementById('setSwag').onclick = function() {
    changeAudio(swagMusic)
}

// ================================================================================

// Animation
const init = function() {
    renderer.setClearColor(0x000000)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMapSoft = true

    controls.addEventListener('change', render)

    let x = 0
    let y = 0
    let z = 0
    for (let i = 0; i < 1000; i++) {
        let material = new THREE.MeshPhongMaterial({ color: frequencyData[i] * 0x00ff00 })
        cube = new THREE.Mesh(cubeGeometry, material)
        cube.castShadow = true
        cube.receiveShadow = true
        cube.name = frequencyData.length
        cube.position.x = x
        x += 10
        if (x == 100) {
            z += 10
            x = 0
        } else if (z == 100) {
            x = 0
            y += 10
            z = 0
        }
        cube.position.y = y
        cube.position.z = z
        scene.add(cube)
    }

    guiControls.target = cube

    camera.position.x = guiControls.positionX
    camera.position.y = guiControls.positionY
    camera.position.z = guiControls.positionZ
    camera.near = guiControls.cameraNear
    camera.far = guiControls.cameraFar
    camera.fov = guiControls.cameraFov
    camera.lookAt(scene.position)

    spotLight.castShadow = true
    spotLight.intensity = guiControls.intensity
    spotLight.distance = guiControls.distance
    spotLight.angle = guiControls.angle
    spotLight.shadow.camera.visible = true
    scene.add(spotLight)

    datGUI.add(guiControls, 'positionX', 10, 100).onChange(function(value) { camera.position.x = value })
    datGUI.add(guiControls, 'positionY', 10, 100).onChange(function(value) { camera.position.y = value })
    datGUI.add(guiControls, 'positionZ', 10, 100).onChange(function(value) { camera.position.z = value })

    datGUI.add(guiControls, 'cameraNear', 0, 100).onChange(function(value) { camera.near = value })
    datGUI.add(guiControls, 'cameraFar', 400, 1000).onChange(function(value) { camera.far = value })
    datGUI.add(guiControls, 'cameraFov', 0, 100).onChange(function(value) { camera.fov = value })

    datGUI.add(guiControls, 'intensity', 0.01, 20).onChange(function(value) { spotLight.intensity = value })
    datGUI.add(guiControls, 'distance', 150, 1000).onChange(function(value) { spotLight.distance = value })
    datGUI.add(guiControls, 'angle', 0.001, 2).onChange(function(value) { spotLight.angle = value })

    datGUI.close()

    $('#webGL-container').append(renderer.domElement)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    $('#webGL-container').append(stats.domElement)
}

const render = function() {
    fov = camera.fov
    zoom = 1.0
    inc = -0.01

    scene.traverse(function(e) {
        if (e instanceof THREE.Mesh) {
            e.rotation.x += frequencyData[50] / 1000
            e.rotation.y = frequencyData[e.id] / 50
            e.rotation.z += 0.0

            let r = Math.random()
            if (r < 0.95) e.material.color.setRGB(0, 0, frequencyData[e.id] / 200)
            else if (r > 0.95 && r < 0.988) e.material.color.setRGB(frequencyData[e.id] / 155, 0, frequencyData[e.id] / 100)
            else if (r > 0.988) e.material.color.setRGB(0, frequencyData[e.id] / 255, frequencyData[e.id] / 255)
        }
    })

    guiControls.intensity = frequencyData[2]

    spotLight.position.x = 127
    spotLight.position.y = 152
    spotLight.position.z = 127
    analyser.getByteFrequencyData(frequencyData)
    camera.fov = fov * zoom
    camera.updateProjectionMatrix()
    zoom += inc
    if (zoom <= 0.1 * (frequencyData[20] / 100) || zoom >= 1 * (frequencyData[20] / 50)) inc = -inc
    camera.rotation.y = 90 * Math.PI / 180
    camera.rotation.z = frequencyData[20] * Math.PI / 210
    camera.rotation.x = frequencyData[100] * Math.PI / 180
}

const animate = function() {
    requestAnimationFrame(animate)
    render()
    stats.update()
    renderer.render(scene, camera)
}

// ================================================================================