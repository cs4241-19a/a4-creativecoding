//based on this js example: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
const THREE = require('three')
const dat = require('dat.gui')

//need to declare these variables globally 
//creating a scene 
var scene;
var camera;
var renderer;
//the cube
var geometry;
var material;
var cube;
//dat.gui
var text;
var gui;

window.onload  = function(){
    //Creating a Scene 
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 
        0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //the cube 
    /*
    geometry = new THREE.BoxGeometry(1,1,1);
    material = new THREE.MeshBasicMaterial(
        {color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;
    */
    
	//gui 
	text = new FizzyText();
	gui = new dat.GUI();
	gui.add(text,'message');
	gui.add(text, 'speed', -5,5);
	gui.add(text, 'displayOutline');
	//gui.add(text, 'explode');

    //animation
    //animate();
}

//render/animation loop 
function animate(){
	requestAnimationFrame(animate);
	//animating the cube 
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

//dat.gui example 
var FizzyText = function(){
	this.message = 'dat.gui';
	this.speed = 0.8;
	this.displayOutline = false;
	//this.explode = function();
}



