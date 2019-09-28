import audioData from './audio.js'
import visualizer from './visualizer.js'

let isPlaying = false
let firstUse = true

const state = {
  bgColor: '#000000',
  barGradTop: '#ff0000',
  barGradBottom: '#00ff00',
  barMaxLength: 150,
  baseColor: '#1e1e1e'
}

window.onload = function () {
  const datGUI = new dat.GUI()

  const playObj = {
    playPause: function () {
      // Initialize the audio module AFTER user interaction
      // Thanks Chrome for making my life so much harder
      if (firstUse) {
        audioData.init('./data/test.mp3')

        firstUse = false
      }

      if (isPlaying) {
        audioData.pauseAudio()
        isPlaying = false
      } else {
        audioData.startAudio()
        isPlaying = true
      }
    },
    displayInstructionsPopup: function () {
      const windowObj = {
        type: 'info',
        title: 'Instructions',
        html: '<p>This webpage creates a basic audio visualization using different parameters which can be modified using the menu on the side. Here are the aspects in which you can control the visualization:<p>' +
              '<p><strong>Play/Pause</strong>: Starts and stops the music</p>' +
              '<p><strong>Background</strong>: Changes the color of the background</p>' +
              '<p><strong>Bar Color 1</strong>: Changes the inner color of the bar gradient</p>' +
              '<p><strong>Bar Color 2</strong>: Changes the outer color of the bar gradient</p>' +
              '<p><strong>Max Length</strong>: Changes the maximum length of the bar</p>' +
              '<p><strong>Base Color</strong>: Changes the color of the octagonal base</p>' +
              '<p><strong>Help</strong>: Redisplays this menu</p>' +
              '<p><strong>Project created by James Plante</strong><p>' +
              '<p>Song: Teamwork by Scott Holmes (unmodified). Licenced under the <a href="https://creativecommons.org/licenses/by-nc/4.0/legalcode">CC Attribution-NonCommercial 4.0 International License.</a>'
      }
      Swal.fire(windowObj)
    }
  }

  datGUI.add(playObj, 'playPause').name('Play/Pause')
  datGUI.addColor(state, 'bgColor').name('Background')
  datGUI.addColor(state, 'barGradTop').name('Bar Color 1')
  datGUI.addColor(state, 'barGradBottom').name('Bar Color 2')
  datGUI.add(state, 'barMaxLength').step(10).min(0).max(300).name('Max Length')
  datGUI.addColor(state, 'baseColor').name('Base Color')
  datGUI.add(playObj, 'displayInstructionsPopup').name('Help')

  visualizer.init()

  // Set up the render loop
  const renderFrame = function () {
    // If AudioContext not created, then only render background and base
    if (firstUse) {
      visualizer.rendNotBars(state)
    } else {
      visualizer.render(audioData.getResults(), state)
    }
    window.requestAnimationFrame(renderFrame)
  }
  renderFrame()
  playObj.displayInstructionsPopup()
}
