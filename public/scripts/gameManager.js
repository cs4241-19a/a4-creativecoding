/**
 * The class that owns the canvas and draws gameobjects to it
 */
class GameManager {
  _canvas;
  _context;
  _gameObjectList;
  static _instance = null;

  /**
   * initializes everything to null, is only invoked by create instance
   */
  constructor() {
    this._canvas = null;
    this._context = null;
    this._gameObjectList = null;
  }

  /**
   *
   * @return {Array<GameObject>}
   */
  get gameObjects() {
    return this._gameObjectList;
  }
  /**
   * adds a gameObject to be drawn to the screen
   * @param {GameObject} g
   */
  insertGameObject(g) {
    this._gameObjectList.push(g);
    g.start(); // call the underlying function
  }

  /**
   * returns the first instance of an object with the given name
   * @param {String} name
   * @return {GameObject}
   */
  getObject(name) {
    const matches = this._gameObjectList.filter(
        (elt)=>{
          return elt.name === name;
        }
    );
    if (matches.length > 0) {
      return matches[0];
    }
    return null;
  }
  /**
   * remove all items with given name
   * @param {String} name
   */
  removeAll(name) {
    this._gameObjectList = this._gameObjectList.
        filter((elt)=>{
          return !(elt.name === name);
        });
  }
  /**
   * Removes a game object passed in
   * @param {GameObject} g
   */
  removeGameObject(g) {
    this._gameObjectList = this._gameObjectList.filter((elt)=> !(elt === g));
  }
  /**
   * update the entities and draw the scene
   */
  draw() {
    // clear the screen, then draw all of the assets again
    this._context.clearRect(0, 0,
        this._canvas.width, this._canvas.height); // clear canvas
    this._context.fillStyle = '#fff8e1';
    this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._gameObjectList.forEach((g)=>{
      g.update();
      // only draw if the element has a texture
      if (g.texture) {
        this._context.drawImage(g.texture, g.x, g.y, g.width, g.height);
      }
    });
  }

  /**
   * @return {HTMLCanvasElement}
   */
  get canvas() {
    return this._canvas;
  }
  /**
   * @return {CanvasRenderingContext2D}
   */
  getContext() {
    return GameManager._instance._context;
  }

  /**
   * creates the instance of the GameManager
   */
  static _createInstance() {
    GameManager._instance = new GameManager();

    GameManager._instance._canvas = document.getElementById('canvas');
    GameManager._instance._context =
        GameManager._instance._canvas.getContext('2d');
    GameManager._instance._gameObjectList = [];
  }

  /**
   * Returns an instance to the current GameManager
   * @return {GameManager}
   */
  static getInstance() {
    if (!GameManager._instance) {
      GameManager._createInstance();
    }
    return GameManager._instance;
  }
}


export default GameManager;
