/* eslint-env es6 */
/* eslint-enable */

let char;

/**
 * Generate a character
 * @return {character} returns character
 */
function generateCharacter() {
  char = {
    height: 0.4,
    width: 0.2,
    head: {
      type: 2,
      color: '#'+Math.floor(Math.random()*16777215).toString(16),
    },
    body: {
      color: '#'+Math.floor(Math.random()*16777215).toString(16),
    },
    arms: {
      color: '#'+Math.floor(Math.random()*16777215).toString(16),
    },
  };
  return getCharacter();
}

/**
 * Get a character
 * @return {character} The character
 * TODO: interact with database to retrieve character with ID
 */
function getCharacter() {
  return char;
}

/**
 * Change a characters attribute with a value
 * @param {string} attrib The attribute of the character to be changed
 * @param {value} value The value to change to
 */
function changeCharacter(attrib, value) {
  if (attrib == 'height') {
    changeHeight(value);
  } else if (attrib == 'width') {
    changeWidth(value);
  } else if (attrib == 'head') {
    changeHead(value);
  } else if (attrib == 'headColor') {
    changeHeadColor(value);
  } else if (attrib == 'bodyColor') {
    changeBodyColor(value);
  } else if (attrib == 'armColor') {
    changeArmColor(value);
  }
}

/**
 * Change char height
 * @param {number} value
 */
function changeHeight(value) {
  char.height = parseFloat(value)*0.01;
}

/**
 * Change char width
 * @param {number} value
 */
function changeWidth(value) {
  char.width = parseFloat(value)*0.01;
}

/**
 * Change char head shape
 * @param {number} value
 */
function changeHead(value) {
  char.head.type = parseFloat(value);
}

/**
 * Change head color
 * @param {number} value
 */
function changeHeadColor(value) {
  char.head.color = value;
}

/**
 * Change Body color
 * @param {number} value
 */
function changeBodyColor(value) {
  char.body.color = value;
}

/**
 * Change Arm color
 * @param {number} value
 */
function changeArmColor(value) {
  char.arms.color = value;
}

module.exports = {generateCharacter, getCharacter, changeCharacter};
