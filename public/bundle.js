(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameObject = _interopRequireDefault(require("../gameObject"));

var _gameManager = _interopRequireDefault(require("../gameManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
   * @param {number} health the health of this unit
   * @param {number} strength the strength of this unit
   * @param {String} name
   */
  function Knight(x, y, img, health, strength, name) {
    var _this;

    _classCallCheck(this, Knight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Knight).call(this, x, y, 12, 12, img, name));

    _defineProperty(_assertThisInitialized(_this), "_gameManager", void 0);

    _defineProperty(_assertThisInitialized(_this), "_multiplier", void 0);

    _defineProperty(_assertThisInitialized(_this), "_stateManager", void 0);

    _defineProperty(_assertThisInitialized(_this), "_health", void 0);

    _defineProperty(_assertThisInitialized(_this), "_strength", void 0);

    _this._gameManager = _gameManager["default"].getInstance();
    _this._health = health;
    _this._strength = strength;
    return _this;
  }
  /**
   * runs when added
   */


  _createClass(Knight, [{
    key: "start",
    value: function start() {
      this._multiplier = 1;
      this._stateManager = this._gameManager.getObject('stateManager');
    }
    /**
     * runs on frame update
     */

  }, {
    key: "update",
    value: function update() {
      if (!this._stateManager.paused) {
        // this will grab all enemies
        var nearest = this._getNearestEnemy();

        if (nearest) {
          var xOffset = nearest.x - this._x;
          var yOffset = nearest.y - this._y;
          var angle = Math.atan2(yOffset, xOffset);
          this._x += 5 * Math.cos(angle);
          this._y += 5 * Math.sin(angle);

          this._adjustForBoundary();

          this._attackEnemy(angle);

          if (this._health <= 0) {
            this._gameManager.removeGameObject(this);
          }
        } else {
          if (this._x + this._width > 600) {
            this._multiplier = -1;
          }

          if (this._x < 0) {
            this._multiplier = 1;
          }

          this._x += 5 * this._multiplier;
        }
      }
    }
    /**
     * attacks a single collided enemy, reduces its health
     * and pushes the knight back
     * @param {number} bounceAngle the angle it pushes off the enemy at
     * @private
     */

  }, {
    key: "_attackEnemy",
    value: function _attackEnemy(bounceAngle) {
      var _this2 = this;

      var bounceStrength = 10;
      var toAttack = null;

      this._gameManager.gameObjects.forEach(function (e) {
        if (e.name !== _this2._name && _gameObject["default"].detectCollision(_this2, e)) {
          toAttack = e;
        }
      });

      if (toAttack) {
        toAttack.health = toAttack.health - this._strength;
        this._x += -bounceStrength * Math.cos(bounceAngle);
        this._y += -bounceStrength * Math.sin(bounceAngle);
      }
    }
    /**
     * don't let the object go off screen
     * @private
     */

  }, {
    key: "_adjustForBoundary",
    value: function _adjustForBoundary() {
      var adjustment = 10;

      if (this._x <= 0) {
        this._x += adjustment;
      }

      if (this._y <= 0) {
        this._y += adjustment;
      }

      if (this._x + this._width > this._gameManager.canvas.width) {
        this._x -= adjustment;
      }

      if (this._y + this._height > this._gameManager.canvas.height) {
        this._y -= adjustment;
      }
    }
    /**
     * Gets the closest enemy
     * @return {Knight}
     */

  }, {
    key: "_getNearestEnemy",
    value: function _getNearestEnemy() {
      var _this3 = this;

      var enemies = this._gameManager.gameObjects.filter(function (e) {
        //  don't track the state Manager as an enemy
        return e.name !== _this3.name && e.name !== _this3._stateManager.name;
      });

      if (enemies.length < 1) {
        return null;
      }

      var nearestRadius = Math.pow(enemies[0].x - this._x, 2) + Math.pow(enemies[0].y - this._y, 2);
      var nearestEnemy = enemies[0];
      enemies.forEach(function (enemy) {
        var curRadius = Math.pow(enemy.x - _this3._x, 2) + Math.pow(enemy.y - _this3._y, 2);

        if (curRadius < nearestRadius) {
          nearestRadius = curRadius;
          nearestEnemy = enemy;
        }
      });
      return nearestEnemy;
    }
    /**
     * gets the health
     * @return {number}
     */

  }, {
    key: "health",
    get: function get() {
      return this._health;
    }
    /**
     * sets the health of the knight
     * @param {number} health
     */
    ,
    set: function set(health) {
      this._health = health;
    }
  }]);

  return Knight;
}(_gameObject["default"]);

var _default = Knight;
exports["default"] = _default;

},{"../gameManager":3,"../gameObject":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameObject = _interopRequireDefault(require("../gameObject"));

var _gameManager = _interopRequireDefault(require("../gameManager"));

var _knight = _interopRequireDefault(require("./knight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var teamEnum = {
  RED: 'red',
  BLUE: 'blue'
};
var inputEnum = {
  ADD: 'add',
  DELETE: 'delete',
  TEAM: 'team',
  TEAM_SELECTIONS: 'teams',
  CLEAR: 'clear',
  HELP: 'help',
  HELP_TEXT: 'help_text',
  EMPTY_TEXT: 'empty_text',
  PAUSE: 'pause',
  HEALTH: 'health',
  STRENGTH: 'strength',
  SELECTED: 'waves-effect waves-light btn light-green',
  DESELECTED: 'waves-effect waves-light btn grey'
};
/**
 * Deals with user input and allows for interaction
 */

var StateManager =
/*#__PURE__*/
function (_GameObject) {
  _inherits(StateManager, _GameObject);

  /**
   * @param {HTMLImageElement} blueKnight
   * @param {HTMLImageElement} redKnight
   * Creates a new state manager
   */
  function StateManager(blueKnight, redKnight) {
    var _this;

    _classCallCheck(this, StateManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StateManager).call(this, -1, -1, 0, 0, null, 'stateManager'));

    _defineProperty(_assertThisInitialized(_this), "_paused", void 0);

    _defineProperty(_assertThisInitialized(_this), "_inputState", void 0);

    _defineProperty(_assertThisInitialized(_this), "_teamToAdd", void 0);

    _defineProperty(_assertThisInitialized(_this), "_blueKnight", void 0);

    _defineProperty(_assertThisInitialized(_this), "_redKnight", void 0);

    _defineProperty(_assertThisInitialized(_this), "_gameManager", void 0);

    _this._blueKnight = blueKnight;
    _this._redKnight = redKnight;
    _this._teamToAdd = teamEnum.BLUE;
    _this._inputState = inputEnum.ADD;
    _this._paused = false;
    _this._gameManager = _gameManager["default"].getInstance();
    return _this;
  }
  /**
   * makes sure the input is a number
   * @param {String} input
   * @return {boolean}
   * @private
   */


  _createClass(StateManager, [{
    key: "_isNumber",
    value: function _isNumber(input) {
      return !isNaN(parseFloat(input)) && isFinite(input);
    }
    /**
     * Gets the text from the inputs and makes sure the value type-checks
     * @private
     * @return {Object}
     */

  }, {
    key: "_getTextInput",
    value: function _getTextInput() {
      var healthInput = document.getElementById(inputEnum.HEALTH).value;
      var strengthInput = document.getElementById(inputEnum.STRENGTH).value;

      if (!this._isNumber(healthInput) || !this._isNumber(strengthInput)) {
        M.toast({
          html: 'Invalid input, only numbers are allowed'
        });
        document.getElementById(inputEnum.HEALTH).value = 15;
        document.getElementById(inputEnum.STRENGTH).value = 15;
        return {
          health: 15,
          strength: 15
        };
      }

      var health = parseInt(healthInput);
      var strength = parseInt(strengthInput);
      return {
        health: health,
        strength: strength
      };
    }
    /**
     * determines input routing based on state
     * @param {Event} event
     * @param {StateManager} that
     * @private
     */

  }, {
    key: "_handleClick",
    value: function _handleClick(event, that) {
      var canvas = that._gameManager.canvas;
      var x = event.pageX - canvas.offsetLeft;
      var y = event.pageY - canvas.offsetTop;

      if (that._inputState === inputEnum.ADD) {
        var image = that._blueKnight; // replace with the red knight if that's what we're inputting

        if (that._teamToAdd === teamEnum.RED) {
          image = that._redKnight;
        } // get the input then create the knight


        var textInput = this._getTextInput();

        this._gameManager.insertGameObject(new _knight["default"](x, y, image, textInput.health, textInput.strength, that._teamToAdd));
      } else if (that._inputState === inputEnum.DELETE) {
        var collider = new _gameObject["default"](x, y, 5, 5, null, 'collider');

        that._gameManager.gameObjects.forEach(function (e) {
          if (_gameObject["default"].detectCollision(collider, e)) {
            that._gameManager.removeGameObject(e);
          }
        });
      }
    }
    /**
     * Get the canvas on startup and add our listener
     */

  }, {
    key: "start",
    value: function start() {
      var canvas = _gameManager["default"].getInstance().canvas;

      var addButton = document.getElementById(inputEnum.ADD);
      var deleteButton = document.getElementById(inputEnum.DELETE);
      var teamDropDown = document.getElementById(inputEnum.TEAM_SELECTIONS);
      var pauseButton = document.getElementById(inputEnum.PAUSE);
      var clearButton = document.getElementById(inputEnum.CLEAR);
      var helpButton = document.getElementById(inputEnum.HELP);
      var that = this;
      canvas.addEventListener('click', function (event) {
        that._handleClick(event, that);
      }, false);
      teamDropDown.addEventListener('click', function (event) {
        that._teamToAdd = event.target.innerHTML;
        document.getElementById(inputEnum.TEAM).innerText = that._teamToAdd;
      });
      addButton.addEventListener('click', function (event) {
        that._inputState = inputEnum.ADD;
        addButton.className = inputEnum.SELECTED;
        deleteButton.className = inputEnum.DESELECTED;
      }, false);
      deleteButton.addEventListener('click', function (event) {
        that._inputState = inputEnum.DELETE;
        addButton.className = inputEnum.DESELECTED;
        deleteButton.className = inputEnum.SELECTED;
      }, false);
      pauseButton.addEventListener('click', function (event) {
        that._paused = !that._paused;

        if (that._paused) {
          document.getElementById('pause_icon').innerHTML = 'play_arrow';
        } else {
          document.getElementById('pause_icon').innerHTML = 'pause';
        }
      }, false);
      clearButton.addEventListener('click', function (event) {
        that._gameManager.removeAll(teamEnum.RED);

        that._gameManager.removeAll(teamEnum.BLUE);
      }, false);
      helpButton.addEventListener('click', function (event) {
        var helpDisplayed = document.getElementById(inputEnum.HELP_TEXT).style.display;

        if (helpDisplayed === 'none') {
          document.getElementById(inputEnum.HELP_TEXT).style.display = 'block';
          document.getElementById(inputEnum.EMPTY_TEXT).style.display = 'none';
        } else {
          document.getElementById(inputEnum.HELP_TEXT).style.display = 'none';
          document.getElementById(inputEnum.EMPTY_TEXT).style.display = 'block';
        }
      }, false);
    }
    /**
     *
     * @return {boolean}
     */

  }, {
    key: "update",

    /**
     * listens for click on canvas and adds knight
     */
    value: function update() {}
  }, {
    key: "paused",
    get: function get() {
      return this._paused;
    }
  }]);

  return StateManager;
}(_gameObject["default"]);

var _default = StateManager;
exports["default"] = _default;

},{"../gameManager":3,"../gameObject":4,"./knight":1}],3:[function(require,module,exports){
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
     * returns the first instance of an object with the given name
     * @param {String} name
     * @return {GameObject}
     */

  }, {
    key: "getObject",
    value: function getObject(name) {
      var matches = this._gameObjectList.filter(function (elt) {
        return elt.name === name;
      });

      if (matches.length > 0) {
        return matches[0];
      }

      return null;
    }
    /**
     * remove all items with given name
     * @param {String} name
     */

  }, {
    key: "removeAll",
    value: function removeAll(name) {
      this._gameObjectList = this._gameObjectList.filter(function (elt) {
        return !(elt.name === name);
      });
    }
    /**
     * Removes a game object passed in
     * @param {GameObject} g
     */

  }, {
    key: "removeGameObject",
    value: function removeGameObject(g) {
      this._gameObjectList = this._gameObjectList.filter(function (elt) {
        return !(elt === g);
      });
    }
    /**
     * update the entities and draw the scene
     */

  }, {
    key: "draw",
    value: function draw() {
      var _this = this;

      // clear the screen, then draw all of the assets again
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height); // clear canvas


      this._context.fillStyle = '#fff8e1';

      this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

      this._gameObjectList.forEach(function (g) {
        g.update(); // only draw if the element has a texture

        if (g.texture) {
          _this._context.drawImage(g.texture, g.x, g.y, g.width, g.height);
        }
      });
    }
    /**
     * @return {HTMLCanvasElement}
     */

  }, {
    key: "getContext",

    /**
     * @return {CanvasRenderingContext2D}
     */
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
  }, {
    key: "canvas",
    get: function get() {
      return this._canvas;
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

},{}],4:[function(require,module,exports){
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
   * @param {String} name the name of the object
   */
  function GameObject(x, y, height, width, texture, name) {
    _classCallCheck(this, GameObject);

    _defineProperty(this, "_x", void 0);

    _defineProperty(this, "_y", void 0);

    _defineProperty(this, "_height", void 0);

    _defineProperty(this, "_width", void 0);

    _defineProperty(this, "_texture", void 0);

    _defineProperty(this, "_name", void 0);

    this._x = x;
    this._y = y;
    this._height = height;
    this._width = width;
    this._texture = texture;
    this._name = name;
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
    /**
    *
    * @return {String}
    */

  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
    /**
    * Checks for a collision between 2 game objects
    * @param {GameObject} g1
    * @param {GameObject} g2
     * @return {boolean}
    */

  }], [{
    key: "detectCollision",
    value: function detectCollision(g1, g2) {
      return g1.x < g2.x + g2.width && g1.x + g1.width > g2.x && g1.y < g2.y + g2.height && g1.y + g1.height > g2.y;
    }
  }]);

  return GameObject;
}();

var _default = GameObject;
exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

var _gameManager = _interopRequireDefault(require("./gameManager.js"));

var _stateManager = _interopRequireDefault(require("./entities/stateManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// init stuff
var blueKnightImage = new Image();
var redKnightImage = new Image();

var gameManager = _gameManager["default"].getInstance();

document.addEventListener('DOMContentLoaded', function () {
  var ddelems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(ddelems);
});
var imageLoadPromise = new Promise(function (resolve) {
  var done = false;

  blueKnightImage.onload = function () {
    done = true;
  };

  redKnightImage.onload = function () {
    if (done) {
      resolve();
    }
  };

  blueKnightImage.src = './img/blue_knight.png';
  redKnightImage.src = './img/red_knight.png';
}); // create the game manager once the content is ready

imageLoadPromise.then(function () {
  // add the state manager to the gameManager
  gameManager.insertGameObject(new _stateManager["default"](blueKnightImage, redKnightImage));
  console.log(gameManager.gameObjects.length);
  window.requestAnimationFrame(draw);
});
/**
 * this draws stuff to the screen.
 */

function draw() {
  gameManager.draw();
  window.requestAnimationFrame(draw);
}

},{"./entities/stateManager":2,"./gameManager.js":3}]},{},[5]);
