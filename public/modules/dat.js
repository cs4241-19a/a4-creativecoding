const datGUI = new dat.GUI()
const guiControls = new function() {
    this.positionX = 50
    this.positionY = 50
    this.positionZ = 50

    this.cameraNear = 2
    this.cameraFar = 434
    this.cameraFov = 100

    this.intensity = 5
    this.distance = 1000
    this.angle = 1.60

    this.target = null
}

export { datGUI, guiControls }