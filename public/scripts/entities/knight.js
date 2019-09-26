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
      // this will grab all enemies
      const nearest = this._getNearestEnemy();
      if (nearest) {
        const xOffset = nearest.x - this._x;
        const yOffset = nearest.y - this._y;
        const angle = Math.atan2(yOffset, xOffset);
        this._x += (5 * Math.cos(angle));
        this._y += (5*Math.sin(angle));
        this._adjustForBoundary();
      } else {
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

  /**
   * don't let the object go off screen
   * @private
   */
  _adjustForBoundary() {
    if (this._x <= 0) {
      this._x +=5;
    }
    if (this._y <=0) {
      this._y +=5;
    }
    if (this._x+this._width > this._gameManager.canvas.width) {
      this._x -=5;
    }
    if (this._y+this._height > this._gameManager.canvas.height) {
      this._y -=5;
    }
  }
  /**
   * Gets the closest enemy
   * @return {Knight}
   */
  _getNearestEnemy() {
    const enemies = this._gameManager.gameObjects.filter((e)=>{
      //  don't track the state Manager as an enemy
      return (e.name !== this.name && e.name !== this._stateManager.name);
    });
    if (enemies.length < 1) {
      console.log('no enemy found');
      return null;
    }
    let nearestRadius = Math.pow(enemies[0].x-this._x, 2) +
        Math.pow(enemies[0].y-this._y, 2);
    let nearestEnemy = enemies[0];

    enemies.forEach((enemy)=>{
      const curRadius = Math.pow(enemy.x-this._x, 2) +
          Math.pow(enemy.y-this._y, 2);

      if (curRadius < nearestRadius) {
        nearestRadius = curRadius;
        nearestEnemy = enemy;
      }
    });

    return nearestEnemy;
  }
}

export default Knight;
