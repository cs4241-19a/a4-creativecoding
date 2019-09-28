/* global THREE */

var  camera, scene, renderer,geometry, material, mesh;
var shape = document.getElementById("shape");
var tempSize = document.getElementById("sizeRange");
var pic = document.getElementById("pic").value;
var tempXPos = document.getElementById("xPos");
var tempYPos = document.getElementById("yPos");
var size = tempSize.value;
var xPos = tempXPos.value;
var yPos = tempYPos.value;

export function create() {
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
init(parseFloat(shape.value), parseFloat(tempSize.value), pic, parseFloat(size), parseFloat(xPos), parseFloat(yPos)); 
// animate();
}


var camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
//init(parseFloat(shape.value), parseFloat(tempSize.value), pic, parseFloat(size), parseFloat(xPos), parseFloat(yPos));
//animate();

function init(shape, tempSize, pic, size, xPos, yPos) {
  console.log(shape, tempSize, pic, size, xPos, yPos);
	camera.position.z = 6 - size;

	scene = new THREE.Scene();
  if(shape === 0){
    geometry = new THREE.SphereGeometry( 0.4, 32, 32);

  }
  else if(shape === 3){
    geometry = new THREE.TetrahedronGeometry(0.5,0);
  }
  else if(shape === 4){
	  geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
  }
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
  
  
  mesh.position.x = xPos;
  mesh.position.y = yPos;
  
  
 var loader = new THREE.TextureLoader();
  // https://images.pexels.com/photos/1205301/pexels-photo-1205301.jpeg
loader.load(pic , function(texture)
            {
             scene.background = texture;  
            });
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.removeChild(document.body.lastChild);
  document.body.appendChild(renderer.domElement);
  
  animate();
}
 

function animate() {

	requestAnimationFrame( animate );
  var xrotSpeed = document.getElementById("xspeedRange").value / 1000;
  var yrotSpeed = document.getElementById("yspeedRange").value / 1000;
  var zrotSpeed = document.getElementById("zspeedRange").value / 1000;
  
	mesh.rotation.x += parseFloat(xrotSpeed);
	mesh.rotation.y += parseFloat(yrotSpeed);
  mesh.rotation.z += parseFloat(zrotSpeed);

	renderer.render( scene, camera );
}