/* I had to disable four modules of eslint in this file.
   First, no-undef is disabled because THREE is undefined in this file, and any attempts to
   "import * as THREE from './build/three.js'" caused my program to stop working.
   I talked to Noelle about this, and she did not know how to resolve it.
   To make my life easier, I disabled the eslint module.
   Secondly, no-param-reassign is disabled because of my scene.traverse() inside animate().
   I don't know a way to do this that doesn't involve assigning parts of the parameter.
   Thirdly, import/extensions are disabled because I couldn't get Express to find
   './modules/thousandCubes' and './modules/gui', and simply got 404 errors when
   I attempted to access them.
   Finally, no-use-before-define is disabled for a single line inside help()
   because help() and hideHelp() reference each other and I couldn't find a way
   around that. Please feel free to re-enable all of eslint to check what fails.
*/

/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */

import { thousandCubes } from './modules/thousandCubes.js';
import { gui, guiControls } from './modules/gui.js';

let audioAnalyser;
let frequencyBinCount;
let rotationDivisor = 3000;
let color = 0;

const music = document.getElementById('music');
const defaultColor = 0x000000;
const spotLightColor = 0xffffff;
const scene = new THREE.Scene();
const spotLight = new THREE.SpotLight(spotLightColor);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer();

const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const helpBtn = document.getElementById('helpBtn');
const helpMenu = document.getElementById('helpMenu');
const colorBtn = document.getElementById('colorBtn');

const play = function () {
  helpMenu.style.display = 'none';
  colorBtn.style.display = 'block';

  music.play();
  pauseBtn.disabled = false;
  stopBtn.disabled = false;
  playBtn.disabled = true;
  helpBtn.disabled = false;
};

const pause = function () {
  music.pause();
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  playBtn.disabled = false;
  colorBtn.style.display = 'none';
};

const stop = function () {
  music.pause();
  music.currentTime = 0;
  pauseBtn.disabled = true;
  stopBtn.disabled = true;
  playBtn.disabled = false;
  colorBtn.style.display = 'none';
};

const help = function () {
  helpMenu.style.display = 'block';
  // eslint-disable-next-line no-use-before-define
  helpBtn.onclick = hideHelp;
  helpBtn.innerHTML = 'Hide';
};


const hideHelp = function () {
  helpMenu.style.display = 'none';
  helpBtn.onclick = help;
  helpBtn.innerHTML = 'Help';
};

const changeColor = function () {
  color = (color + 1) % 3;
};

const animate = function () {
  requestAnimationFrame(animate);
  audioAnalyser.getByteFrequencyData(frequencyBinCount);

  scene.traverse((thing) => {
    if (thing instanceof THREE.Mesh) {
      const rotationFactor = frequencyBinCount[50] / rotationDivisor;
      thing.rotation.x += rotationFactor;
      thing.rotation.y += rotationFactor;
      thing.rotation.z += rotationFactor;

      const newColor = frequencyBinCount[thing.id] / 300;
      if (color === 0) {
        thing.material.color.setRGB(0.05, 0.05, newColor);
      } else if (color === 1) {
        thing.material.color.setRGB(0.05, newColor, 0.05);
      } else if (color === 2) {
        thing.material.color.setRGB(newColor, 0.05, 0.05);
      }
    }
  });

  renderer.render(scene, camera);
};

const initPlay = function () {
  helpMenu.style.display = 'none';
  colorBtn.style.display = 'block';

  const audioContext = new AudioContext();
  audioAnalyser = audioContext.createAnalyser();
  frequencyBinCount = new Uint8Array(audioAnalyser.frequencyBinCount);
  const mediaElementSource = audioContext.createMediaElementSource(music);
  mediaElementSource.connect(audioAnalyser);
  mediaElementSource.connect(audioContext.destination);

  for (let i = 0; i < thousandCubes.length; i += 1) {
    scene.add(thousandCubes[i]);
  }

  renderer.setClearColor(defaultColor);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  gui.add(guiControls, 'cameraXPos', 0, 150).onChange((num) => { camera.position.x = num; });
  gui.add(guiControls, 'cameraYPos', 0, 150).onChange((num) => { camera.position.y = num; });
  gui.add(guiControls, 'cameraZPos', 0, 150).onChange((num) => { camera.position.z = num; });
  gui.add(guiControls, 'cameraZoom', 0.1, 2).onChange((num) => {
    camera.zoom = num;
    camera.updateProjectionMatrix();
  });
  gui.add(guiControls, 'spotLightIntensity', 0, 20).onChange((num) => { spotLight.intensity = num; });
  gui.add(guiControls, 'spotLightDecay', 0, 10).onChange((num) => { spotLight.decay = num; });
  gui.add(guiControls, 'rotationDivisor', 100, 10000).onChange((num) => { rotationDivisor = num; });

  gui.close();

  camera.position.set(50, 50, 50);
  camera.lookAt(scene.position);

  spotLight.intensity = 5;
  spotLight.distance = 1000;
  spotLight.position.set(100, 100, 100);
  scene.add(spotLight);

  animate();

  music.play();

  pauseBtn.disabled = false;
  stopBtn.disabled = false;
  playBtn.disabled = true;
  helpBtn.disabled = false;

  playBtn.onclick = play;
};

playBtn.onclick = initPlay;
pauseBtn.onclick = pause;
pauseBtn.disabled = true;
stopBtn.onclick = stop;
stopBtn.disabled = true;
helpBtn.onclick = help;
helpBtn.disabled = true;
colorBtn.onclick = changeColor;
