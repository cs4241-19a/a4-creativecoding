import GameObject from '../gameObject';
import GameManager from '../gameManager';

/**
 * This is the knight character
 */
class Knight extends GameObject {
  _gameManager;
  _multiplier;
  _stateManager;
  _health;
  _strength;
  /**
   * Creates a new Knight
   * @param {number} x
   * @param {number} y
   * @param {HTMLImageElement}img
   * @param {number} health the health of this unit
   * @param {number} strength the strength of this unit
   * @param {String} name
   */
  constructor(x, y, img, health, strength, name) {
    super(x, y, 12, 12, img, name);
    this._gameManager = GameManager.getInstance();
    this._health = health;
    this._strength = strength;
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
   * attacks a single collided enemy, reduces its health
   * and pushes the knight back
   * @param {number} bounceAngle the angle it pushes off the enemy at
   * @private
   */
  _attackEnemy(bounceAngle) {
    const bounceStrength = 10;
    let toAttack = null;
    this._gameManager.gameObjects.forEach((e) => {
      if (e.name !== this._name && GameObject.detectCollision(this, e)) {
        toAttack = e;
      }
    });
    if (toAttack) {
      toAttack.health = toAttack.health - this._strength;
      this._x += (-bounceStrength * Math.cos(bounceAngle));
      this._y += (-bounceStrength * Math.sin(bounceAngle));
    }
  }

  /**
   * don't let the object go off screen
   * @private
   */
  _adjustForBoundary() {
    const adjustment = 10;
    if (this._x <= 0) {
      this._x += adjustment;
    }
    if (this._y <=0) {
      this._y += adjustment;
    }
    if (this._x+this._width > this._gameManager.canvas.width) {
      this._x -= adjustment;
    }
    if (this._y+this._height > this._gameManager.canvas.height) {
      this._y -= adjustment;
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

  /**
   * gets the health
   * @return {number}
   */
  get health() {
    return this._health;
  }

  /**
   * sets the health of the knight
   * @param {number} health
   */
  set health(health) {
    this._health=health;
  }
}

export default Knight;
