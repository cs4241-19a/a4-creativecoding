import * as THREE from "three";

import { active_geometry, create_box, mid_splash, sin_curve_right, sin_curve_left, screen_filter } from "./shape_logic";


var camera, scene, renderer;
var geometry, material, mesh;

let camera_rotation_index = 0;
const camera_rotations = [0, -.05, 0, .05];

const listener = new THREE.AudioListener();
const sound = new THREE.Audio(listener);

init();
animate();

document.getElementById('loop').addEventListener('click', event => {
  console.log("playing");
  sound.play();
  const button = document.getElementById('loop');
  button.parentNode.removeChild(button);
});

/**
 * Keybinds for controlling visualizer (not case sensitive)
 * 
 * C - spawn new cube at a random location
 * X - spawn new ring traveling backwards
 * Z - spawn sin wave moving right
 * A - spawn sin wave moving left
 * S - spawn plane acting as a screen filter
 * D - cycle through camera rotation modes
 */
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
  case 67:{
    create_box();
    break;
  }
  case 88:{
    mid_splash();
    break;
  }
  case 90:{
    sin_curve_right();
    break;
  }
  case 65:{
    sin_curve_left();
    break;
  }
  case 83:{
    screen_filter();
    break;
  }
  case 68:{
    camera_rotation_index += 1;
    camera_rotation_index %= camera_rotations.length;
  }
  default:
    break;
  }
});

function init() {

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  camera.add(listener);

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth-30, window.innerHeight-30 );
  document.body.appendChild( renderer.domElement );

  // Set up the looping sample
  const audioLoader = new THREE.AudioLoader();
  audioLoader.crossOrigin = '';
  audioLoader.load("loop.mp3", function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.25);
  });
}

function animate() {

  requestAnimationFrame( animate );

  camera.rotation.z += camera_rotations[camera_rotation_index];

  renderer.render( scene, camera );
  let beep = active_geometry;
  active_geometry.forEach(managed_object => {
    managed_object.material.opacity -= managed_object.fade_rate;
    (managed_object.on_tick)();
    if (managed_object.material.opacity < 0) {
      scene.remove(managed_object.mesh);
      managed_object.material.dispose();
      managed_object.geometry.dispose();
    }
  })

}

export {scene}