let audioInit = function (canvas) {

    const ctx = canvas.getContext('2d')
    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement('audio')
    document.getElementById('canvas').appendChild(audioElement)

    return {ctx: ctx, audioCtx: audioCtx, audioElement: audioElement}
}

let audioGraph = function (canvas, json) {

    const analyser = json.audioCtx.createAnalyser()
    analyser.fftSize = 2048
    const player = json.audioCtx.createMediaElementSource(json.audioElement)
    player.connect(json.audioCtx.destination)
    player.connect(analyser)

    return {analyser: analyser, player: player}
}

export { audioInit, audioGraph }

