import Stats from './stats.module.js';
import dat from './dat.gui.min.js';

// lights
let options = {
  color: '0xFFFFFF',
  radius: 500,
  rotation: 5,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  
  reset: function(){
    this.radius = 500;
    this.rotation = 5;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
  }
};

var palette = {
  background: '#FFFFFF', // CSS string
  lightColor1: '#FF0000', // RGB array
  color3: '#FF0000', // RGB 
  color4: '#FF0000', // RGB 
};

var light1;
var light2;
var light3;
var light4;
var container, stats;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 500, theta = 0;
var frustumSize = 1000;
init();
animate();

function init() {

  container = document.getElementById('container');
  document.body.appendChild( container );
  var aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
  scene = new THREE.Scene();

  scene.background = new THREE.Color( 0xf0f0f0 );
  
  
      
  light1 = new THREE.DirectionalLight( 0xFFFFFF, 1 );
  light2 = new THREE.DirectionalLight( 0xFF0000, 1 );
  light3 = new THREE.DirectionalLight( 0x00FF00, 1 );
  light4 = new THREE.DirectionalLight( 0x0000FF, 1 );
  
  light1.position.set( 1, 1, 1 ).normalize();
  light2.position.set( 200, 0, 0 ).normalize();
  light3.position.set( 0, 2, 0 ).normalize();
  light4.position.set( 0, 0, 2 ).normalize();
  scene.add( light1 );
  scene.add( light2 );
  scene.add( light3 );
  scene.add( light4 );

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

  for ( var i = 0; i < 2000; i ++ ) {
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
    object.position.x = Math.random() * 800 - 400;
    object.position.y = Math.random() * 800 - 400;
    object.position.z = Math.random() * 800 - 400;
    object.rotation.x = Math.random() * 2 * Math.PI;
    object.rotation.y = Math.random() * 2 * Math.PI;
    object.rotation.z = Math.random() * 2 * Math.PI;
    object.scale.x = Math.random() + 0.5;
    object.scale.y = Math.random() + 0.5;
    object.scale.z = Math.random() + 0.5;
    scene.add( object );
  }

  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  stats = new Stats();
  container.appendChild( stats.dom );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //
  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  var aspect = window.innerWidth / window.innerHeight;
  camera.left = - frustumSize * aspect / 2;
  camera.right = frustumSize * aspect / 2;
  camera.top = frustumSize / 2;
  camera.bottom = - frustumSize / 2;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}




// animation
function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}

function render() {
  
  // options
  radius = options.radius;
  theta += 0.1 * options.rotation;
  scene.scale.x = options.scaleX;
  scene.scale.y = options.scaleY;
  scene.scale.z = options.scaleZ;
  scene.background = new THREE.Color( palette.background );
  
  
  
  camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  camera.lookAt( scene.position );
  camera.updateMatrixWorld();
  // find intersections
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );
  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );
    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }
  
  
  renderer.render( scene, camera );
}



// Dat.gui
const gui = new dat.GUI();



var opts = gui.addFolder('Options');
opts.addColor(palette, 'background');
opts.addColor(palette, 'lightColor1');
opts.add(options, 'radius', 1, 1000).listen();
opts.add(options, 'rotation', 0, 20).listen();
opts.add(options, 'scaleX', 1, 5).listen();
opts.add(options, 'scaleY', 1, 5).listen();
opts.add(options, 'scaleZ', 1, 5).listen();
opts.open();


gui.add(options, 'reset');
