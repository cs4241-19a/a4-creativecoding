/**
 * This manages the inputs from the user and stores the state of the simulation
 */
import GameObject from '../gameObject';
import GameManager from '../gameManager';
import Knight from './knight';


const teamEnum = {
  RED: 'red',
  BLUE: 'blue',
};

const inputEnum = {
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
  DESELECTED: 'waves-effect waves-light btn grey',
};

/**
 * Deals with user input and allows for interaction
 */
class StateManager extends GameObject {
  _paused;
  _inputState;
  _teamToAdd;
  _blueKnight;
  _redKnight;
  _gameManager;
  /**
   * @param {HTMLImageElement} blueKnight
   * @param {HTMLImageElement} redKnight
   * Creates a new state manager
   */
  constructor(blueKnight, redKnight) {
    super(-1, -1, 0, 0, null, 'stateManager');
    this._blueKnight = blueKnight;
    this._redKnight = redKnight;
    this._teamToAdd = teamEnum.BLUE;
    this._inputState = inputEnum.ADD;
    this._paused = false;
    this._gameManager = GameManager.getInstance();
  }

  /**
   * makes sure the input is a number
   * @param {String} input
   * @return {boolean}
   * @private
   */
  _isNumber(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
  }
  /**
   * Gets the text from the inputs and makes sure the value type-checks
   * @private
   * @return {Object}
   */
  _getTextInput() {
    const healthInput = document.getElementById(inputEnum.HEALTH).value;
    const strengthInput = document.getElementById(inputEnum.STRENGTH).value;
    if (!this._isNumber(healthInput) || !this._isNumber(strengthInput)) {
      M.toast({html: 'Invalid input, only numbers are allowed'});
      document.getElementById(inputEnum.HEALTH).value = 15;
      document.getElementById(inputEnum.STRENGTH).value = 15;
      return {health: 15, strength: 15};
    }
    const health = parseInt(healthInput);
    const strength = parseInt(strengthInput);

    return {health: health, strength: strength};
  }
  /**
   * determines input routing based on state
   * @param {Event} event
   * @param {StateManager} that
   * @private
   */
  _handleClick(event, that) {
    const canvas = that._gameManager.canvas;
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;

    if (that._inputState === inputEnum.ADD) {
      let image = that._blueKnight;
      // replace with the red knight if that's what we're inputting
      if (that._teamToAdd === teamEnum.RED) {
        image = that._redKnight;
      }
      // get the input then create the knight
      const textInput = this._getTextInput();
      this._gameManager.
          insertGameObject(new Knight(x, y, image,
              textInput.health, textInput.strength, that._teamToAdd));
    } else if (that._inputState === inputEnum.DELETE) {
      const collider = new GameObject(x, y, 5, 5, null, 'collider');
      that._gameManager.gameObjects.forEach((e)=>{
        if (GameObject.detectCollision(collider, e)) {
          that._gameManager.removeGameObject(e);
        }
      });
    }
  }
  /**
   * Get the canvas on startup and add our listener
   */
  start() {
    const canvas = GameManager.getInstance().canvas;
    const addButton = document.getElementById(inputEnum.ADD);
    const deleteButton = document.getElementById(inputEnum.DELETE);
    const teamDropDown = document.getElementById(inputEnum.TEAM_SELECTIONS);
    const pauseButton = document.getElementById(inputEnum.PAUSE);
    const clearButton = document.getElementById(inputEnum.CLEAR);
    const helpButton = document.getElementById(inputEnum.HELP);
    const that = this;

    canvas.addEventListener('click', function(event) {
      that._handleClick(event, that);
    }, false);

    teamDropDown.addEventListener('click', function(event) {
      that._teamToAdd = event.target.innerHTML;
      document.getElementById(inputEnum.TEAM).innerText = that._teamToAdd;
    });

    addButton.addEventListener('click', function(event) {
      that._inputState = inputEnum.ADD;
      addButton.className = inputEnum.SELECTED;
      deleteButton.className = inputEnum.DESELECTED;
    }, false);

    deleteButton.addEventListener('click', function(event) {
      that._inputState = inputEnum.DELETE;
      addButton.className = inputEnum.DESELECTED;
      deleteButton.className = inputEnum.SELECTED;
    }, false);

    pauseButton.addEventListener('click', function(event) {
      that._paused = !that._paused;
      if (that._paused) {
        document.getElementById('pause_icon').innerHTML='play_arrow';
      } else {
        document.getElementById('pause_icon').innerHTML='pause';
      }
    }, false);

    clearButton.addEventListener('click', function(event) {
      that._gameManager.removeAll(teamEnum.RED);
      that._gameManager.removeAll(teamEnum.BLUE);
    }, false);

    helpButton.addEventListener('click', function(event) {
      const helpDisplayed = document.getElementById(inputEnum.HELP_TEXT).
          style.display;
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
  get paused() {
    return this._paused;
  }
  /**
   * listens for click on canvas and adds knight
   */
  update() {

  }
}

export default StateManager;
