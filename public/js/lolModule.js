const lol = function () {
  document.getElementById('canvas').innerHTML = ''
  const video = document.createElement('VIDEO')
  video.setAttribute('src', 'media/video.mp4')
  video.setAttribute('width', '800')
  video.setAttribute('height', '700')
  document.getElementById('canvas').appendChild(video)
  video.play()
}

export { lol }
