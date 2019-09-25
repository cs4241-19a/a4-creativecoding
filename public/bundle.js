(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var warrior = {
  height: 25,
  width: 25,
  x: 25,
  y: 25,
  draw: function draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
  }
};
warrior.draw();
warrior.draw();
warrior.draw();
var _default = warrior;
exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

var _gameManager = _interopRequireDefault(require("./gameManager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log('anumber is:', _gameManager["default"]);

},{"./gameManager.js":1}]},{},[2]);
