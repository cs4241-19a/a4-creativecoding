(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameObject = _interopRequireDefault(require("../gameObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This is the knight character
 */
var Knight =
/*#__PURE__*/
function (_GameObject) {
  _inherits(Knight, _GameObject);

  /**
   * Creates a new Knight
   * @param {number} x
   * @param {number} y
   * @param {HTMLImageElement}img
   */
  function Knight(x, y, img) {
    _classCallCheck(this, Knight);

    return _possibleConstructorReturn(this, _getPrototypeOf(Knight).call(this, x, y, 12, 50, img));
  }
  /**
   * runs when added
   */


  _createClass(Knight, [{
    key: "start",
    value: function start() {
      console.log('knight started');
    }
    /**
     * runs on frame update
     */

  }, {
    key: "update",
    value: function update() {
      var multiplier = 1;

      if (this._x + this._width > 600) {
        multiplier = -1;
      }

      this._x += 5 * multiplier;
    }
  }]);

  return Knight;
}(_gameObject["default"]);

var _default = Knight;
exports["default"] = _default;

},{"../gameObject":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The class that owns the canvas and draws gameobjects to it
 */
var GameManager =
/*#__PURE__*/
function () {
  /**
   * initializes everything to null, is only invoked by create instance
   */
  function GameManager() {
    _classCallCheck(this, GameManager);

    _defineProperty(this, "_canvas", void 0);

    _defineProperty(this, "_context", void 0);

    _defineProperty(this, "_gameObjectList", void 0);

    this._canvas = null;
    this._context = null;
    this._gameObjectList = null;
  }
  /**
   *
   * @return {Array<GameObject>}
   */


  _createClass(GameManager, [{
    key: "insertGameObject",

    /**
     * adds a gameObject to be drawn to the screen
     * @param {GameObject} g
     */
    value: function insertGameObject(g) {
      this._gameObjectList.push(g);

      g.start(); // call the underlying function
    }
    /**
     * update the characters and draw the scene
     */

  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      // clear the screen, then draw all of the assets again
      this._context.clearRect(0, 0, 600, 300); // clear canvas


      this._gameObjectList.forEach(function (g) {
        g.update();

        _this._context.drawImage(g.texture, g.x, g.y, g.width, g.height);
      });
    }
    /**
     * @return {CanvasRenderingContext2D}
     */

  }, {
    key: "getContext",
    value: function getContext() {
      return GameManager._instance._context;
    }
    /**
     * creates the instance of the GameManager
     */

  }, {
    key: "gameObjects",
    get: function get() {
      return this._gameObjectList;
    }
  }], [{
    key: "_createInstance",
    value: function _createInstance() {
      GameManager._instance = new GameManager();
      GameManager._instance._canvas = document.getElementById('canvas');
      GameManager._instance._context = GameManager._instance._canvas.getContext('2d');
      GameManager._instance._gameObjectList = [];
    }
    /**
     * Returns an instance to the current GameManager
     * @return {GameManager}
     */

  }, {
    key: "getInstance",
    value: function getInstance() {
      if (!GameManager._instance) {
        GameManager._createInstance();
      }

      return GameManager._instance;
    }
  }]);

  return GameManager;
}();

_defineProperty(GameManager, "_instance", null);

var _default = GameManager;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This is the base class for all displayable objects
 */
var GameObject =
/*#__PURE__*/
function () {
  /**
   *
   * @param {number} x the x position where this will be drawn
   * @param {number} y the y position where this will be drawn
   * @param {number} height
   * @param {number} width
   * @param {HTMLImageElement} texture the actual image
   */
  function GameObject(x, y, height, width, texture) {
    _classCallCheck(this, GameObject);

    _defineProperty(this, "_x", void 0);

    _defineProperty(this, "_y", void 0);

    _defineProperty(this, "_height", void 0);

    _defineProperty(this, "_width", void 0);

    _defineProperty(this, "_texture", void 0);

    this._x = x;
    this._y = y;
    this._height = height;
    this._width = width;
    this._texture = texture;
  }
  /**
   * @return {number}
   */


  _createClass(GameObject, [{
    key: "start",

    /**
     * the start function of the base class GameObject
     * This is called when the object is added to the GameManager
     */
    value: function start() {}
    /**
     * function called on each frame
     */

  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "x",
    get: function get() {
      return this._x;
    }
    /**
     * @return {number}
     */

  }, {
    key: "y",
    get: function get() {
      return this._y;
    }
    /**
     * @return {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
    /**
     * @return {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
    /**
    * @return {HTMLImageElement}
    */

  }, {
    key: "texture",
    get: function get() {
      return this._texture;
    }
  }]);

  return GameObject;
}();

var _default = GameObject;
exports["default"] = _default;

},{}],4:[function(require,module,exports){
"use strict";

var _gameManager = _interopRequireDefault(require("./gameManager.js"));

var _knight = _interopRequireDefault(require("./characters/knight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var knightImage = new Image();
var imageLoadPromise = new Promise(function (resolve) {
  knightImage.onload = function () {
    resolve();
  };

  knightImage.src = './img/knight.png';
});

var gameManager = _gameManager["default"].getInstance();
/**
 * this draws stuff to the screen.
 */


function draw() {
  gameManager.draw();
  window.requestAnimationFrame(draw);
}

console.log(gameManager._gameObjectList);
imageLoadPromise.then(function () {
  gameManager.insertGameObject(new _knight["default"](0, 0, knightImage));
  gameManager.insertGameObject(new _knight["default"](13, 35, knightImage));
  window.requestAnimationFrame(draw);
}); // const warrior = {
//   height: 25,
//   width: 25,
//   x: 25,
//   y: 25,
//   texture: null,
//   draw: function() {
//     this.texture = new Image();
//     const that = this;
//     this.texture.onload = function() {
//       gameManager.getContext().
//           drawImage(that.texture, that.x, that.y, that.height, that.width);
//       console.log('loaded image');
//     };
//     this.texture.src = './img/bulbasaur.png';
//   },
// };

},{"./characters/knight":1,"./gameManager.js":2}]},{},[4]);
