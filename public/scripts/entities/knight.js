import GameObject from '../gameObject';
import GameManager from '../gameManager';

/**
 * This is the knight character
 */
class Knight extends GameObject {
  _gameManager;
  _multiplier;
  _stateManager;
  /**
   * Creates a new Knight
   * @param {number} x
   * @param {number} y
   * @param {HTMLImageElement}img
   * @param {String} name
   */
  // TODO allow this to take health and strength parameters
  constructor(x, y, img, name) {
    super(x, y, 12, 12, img, name);
    this._gameManager = GameManager.getInstance();
  }

  /**
   * runs when added
   */
  start() {
    this._multiplier = 1;
    this._stateManager = this._gameManager.getObject('stateManager');
    console.log('knight started');
  }

  /**
   * runs on frame update
   */
  update() {
    // TODO have this look for the nearest enemy and move toward them
    if (!this._stateManager.paused) {
      if (this._x + this._width > 600) {
        this._multiplier = -1;
      }
      if (this._x < 0) {
        this._multiplier = 1;
      }
      this._x += (5 * this._multiplier);

      this._gameManager.gameObjects.forEach((e) => {
        if (e !== this && GameObject.detectCollision(this, e)) {
          console.log('collided with ');
        }
      });
    }
  }
}

export default Knight;
