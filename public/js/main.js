import * as map from './map.js'
import * as data from './data.js'

// toggle information
const toggleInfo = function () {
  var x = document.getElementById('info')
  if (x.style.opacity == 0) {
    x.style.opacity = 1
  } else {
    x.style.opacity = 0
  }
}

/*************************************************************************************
 *                                                                                   *
 *                                  On Load                                          *
 *                                                                                   *
 *************************************************************************************/

const exeGuiFeatures = function (gui, map) {
  gui.add(map, 'pointSize', 0, 50).onChange(function () { map.updateSize() })
  gui.add(map, 'pointColor').onChange(function () { map.updateColor() })
  gui.add(map, 'stateColor').onChange(function () { map.changeStateColor() })
  gui.add(map, 'stateBorders').onChange(function () { map.changeStateBorders() })
  gui.add(map, 'titleBackground').onChange(function () { map.changeInfoBackground() })
  gui.add(map, 'titleTextColor').onChange(function () { map.changeInfoTextColor() })
}

window.onload = function () {

  const button = document.getElementById('toggleInfo')
  button.onclick = toggleInfo
  // get earthquake data
  data.getQuakeData()
  // draw map & plot points
  var m = new map.makeMap()
  var gui = new dat.GUI()
  // execute gui exeGuiFeatures
  exeGuiFeatures(gui, m)
}