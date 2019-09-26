/**
 * This is the base class for all displayable objects
 */
class GameObject {
    _x;
    _y;
    _height;
    _width;
    _texture;
    _name;

    /**
     *
     * @param {number} x the x position where this will be drawn
     * @param {number} y the y position where this will be drawn
     * @param {number} height
     * @param {number} width
     * @param {HTMLImageElement} texture the actual image
     * @param {String} name the name of the object
     */
    constructor(x, y, height, width, texture, name) {
      this._x=x;
      this._y=y;
      this._height = height;
      this._width = width;
      this._texture = texture;
      this._name = name;
    }

    /**
     * @return {number}
     */
    get x() {
      return this._x;
    }

    /**
     * @return {number}
     */
    get y() {
      return this._y;
    }

    /**
     * @return {number}
     */
    get height() {
      return this._height;
    }

    /**
     * @return {number}
     */
    get width() {
      return this._width;
    }

    /**
   * @return {HTMLImageElement}
   */
    get texture() {
      return this._texture;
    }

    /**
   *
   * @return {String}
   */
    get name() {
      return this._name;
    }

    /**
   * Checks for a collision between 2 game objects
   * @param {GameObject} g1
   * @param {GameObject} g2
     * @return {boolean}
   */
    static detectCollision(g1, g2) {
      return g1.x < g2.x + g2.width &&
          g1.x + g1.width > g2.x &&
          g1.y < g2.y + g2.height &&
          g1.y + g1.height > g2.y;
    }

    /**
     * the start function of the base class GameObject
     * This is called when the object is added to the GameManager
     */
    start() {
    }

    /**
     * function called on each frame
     */
    update() {
    }
}


export default GameObject;
