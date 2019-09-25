function applySettings () {
  document.getElementById('easy').addEventListener('click', function (evt) {
    difficulty = 1
    document.getElementById('levelBadge').innerText = 'Easy'
  })

  document.getElementById('medium').addEventListener('click', function (evt) {
    difficulty = 2
    document.getElementById('levelBadge').innerText = 'Hard'
  })

  document.getElementById('hard').addEventListener('click', function (evt) {
    difficulty = 4
    document.getElementById('levelBadge').innerText = 'Challenge'
  })

  document.getElementById('musicToggle').addEventListener('click', function (evt) {
    music = !music
    if (music) {
      backgroundMusic.play()
      backgroundMusic.currentTime = 0
    } else {
      backgroundMusic.pause()
    }
  })
}
