import * as THREE from "three";

import { active_geometry } from "./shape_logic";
import { random_range } from "./utils";


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
 */
document.addEventListener("keydown", event => {
  switch (event.keyCode) {
  case 67:{
    console.log("pressed c");
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshNormalMaterial();
    material.transparent = true;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(random_range(-1, 1), random_range(-1, 1), 0);
    active_geometry.push({
      geometry: geometry,
      material: material,
      mesh: mesh,
      fade_rate: 0.05,
      on_tick: function(){
        //console.log("tick");
      },
    });
    scene.add(mesh);
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
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
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
      managed_object.material.opacity = null;
      scene.remove(managed_object.mesh);
      //active_geometry.splice(active_geometry.indexOf(this));
    }
  })

}

export {scene}