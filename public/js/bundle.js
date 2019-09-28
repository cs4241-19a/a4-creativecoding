(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var audioData = {
  state: {
    player: null,
    analyser: null,
    audioElement: null,
    results: null,
    path: ''
  },
  // Bin object prototype
  Bin: function Bin(first, last) {
    this.first = first;
    this.last = last;
    this.length = last + 1 - (first + 1);
  },
  init: function init(pathName) {
    this.state.path = pathName;
    var audioContext = new AudioContext(); // Create a new audio element

    var audioElement = document.createElement('audio');
    this.state.audioElement = audioElement;
    document.body.appendChild(audioElement);
    var analyser = audioContext.createAnalyser();
    this.state.analyser = analyser;
    analyser.fftSize = 1024;
    var player = audioContext.createMediaElementSource(audioElement);
    this.state.player = player;
    player.connect(audioContext.destination);
    player.connect(analyser);
    audioElement.src = pathName;
  },
  pauseAudio: function pauseAudio() {
    var st = this.state;
    st.audioElement.pause();
  },
  startAudio: function startAudio() {
    var st = this.state;

    if (st.audioElement !== null) {
      st.audioElement.play().then(function () {});
    } else {
      console.log('Element has not been created yet! Use the init() function!');
    }
  },
  getResults: function getResults() {
    var state = this.state;
    var tempArray = new Uint8Array(state.analyser.frequencyBinCount);
    state.analyser.getByteFrequencyData(tempArray);
    var bins = [new this.Bin(1, 3), new this.Bin(4, 8), new this.Bin(8, 12), new this.Bin(13, 25), new this.Bin(25, 55), new this.Bin(55, 85), new this.Bin(85, 150), new this.Bin(150, 511)];
    var finalAverages = [];
    bins.forEach(function (bin) {
      // Get the slice of the array
      var slice = tempArray.slice(bin.first, bin.last); // Sum all elements in the slice

      var sum = slice.reduce(function (a, b) {
        return a + b;
      }, 0); // Add the average to the final sum

      finalAverages.push(sum / bin.length);
    });
    return finalAverages;
  }
};
var _default = audioData;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _audio = _interopRequireDefault(require("./audio.js"));

var _visualizer = _interopRequireDefault(require("./visualizer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isPlaying = false;
var firstUse = true;
var state = {
  bgColor: '#000000',
  barGradTop: '#ff0000',
  barGradBottom: '#00ff00',
  barMaxLength: 150,
  baseColor: '#1e1e1e'
};

window.onload = function () {
  var datGUI = new dat.GUI();
  var playObj = {
    playPause: function playPause() {
      // Initialize the audio module AFTER user interaction
      // Thanks Chrome for making my life so much harder
      if (firstUse) {
        _audio["default"].init('./data/test.mp3');

        firstUse = false;
      }

      if (isPlaying) {
        _audio["default"].pauseAudio();

        isPlaying = false;
      } else {
        _audio["default"].startAudio();

        isPlaying = true;
      }
    },
    displayInstructionsPopup: function displayInstructionsPopup() {
      var windowObj = {
        type: 'info',
        title: 'Instructions',
        html: '<p>This webpage creates a basic audio visualization using different parameters which can be modified using the menu on the side. Here are the aspects in which you can control the visualization:<p>' + '<p><strong>Play/Pause</strong>: Starts and stops the music</p>' + '<p><strong>Background</strong>: Changes the color of the background</p>' + '<p><strong>Bar Color 1</strong>: Changes the inner color of the bar gradient</p>' + '<p><strong>Bar Color 2</strong>: Changes the outer color of the bar gradient</p>' + '<p><strong>Max Length</strong>: Changes the maximum length of the bar</p>' + '<p><strong>Base Color</strong>: Changes the color of the octagonal base</p>' + '<p><strong>Help</strong>: Redisplays this menu</p>' + '<p>Project created by James Plante<p>'
      };
      Swal.fire(windowObj);
    }
  };
  datGUI.add(playObj, 'playPause').name('Play/Pause');
  datGUI.addColor(state, 'bgColor').name('Background');
  datGUI.addColor(state, 'barGradTop').name('Bar Color 1');
  datGUI.addColor(state, 'barGradBottom').name('Bar Color 2');
  datGUI.add(state, 'barMaxLength').step(10).min(0).max(300).name('Max Length');
  datGUI.addColor(state, 'baseColor').name('Base Color');
  datGUI.add(playObj, 'displayInstructionsPopup').name('Help');

  _visualizer["default"].init(); // Set up the render loop


  var renderFrame = function renderFrame() {
    // If AudioContext not created, then only render background and base
    if (firstUse) {
      _visualizer["default"].rendNotBars(state);
    } else {
      _visualizer["default"].render(_audio["default"].getResults(), state);
    }

    window.requestAnimationFrame(renderFrame);
  };

  renderFrame();
  playObj.displayInstructionsPopup();
};

},{"./audio.js":1,"./visualizer.js":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var visualizer = {
  init: function init() {
    // bundle.js:20Create canvas
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas); // Specify canvas height

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d'); // Draw new shapes

    visualizer.drawBackground('black');
    visualizer.drawBase('grey', visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100);
  },
  drawBackground: function drawBackground(colorOne) {
    var colorTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (colorTwo == null) {
      this.context.fillStyle = colorOne;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  },
  drawBase: function drawBase(colorOne, centerX, centerY, radius) {
    this.context.fillStyle = colorOne;
    var startingAngle = -Math.PI / 8;
    var currentAngle = startingAngle;
    this.context.beginPath(); // Move to initial position

    this.context.moveTo(centerX + radius * Math.cos(currentAngle), centerY + radius * Math.sin(currentAngle));
    currentAngle += Math.PI / 4; // For each side, calculate the new vertex and make adjustments.

    for (var i = 0; i < 8; i += 1) {
      var vertexX = centerX + radius * Math.cos(currentAngle);
      var vertexY = centerY + radius * Math.sin(currentAngle);
      this.context.lineTo(vertexX, vertexY);
      currentAngle += Math.PI / 4;
    } // Close the path and fill


    this.context.closePath();
    this.context.fill();
  },
  drawBoxes: function drawBoxes(centerX, centerY, radiusOfBase, maxHeight, colorOne, dataArray) {
    var context = this.context; // Set the color

    context.fillStyle = colorOne; // Create the arc

    var heightOfArc = radiusOfBase * Math.cos(Math.PI / 8);
    var widthOfRect = 2 * radiusOfBase * Math.sin(Math.PI / 8);
    context.translate(centerX, centerY);

    for (var i = 0; i < 8; i++) {
      var newHeight = maxHeight * 1.5 * (dataArray[i] / 256);
      context.fillRect(-widthOfRect / 2, 0, widthOfRect, heightOfArc + newHeight);
      context.rotate(Math.PI / 4);
    } // Reset the transformation


    context.setTransform(1, 0, 0, 1, 0, 0);
  },
  render: function render(dataArray, currentState) {
    var gradient = visualizer.context.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, currentState.barGradTop);
    gradient.addColorStop(1, currentState.barGradBottom); // Draw new shapes

    visualizer.drawBackground(currentState.bgColor);
    visualizer.drawBoxes(visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100, currentState.barMaxLength, gradient, dataArray);
    visualizer.drawBase(currentState.baseColor, visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100);
  },
  rendNotBars: function rendNotBars(currentState) {
    // Draw everything but the bars
    visualizer.drawBackground(currentState.bgColor);
    visualizer.drawBase(currentState.baseColor, visualizer.canvas.width / 2, visualizer.canvas.height / 2, 100);
  }
};
var _default = visualizer;
exports["default"] = _default;

},{}]},{},[2]);
