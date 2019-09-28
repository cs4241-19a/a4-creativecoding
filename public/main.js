
import { scene, camera, renderer } from './scene.js'
import { controls, gui } from './gui.js'

var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext

var audioContext = new AudioContext()
var dropbox, musicFile

gui.add(controls, 'scale', 0.5, 3)
gui.add(controls, 'color', { Red: 1, Green: 2, Blue: 3 })

dropbox = document.getElementById('dropbox')
dropbox.addEventListener('dragenter', dragenter, false)
dropbox.addEventListener('dragover', dragover, false)
dropbox.addEventListener('dragleave', dragleave, false)
dropbox.addEventListener('drop', drop, false)

musicFile = document.getElementById('musicFile')
musicFile.addEventListener('change', readFile, false)


function readFile () {
  handleFiles($('#musicFile')[0].files[0])
}

function dragenter (e) {
  e.stopPropagation()
  e.preventDefault()
  dropbox.style.background = '#f0f0f0'
}

function dragover (e) {
  e.stopPropagation()
  e.preventDefault()
}

function dragleave (e) {
  e.stopPropagation()
  e.preventDefault()
  dropbox.style.background = '#c0c0c0'
}

function drop (e) {
  e.stopPropagation()
  e.preventDefault()
  dropbox.style.background = '#000000'

  handleFiles(e.dataTransfer.files[0])
}



function handleFiles (f) {
  var file = f//
    var fileName = file.name;

    $("#songName").text("Sone Name: " + fileName); // display name
  var fileReader = new FileReader()
  fileReader.readAsArrayBuffer(file)// read music file
  fileReader.onload = function (e) {

    var count = 0

    var timer = setInterval(function () {
      count++
    }, 1000)


    audioContext.decodeAudioData(e.target.result, function (buffer) {
      clearInterval(timer)

      // play music
      const audioBufferSourceNode = audioContext.createBufferSource()

      const analyser = audioContext.createAnalyser()
        analyser.fftSize = 256

      audioBufferSourceNode.connect(analyser)
      analyser.connect(audioContext.destination)
      console.log(audioContext.destination)
      // 播放音频
      audioBufferSourceNode.buffer = buffer
      audioBufferSourceNode.start()

      var dataArray = new Uint8Array(analyser.frequencyBinCount)
      console.log(dataArray)
      // alert(bufferLength);
      const step = Math.round(dataArray.length / appdata.length)
      function render () {
        requestAnimationFrame(render)
        analyser.getByteFrequencyData(dataArray)

        for (let j = 0; j < appdata.length; j++) {
          var value = dataArray[j * step] * controls.scale / 5
          if (value < 1) { value = 1 }
          if (controls.color == 1) {
              const r = 255 - j * 6
              const g = 0
              const b = 0
            const rgb = '#' + rgbToHex(r) + rgbToHex(g) + rgbToHex(b)
            appdata[j].material.color.set(rgb)
          } else if (controls.color == 2) {
              const g = 255 - j * 6
              const r = 0
              const b = 0
            const rgb = '#' + rgbToHex(r) + rgbToHex(g) + rgbToHex(b)
            appdata[j].material.color.set(rgb)
          } else {
              const b = 255 - j * 6
              const g = 0
              const r = 0
            const rgb = '#' + rgbToHex(r) + rgbToHex(g) + rgbToHex(b)
            appdata[j].material.color.set(rgb)
          }

          appdata[j].scale.y = value
        }
        renderer.render(scene, camera)
      }

      render()
    })
  }
  alert('Uploaded  (＾▽＾) ') //success uploaded
}

var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16)
  if (hex.length < 2) {
    hex = '0' + hex
  }
  return hex
}

const appdata = []

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
//initialize cubes
function add (number) {
  for (let i = 0; i < number; i++) {
    const r = 256 - i * 6
    const g = 0
    const b = 0
    const rgb = '#' + r.toString(16) + g.toString(16) + b.toString(16)
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const material = new THREE.MeshBasicMaterial({ color: rgb })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(i - number / 2, 0, 0)
    scene.add(cube)
    appdata.push(cube)
  }
}
add(40)
camera.position.z = 50
