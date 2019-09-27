const words = ['annoy', 'attention', 'calm', 'comfortable', 'consequences', 'curious',
  'curve', 'decide', 'directions', 'discover', 'disappointed', 'embarrassed', 'enormous',
  'exhausted', 'explore', 'fair', 'fascinating', 'feast', 'focus', 'frustrated', 'gigantic',
  'grumpy', 'huge', 'ignore', 'instead', 'investigate', 'invite', 'important', 'jealous',
  'leader', 'list', 'listen', 'lovely', 'measuring', 'miserable', 'mumble', 'negative',
  'nervous', 'nibbled', 'note', 'notice', 'observing', 'opposite', 'ordinary', 'positive',
  'precious', 'prefer', 'problem', 'protect', 'proud', 'question', 'reminds', 'repeat',
  'report', 'rhyme', 'respect', 'searching', 'special', 'spotless', 'squirm', 'stomped',
  'suddenly', 'suggestion', 'surprise', 'uncomfortable', 'warning', 'wonder', 'worried']

const hardWords = ['annoy', 'attention', 'calm', 'curious',
  'curve', 'decide', 'directions', 'discover', 'enormous',
  'exhausted', 'explore', 'fair', 'fascinating', 'feast', 'focus', 'frustrated', 'gigantic',
  'grumpy', 'huge', 'ignore', 'instead', 'invite', 'important', 'jealous',
  'leader', 'list', 'listen', 'lovely', 'measuring', 'miserable', 'mumble', 'negative',
  'nervous', 'nibbled', 'note', 'notice', 'observing', 'opposite', 'ordinary', 'positive',
  'precious', 'prefer', 'problem', 'protect', 'proud', 'question', 'reminds', 'repeat',
  'report', 'rhyme', 'respect', 'searching', 'special', 'spotless', 'squirm', 'stomped',
  'suddenly', 'suggestion', 'surprise', 'warning', 'wonder', 'worried']

let gl
let ctx
let ctx2
let theta = 0
let alpha = 0
let xPosition = 10
let hardXPosition = 30

let startGame = false
let sounds = false
let music = false
let mode = 'regular'
let difficulty = 1 // EASY = 1, HARD = 2, CHALLENGE = 4

let word = words[Math.floor(Math.random() * words.length)]
let hardWord = hardWords[Math.floor(Math.random() * hardWords.length)]

let lives = 3
let score = 0

const correctSound = new Audio('audio/correct.m4a')
const incorrectSound = new Audio('audio/incorrect.m4a')
const backgroundMusic = new Audio('audio/background.m4a')

function main () {
  var typed = new Typed('.title', {
    strings: ['tip, tap, type'],
    typeSpeed: 50
  })

  initCanvas()
  applySettings()
  render()

  document.getElementById('startGame').addEventListener('click', function (evt) {
    startGame = !startGame
    if (startGame) {
      resetGame()
      document.getElementById('inputText').focus();
      document.getElementById('startGame').innerText = 'Stop'
    } else {
      document.getElementById('startGame').innerText = 'Play'
    }
  })

  document.getElementById('inputText').addEventListener('input', function (evt) {
    if (this.value === word) {
      if (sounds) {
        correctSound.play()
        correctSound.currentTime = 0
      }
      score += 1
      document.getElementById('score').innerText = score
      resetWord()
    }
    if (difficulty === 4) {
      if (this.value === hardWord) {
        if (sounds) {
          correctSound.play()
          correctSound.currentTime = 0
        }
        score += 1
        document.getElementById('score').innerText = score
        resetHardWord()
      }
    }
  })

  document.getElementById('soundToggle').addEventListener('click', function (evt) {
    sounds = !sounds
  })

  document.getElementById('unlimitedMode').addEventListener('click', function (evt) {
    mode = 'unlimited'
    document.getElementById('modeBadge').innerText = 'Unlimited'
    resetGame()
  })

  document.getElementById('regularMode').addEventListener('click', function (evt) {
    mode = 'regular'
    document.getElementById('modeBadge').innerText = 'Regular'
    resetGame()
  })

  function removeALife () {
    lives -= 1
    let newLives = ''
    for (let i = 0; i < lives; i++) {
      newLives += ('<i class="fa fa-heart" aria-hidden="true"></i> &nbsp;\n')
    }
    document.getElementById('livesContainer').innerHTML = newLives
    if (lives === 0) {
      // game over
      startGame = false
      document.getElementById('startGame').innerText = 'Game Over! Restart'
    }
  }

  function resetGame () {
    resetScore()
    resetWord()
    resetHardWord()
    resetLives()
  }

  function resetLives () {
    lives = 3
    const newLives = '<i class="fa fa-heart" aria-hidden="true"></i> &nbsp;\n' +
      '<i class="fa fa-heart" aria-hidden="true"></i> &nbsp;\n' +
      '<i class="fa fa-heart" aria-hidden="true"></i>'
    document.getElementById('livesContainer').innerHTML = newLives
  }

  function resetScore () {
    score = 0
    document.getElementById('score').innerText = score
  }

  function resetWord () {
    theta = 0
    word = words[Math.floor(Math.random() * words.length)]
    xPosition = Math.floor(Math.random() * 5) + 1
    document.getElementById('inputText').value = ''
  }

  function resetHardWord () {
    alpha = 0
    hardWord = hardWords[Math.floor(Math.random() * hardWords.length)]
    hardXPosition = Math.floor(Math.random() * 5) + 1
    document.getElementById('inputText').value = ''
  }

  function render () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx2.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (startGame) {
      if (difficulty === 4) {
        ctx.fillText(word, xPosition * 20, 15 - theta)

        if (theta < -310) {
          if (sounds) {
            incorrectSound.play()
            incorrectSound.currentTime = 0
          }
          if (mode === 'regular') {
            removeALife()
          }
          resetWord()
        } else {
          theta -= 1
        }

        ctx2.fillText(hardWord, hardXPosition * 20, 15 - alpha)

        if (alpha < -310) {
          if (sounds) {
            incorrectSound.play()
            incorrectSound.currentTime = 0
          }
          if (mode === 'regular') {
            removeALife()
          }
          resetHardWord()
        } else {
          alpha -= 2
        }
      } else {
        ctx.fillText(word, xPosition * 20, 15 - theta)

        if (theta < -310) {
          if (sounds) { incorrectSound.play(); incorrectSound.currentTime = 0 }
          if (mode === 'regular') {
            removeALife()
          }
          resetWord()
        } else {
          theta -= difficulty
        }
      }
      gl.clear(gl.COLOR_BUFFER_BIT)
    }

    requestAnimationFrame(render)
  }
}
