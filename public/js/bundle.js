(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioGraph = exports.audioInit = void 0;

var audioInit = function audioInit(canvas) {
  var ctx = canvas.getContext('2d'); // audio init

  var audioCtx = new AudioContext();
  var audioElement = document.createElement('audio');
  document.getElementById('canvas').appendChild(audioElement);
  return {
    ctx: ctx,
    audioCtx: audioCtx,
    audioElement: audioElement
  };
};

exports.audioInit = audioInit;

var audioGraph = function audioGraph(canvas, json) {
  var analyser = json.audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  var player = json.audioCtx.createMediaElementSource(json.audioElement);
  player.connect(json.audioCtx.destination);
  player.connect(analyser);
  return {
    analyser: analyser,
    player: player
  };
};

exports.audioGraph = audioGraph;

},{}],2:[function(require,module,exports){
"use strict";

var _module = require("./module.js");

var startMello = function startMello() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/mello.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + b + ',' + g + ',' + r + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

var startAC = function startAC() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/acdc.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + g + ',' + r + ',' + b + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

var startElectro = function startElectro() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/shelter.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + r + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

var startRamm = function startRamm() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/deutschland.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

var startInst = function startInst() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/inst.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + r + ',' + b + ',' + g + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

var startBeat = function startBeat() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/exploder.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + g + ',' + b + ',' + r + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

var startDub = function startDub() {
  document.getElementById('canvas').innerHTML = '';
  var canvas = document.createElement('canvas');
  document.getElementById('canvas').appendChild(canvas);
  canvas.width = 1500;
  canvas.height = 800;
  var jsonAudioInit = (0, _module.audioInit)(canvas);
  var jsonAudioGraph = (0, _module.audioGraph)(canvas, jsonAudioInit);
  jsonAudioInit.audioElement.src = '../media/dubstep.mp3';
  jsonAudioInit.audioElement.play();
  var results = new Uint8Array(jsonAudioGraph.analyser.frequencyBinCount);

  var draw = function draw() {
    window.requestAnimationFrame(draw);
    jsonAudioGraph.analyser.getByteFrequencyData(results);
    var x = 0;
    jsonAudioInit.ctx.fillStyle = 'black';
    jsonAudioInit.ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < jsonAudioGraph.analyser.frequencyBinCount; i++) {
      var barHeight = results[i] * 2 + 60;
      var r = barHeight + 25 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var g = 250 * (i / jsonAudioGraph.analyser.frequencyBinCount);
      var b = 50;
      jsonAudioInit.ctx.fillStyle = 'rgb(' + b + ',' + r + ',' + g + ')';
      jsonAudioInit.ctx.fillRect(x, canvas.height - barHeight, canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5, barHeight);
      x += canvas.width / jsonAudioGraph.analyser.frequencyBinCount * 2.5 + 1;
    }
  };

  draw();
};

window.onload = function () {
  document.getElementById('mello').onclick = startMello;
  document.getElementById('rammstein').onclick = startRamm;
  document.getElementById('electro').onclick = startElectro;
  document.getElementById('instru').onclick = startInst;
  document.getElementById('beats').onclick = startBeat;
  document.getElementById('dubstep').onclick = startDub;
  document.getElementById('acdc').onclick = startAC;
};

},{"./module.js":1}]},{},[2]);
