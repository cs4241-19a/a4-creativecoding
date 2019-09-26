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
  PAUSE: 'pause',
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
   * determines input routing based on state
   * @param {Event} event
   * @param {StateManager} that
   * @private
   */
  _handleClick(event, that) {
    // TODO make this pass health and strenght to the knight class
    const canvas = that._gameManager.canvas;
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    console.log(`click at ${x}, ${y}`);
    if (that._inputState === inputEnum.ADD) {
      let image = that._blueKnight;
      // replace with the red knight if that's what we're inputting
      if (that._teamToAdd === teamEnum.RED) {
        image = that._redKnight;
      }
      this._gameManager.
          insertGameObject(new Knight(x, y, image, that._teamToAdd));
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
      console.log('removing knights');
      that._gameManager.removeAll(teamEnum.RED);
      that._gameManager.removeAll(teamEnum.BLUE);
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
