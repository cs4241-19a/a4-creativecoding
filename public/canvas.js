function initCanvas () {
  const canvas = document.getElementById('webgl')
  gl = WebGLUtils.setupWebGL(canvas, undefined)

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }

  const textCanvas = document.getElementById('text')
  const textCanvas2 = document.getElementById('text2')
  ctx = textCanvas.getContext('2d')
  ctx2 = textCanvas2.getContext('2d')

  ctx.textAlign = 'left'
  ctx2.textAlign = 'left'
  ctx.font = '16px Open Sans'
  ctx2.font = '16px Open Sans'

  gl.viewport(0, 0, canvas.width, canvas.height)
}
