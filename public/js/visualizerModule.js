let visColor = function(canvas, jsonAudioInit, jsonAudioGraph, results, color, x, h, w) {

    for (let i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
        const barHeight = results[i] * h

        jsonAudioGraph.analyser.fftSize = 64 * Math.pow(2,8 - (Math.round(w) + 1))

        var r = barHeight + (25 * (i / jsonAudioGraph.analyser.frequencyBinCount))
        var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount)
        var b = 50

        switch(color) {
            case 0:
                jsonAudioInit.ctx.fillStyle = 'rgb(' + b + ',' + g + ',' + r + ')'
                break;
            case 1:
                jsonAudioInit.ctx.fillStyle = 'rgb(' + g + ',' + r + ',' + b + ')'
                break;
            case 2:
                jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + r + ')'
                break;
            case 3:
                jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
                break;
            case 5:
                jsonAudioInit.ctx.fillStyle = 'rgb(' + g + ',' + b + ',' + r + ')'
                break;
            case 6:
                jsonAudioInit.ctx.fillStyle = 'rgb(' + b + ',' + r + ',' + g + ')'
                break;
        }
        jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5, barHeight)

        x += (canvas.width / jsonAudioGraph.analyser.frequencyBinCount) * 2.5 + 1
    }
}

let visualizer = function (canvas, jsonAudioInit, jsonAudioGraph, results, color, h, w) {
    let x = 0
    jsonAudioGraph.analyser.getByteFrequencyData(results)
    jsonAudioInit.ctx.fillStyle = 'black'
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height)
    visColor(canvas, jsonAudioInit, jsonAudioGraph, results, color, x, h, w)
}

export { visualizer }