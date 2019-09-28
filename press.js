/*module.exports = {
  secondary: secondary()
};

import camera from "display.js";
import pointLight from "display.js";
import length from "display.js";
import renderer from "display.js";
import pressed from "display.js";
import modal from "display.js";
import render from "display.js";*/

function secondary() {
  var key = event.key || event.keyCode;
  console.log(key);

  if (key == 80) {
    pressed = !pressed;
  } else if (e.which == 87) {
    camera.position.y -= 1;
  } else if (e.which == 65) {
    camera.position.x += 1;
  } else if (e.which == 83) {
    camera.position.y += 1;
  } else if (e.which == 68) {
    camera.position.x -= 1;
  } else if (e.which == 90) {
    camera.position.z -= 1;
  } else if (e.which == 66) {
    camera.position.z += 1;
  } else if (e.which == 70) {
    pointLight.power += 2.5;
  } else if (e.which == 71) {
    pointLight.power -= 2.5;
  } else if (e.which == 78) {
    length += 10;
    renderer.setSize(length, length);
  } else if (e.which == 77) {
    length -= 10;
    renderer.setSize(length, length);
  } else if (e.which == 73) {
    modal.style.display = "block";
  }
}
