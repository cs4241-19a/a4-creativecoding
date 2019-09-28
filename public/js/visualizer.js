const visualizer = {

  init () {
    this.canvas = document.createElement('canvas')
    document.body.appendChild(this.canvas)

    // Specify canvas height
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    this.context = this.canvas.getContext('2d')

    // Draw new shapes
    visualizer.drawBackground('black')
    visualizer.drawBase('grey', visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100)
  },

  drawBackground (colorOne, colorTwo = null) {
    if (colorTwo == null) {
      this.context.fillStyle = colorOne
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
  },

  drawBase (colorOne, centerX, centerY, radius) {
    this.context.fillStyle = colorOne
    const startingAngle = (-Math.PI / 8)
    let currentAngle = startingAngle
    this.context.beginPath()

    // Move to initial position
    this.context.moveTo((centerX + (radius * Math.cos(currentAngle))), (centerY + (radius * Math.sin(currentAngle))))
    currentAngle += (Math.PI / 4)

    // For each side, calculate the new vertex and make adjustments.
    for (let i = 0; i < 8; i += 1) {
      const vertexX = centerX + (radius * Math.cos(currentAngle))
      const vertexY = centerY + (radius * Math.sin(currentAngle))
      this.context.lineTo(vertexX, vertexY)
      currentAngle += (Math.PI / 4)
    }
    // Close the path and fill
    this.context.closePath()
    this.context.fill()
  },

  drawBoxes (centerX, centerY, radiusOfBase, maxHeight, colorOne, dataArray) {
    const context = this.context

    // Set the color
    context.fillStyle = colorOne

    // Create the arc
    const heightOfArc = radiusOfBase * Math.cos(Math.PI / 8)
    const widthOfRect = 2 * radiusOfBase * Math.sin(Math.PI / 8)

    context.translate(centerX, centerY)

    for (let i = 0; i < 8; i++) {
      const newHeight = maxHeight * 1.5 * (dataArray[i] / 256)
      context.fillRect(-widthOfRect / 2, 0, widthOfRect, heightOfArc + newHeight)
      context.rotate(Math.PI / 4)
    }

    // Reset the transformation
    context.setTransform(1, 0, 0, 1, 0, 0)
  },

  render (dataArray, currentState) {
    const gradient = visualizer.context.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, currentState.barGradTop)
    gradient.addColorStop(1, currentState.barGradBottom)

    // Draw new shapes
    visualizer.drawBackground(currentState.bgColor)
    visualizer.drawBoxes(visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100, currentState.barMaxLength, gradient, dataArray)
    visualizer.drawBase(currentState.baseColor, visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100)
  },

  rendNotBars: function (currentState) {
    // Draw everything but the bars
    visualizer.drawBackground(currentState.bgColor)
    visualizer.drawBase(currentState.baseColor, visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100)
  }

}

export default visualizer
