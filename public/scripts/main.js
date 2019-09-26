import GameManager from './gameManager.js';
import StateManager from './entities/stateManager';

// init stuff
const blueKnightImage = new Image();
const redKnightImage = new Image();

let gameManager = null;

document.addEventListener('DOMContentLoaded', function() {
  const ddelems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(ddelems);
});

const imageLoadPromise = new Promise( (resolve) => {
  let done = false;
  blueKnightImage.onload = function() {
    done = true;
  };
  redKnightImage.onload = function() {
    if (done) {
      resolve();
    }
  };
  blueKnightImage.src = './img/blue_knight.png';
  redKnightImage.src = './img/red_knight.png';
});

// create the game manager once the content is ready

imageLoadPromise.then(()=>{
  gameManager = GameManager.getInstance();
  // add the state manager to the gameManager
  gameManager
      .insertGameObject(new StateManager(blueKnightImage, redKnightImage));
  console.log(gameManager.gameObjects.length);
  window.requestAnimationFrame(draw);
});


/**
 * this draws stuff to the screen.
 */
function draw() {
  gameManager.draw();
  window.requestAnimationFrame(draw);
}

