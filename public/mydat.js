/*
 * Module to set up my dat.GUI
 * by Terry Hearst
 */

const dat = require('dat.gui')

module.exports = {
  init: function (gameOfLife, golBoard) {
    const gui = new dat.GUI()

    const f1 = gui.addFolder('Main')
    f1.add(gameOfLife, 'running').name('Running')
    f1.add(gameOfLife, 'singleStep').name('Single Step')
    f1.add(gameOfLife, 'speed', 1, 20).name('Iterations/Sec').step(1)
    f1.add(gameOfLife, 'rotSpeed', 0, 5).name('Rotation Speed')
    f1.add(gameOfLife, 'editMode').name('Edit Mode')
    f1.add(gameOfLife, 'showHelp').name('Toggle Help')

    // f1.open()

    const f2 = gui.addFolder('Change the Rules')
    f2.add(golBoard, 'starvation', 0, 8).step(1)
    f2.add(golBoard, 'overpopulation', 0, 8).step(1)
    f2.add(golBoard, 'birth', 0, 8).step(1)
  }
}
