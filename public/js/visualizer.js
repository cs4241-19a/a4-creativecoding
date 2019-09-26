import { getCanvas, audioInit, audioGraph } from './setUpModule.js'

const startMello = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/mello.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
      var b = 50

      jsonAudioInit.ctx.fillStyle = 'rgb(' + b + ',' + g + ',' + r + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

const startAC = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/acdc.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
      var b = 50

      jsonAudioInit.ctx.fillStyle = 'rgb(' + g + ',' + r + ',' + b + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

const startElectro = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/shelter.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)

      jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + r + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

const startRamm = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/deutschland.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
      var b = 50

      jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

const startInst = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/inst.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
      var b = 50

      jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + b + ',' + g + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

const startBeat = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/exploder.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
      var b = 50

      jsonAudioInit.ctx.fillStyle = 'rgb(' + g + ',' + b + ',' + r + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

const startDub = function () {
  const canvas = getCanvas()

  const jsonAudioInit = audioInit(canvas)
  const jsonAudioGraph = audioGraph(canvas, jsonAudioInit)

  jsonAudioInit.audioElement.src = '../media/dubstep.mp3'
  jsonAudioInit.audioElement.play()

  const results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount)

  const draw = function () {
    window.requestAnimationFrame(draw)
    jsonAudioGraph.analyser.getByteFrequencyData(results)

    let x = 0

    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      const barHeight = results[i] * 2 + 60

      var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
      var b = 50

      jsonAudioInit.ctx.fillStyle = 'rgb(' + b + ',' + r + ',' + g + ')'
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

      x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
  }
  draw()
}

window.onload = function () {
  document.getElementById('mello').onclick = startMello
  document.getElementById('rammstein').onclick = startRamm
  document.getElementById('electro').onclick = startElectro
  document.getElementById('instru').onclick = startInst
  document.getElementById('beats').onclick = startBeat
  document.getElementById('dubstep').onclick = startDub
  document.getElementById('acdc').onclick = startAC
}
