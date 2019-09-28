import * as mod1 from './module1.js'
import * as mod2 from './module2.js'

var startBtn = document.getElementById('startBtn')
var titleTxt = document.getElementById('titleTxt')
var directionsTitleTxt = document.getElementById('directionsTitleTxt')
var directionsTxt = document.getElementById('directionsTxt')

var tutorialBtn = document.getElementById('tutorialBtn')
var closeBtn = document.getElementById('closeBtn')
var replayBtn = document.getElementById('replayBtn')

var livesTxt = document.getElementById('livesTxt')
var scoreTxt = document.getElementById('scoreTxt')

const gameCanvas = document.getElementById('gameCanvas')

window.onload = function () {
  const startBtn = document.querySelector('#startBtn')
  startBtn.onclick = startgame
  const tutorialBtn = document.querySelector('#tutorialBtn')
  tutorialBtn.onclick = showDocumentation
  const closeBtn = document.querySelector('#closeBtn')
  closeBtn.onclick = hideDocumentation
  const replayBtn = document.querySelector('#replayBtn')
  replayBtn.onclick = restartgame
}

const startgame = function (e) {
  e.preventDefault()

  console.log('Starting game')
  titleTxt.style.display = 'none'
  directionsTitleTxt.style.display = 'none'
  directionsTxt.style.display = 'none'
  startBtn.style.display = 'none'
  tutorialBtn.style.display = 'block'
  replayBtn.style.display = 'block'

  livesTxt.style.display = 'block'
  scoreTxt.style.display = 'block'

  gameCanvas.style.display = 'block'
  mod1.start()
  mod1.playBgMusic()
}

const restartgame = function (e) {
  e.preventDefault()

  console.log('Restarting game')
  titleTxt.style.display = 'none'
  directionsTitleTxt.style.display = 'none'
  directionsTxt.style.display = 'none'
  startBtn.style.display = 'none'
  tutorialBtn.style.display = 'block'
  replayBtn.style.display = 'block'

  livesTxt.style.display = 'block'
  scoreTxt.style.display = 'block'

  gameCanvas.style.display = 'block'
  mod1.restart()
  mod1.playBgMusic()
}

const showDocumentation = function (e) {
  e.preventDefault()

  console.log('Showing Documentation')
  titleTxt.style.display = 'block'
  directionsTitleTxt.style.display = 'block'
  directionsTxt.style.display = 'block'
  tutorialBtn.style.display = 'none'
  closeBtn.style.display = 'block'
  replayBtn.style.display = 'none'

  livesTxt.style.display = 'none'
  scoreTxt.style.display = 'none'

  gameCanvas.style.display = 'none'
  // pause game
}

const hideDocumentation = function (e) {
  e.preventDefault()

  console.log('Hiding Documentation')
  titleTxt.style.display = 'none'
  directionsTitleTxt.style.display = 'none'
  directionsTxt.style.display = 'none'
  tutorialBtn.style.display = 'block'
  closeBtn.style.display = 'none'
  replayBtn.style.display = 'block'

  livesTxt.style.display = 'block'
  scoreTxt.style.display = 'block'

  gameCanvas.style.display = 'block'
  // unpause game
}

console.log('main.js')
