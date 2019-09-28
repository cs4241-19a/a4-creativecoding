import * as data from './data.js'
import * as globe from './globe.js'


var lock, total;

const execGui = function (gui, map) {
    gui.add(map, 'borders').onChange(function () { globe.changeBorders() })
    gui.add(map, 'popupBackground').onChange(function () { globe.changeInfoBackground() })
    gui.add(map, 'popupTextColor').onChange(function () { globe.changeInfoTextColor() })
    gui.add(map, 'popupWidth').onChange(function () { globe.changePopupWidth() })
    gui.add(map, 'borderThickness').onChange(function () { globe.changeBorderThickness() })
    gui.add(map, 'countryOpacity').onChange(function () { globe.changeCountryOpacity() })
}

window.onload = function(){
    
    var gui = new dat.GUI();
    
    var g = new globe.buildD3(total, lock)

    document.getElementById("rotationOption").addEventListener("change", function(){
        if(document.getElementById("rotationOption").value == "Fixed"){
            lock = true
        }else{
            lock = false
        }
        g = new globe.buildD3(total, lock)
    })

    document.getElementById("dataOption").addEventListener("change", function(){
        if(document.getElementById("dataOption").value == "total"){
            total = true
        }else{
            total = false
        }
        g = new globe.buildD3(total, lock)
    })

    execGui(gui, g)
}