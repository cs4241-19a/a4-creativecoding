import GameObject from '../gameObject';

/**
 * This is the knight character
 */
class Knight extends GameObject {
  /**
   * Creates a new Knight
   * @param {number} x
   * @param {number} y
   * @param {HTMLImageElement}img
   */
  constructor(x, y, img) {
    super(x, y, 12, 50, img);
  }

  /**
   * runs when added
   */
  start() {
    console.log('knight started');
  }

  /**
   * runs on frame update
   */
  update() {
    let multiplier = 1;
    if (this._x+this._width > 600) {
      multiplier = -1;
    }
    this._x+=(5*multiplier);
  }
}

export default Knight;
