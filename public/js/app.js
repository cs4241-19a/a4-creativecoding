

import * as THREE from "three";

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

}