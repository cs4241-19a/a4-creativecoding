/**
 * This is the base class for all displayable objects
 */
class GameObject {
    _x;
    _y;
    _height;
    _width;
    _texture;

    /**
     *
     * @param {number} x the x position where this will be drawn
     * @param {number} y the y position where this will be drawn
     * @param {number} height
     * @param {number} width
     * @param {HTMLImageElement} texture the actual image
     */
    constructor(x, y, height, width, texture) {
      this._x=x;
      this._y=y;
      this._height = height;
      this._width = width;
      this._texture=texture;
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
