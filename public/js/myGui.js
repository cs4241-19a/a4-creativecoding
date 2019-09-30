const dat = require('dat');

function loadGUI(obj) {
  var props = obj;
  var gui = new dat.GUI()
  gui.add(props, 'style', 1, 2);
  gui.add(props, 'R', 0, 255);
  gui.add(props, 'G', 0, 255);
  gui.add(props, 'B', 0, 255);
  gui.add(props, 'thiqness', 0, 25);
  gui.add(props, 'height', 0, 15);
}

// let FizzyText = function() {
//   this.message = 'dat.gui';
//   this.speed = 0.8;
//   this.displayOutline = false;
//   this.explode = function() { alert('Bang!'); };
//   // Define render logic ...
// }

module.exports = { loadGUI };
