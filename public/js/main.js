import * as map from './map.js';
import * as data from './data.js';

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

window.onload = functionv() {

    // get earthquake data
    data.getQuakeData()
    
    // draw map & plot points
    var m = new map.makeMap()
    var gui = new dat.GUI();

    //execute gui exeGuiFeatures
    exeGuiFeatures(gui, m)
}