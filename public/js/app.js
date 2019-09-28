import * as THREE from "three";

import { active_geometry, create_box, mid_splash, sin_curve_right, sin_curve_left } from "./shape_logic";


var camera, scene, renderer;
var geometry, material, mesh;

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
  default:
    break;
  }
});

function init() {

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
  camera.position.z = 1;

  camera.add(listener);

  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh( geometry, material );
  //scene.add( mesh );

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

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

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