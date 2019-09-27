// const THREE = require('three')
// const OrbitControls = require('three-orbit-controls')(THREE)

// const datg = require('./datgui')
// //const loader = require('./objLoad')

// // third-party npm module
// const MTLLoader = require('three-mtl-loader');
// const OBJLoader = require('three-obj-loader');

import * as THREE from './three'
import * as datg from './datgui.js';
//import * as loader from 'objLoader.js';
import * as OrbitControls from './three-orbit-controls';
import * as MTLLoader from './three-mtl-loader';
import * as OBJLoader from './three-obj-loader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement)

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// // controls
// loader.orbitControls(controls)

// // lighting
// loader.lighting(scene)

// //load model
// loader.mtl(scene)

controls.enableDamping = true;
controls.campingFactor = 0.25
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

// material loader for the object
const mtlLoader = new MTLLoader();
mtlLoader.setTexturePath('/assets/');
mtlLoader.setPath('/assets/');
mtlLoader.load('fox.mtl', function (materials) {

    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/assets/');
    objLoader.load('fox.obj', function (o) {
        o.position.y -= 60;
        scene.add(o);
    });
});
// scroll limitations...

const animate = function () {
    requestAnimationFrame(animate);

    controls.update()
    renderer.render(scene, camera);
}

//animate
animate();

window.onload = function () {
    // js for handling modal

    // set up dat.gui controls
    datg.showGui()

    //init the scene
    // init()
}