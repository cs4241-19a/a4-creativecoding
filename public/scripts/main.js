import GameManager from './gameManager.js';
import Knight from './characters/knight';

const knightImage = new Image();

const imageLoadPromise = new Promise( (resolve) => {
  knightImage.onload = function() {
    resolve();
  };
  knightImage.src = './img/knight.png';
});


const gameManager = GameManager.getInstance();

/**
 * this draws stuff to the screen.
 */
function draw() {
  gameManager.draw();
  window.requestAnimationFrame(draw);
}
console.log(gameManager._gameObjectList);
imageLoadPromise.then(()=>{
  gameManager.insertGameObject(new Knight(0, 0, knightImage));
  gameManager.insertGameObject(new Knight(13, 35, knightImage));

  window.requestAnimationFrame(draw);
});


// const warrior = {
//   height: 25,
//   width: 25,
//   x: 25,
//   y: 25,
//   texture: null,
//   draw: function() {
//     this.texture = new Image();
//     const that = this;
//     this.texture.onload = function() {
//       gameManager.getContext().
//           drawImage(that.texture, that.x, that.y, that.height, that.width);
//       console.log('loaded image');
//     };
//     this.texture.src = './img/bulbasaur.png';
//   },
// };
