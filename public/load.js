// const THREE = require('three')
// const MTLLoader = require('three-mtl-loader'); // third-party npm module
// const OBJLoader = require('three-obj-loader');
// OBJLoader(THREE);

// //import * as THREE from 'three';

// const orbitControls = function (controls) {
//     controls.enableDamping = true;
//     controls.campingFactor = 0.25
//     controls.enableZoom = true;
// }

// const lighting = function (scene) {
//     var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
//     keyLight.position.set(-100, 0, 100);

//     var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
//     fillLight.position.set(100, 0, 100);

//     var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
//     backLight.position.set(100, 0, -100).normalize();

//     scene.add(keyLight);
//     scene.add(fillLight);
//     scene.add(backLight);
// }

// // material loader for the object
// const mtl = function (scene) {
//     const mtlLoader = new MTLLoader();
//     mtlLoader.setTexturePath('/assets/');
//     mtlLoader.setPath('/assets/');
//     mtlLoader.load('fox.mtl', function (materials) {

//         materials.preload();

//         var objLoader = new THREE.OBJLoader();
//         objLoader.setMaterials(materials);
//         objLoader.setPath('/assets/');
//         objLoader.load('fox.obj', function (o) {
//             o.position.y -= 60;
//             scene.add(o);
//         });
//     });
//     // scroll limitations...
// }

// exports.orbitControls = orbitControls
// exports.lighting = lighting
// exports.mtl = mtl
// //exports.animate = animate