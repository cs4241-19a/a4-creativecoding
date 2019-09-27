/* eslint-env es6 */
/* eslint-enable */

let level;

/**
 * Generates a game level and returns it
 * @return {level} the game level
 */
function generateLevel() {
  level = {
    speed: 1,
    score: 0,
  };
  return getLevel();
}

/**
 * Returns the game level
 * @return {level} the game level
 */
function getLevel() {
  return level;
}

/**
 * Change an attribute of the level to a value
 * @param {number} attrib attribute to change
 * @param {value} value value to change to
 */
function changeLevel(attrib, value) {
  if (attrib == 'score') {
    changeScore(value);
  } else if (attrib == 'speed') {
    changeSpeed(value);
  }
}

/**
 * Change score
 * @param {number} value
 */
function changeScore(value) {
  level.score += value;
}

/**
 * Change level speed
 * @param {string} value
 */
function changeSpeed(value) {
  level.speed += value;
}

module.exports = {generateLevel, getLevel, changeLevel};
