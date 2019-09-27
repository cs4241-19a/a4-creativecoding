import * as datg from './datgui.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

//lighting
var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/assets/');
mtlLoader.setPath('/assets/');
mtlLoader.load('mario.mtl', function (materials) {

	materials.preload();

	var objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('/assets/');
	objLoader.load('mario.obj', function (object) {

		scene.add(object);
		object.position.y -= 60;

	});

});

var animate = function () {
	requestAnimationFrame(animate);

	controls.update();

	renderer.render(scene, camera);
};

animate();

window.onload = function () {

	datg.showGui()

	const instructions = document.getElementById('instructions')

	const question = document.getElementById('question')
	question.onclick = function () {
		instructions.classList.add('active');
	}

	document.querySelectorAll('.close-modal').forEach(item => {
		item.addEventListener('click', event => {
			instructions.classList.remove('active');
		})
	})

}