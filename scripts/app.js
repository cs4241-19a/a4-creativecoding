/* eslint-env es6 */
/* eslint-enable */

const THREE = require('three');
const char = require('char');
const game = require('game');

let character; let level;

let camera; let scene; let renderer; let canvas;
const charShapes = {
  head: {},
  body: {},
  leftarm: {},
  rightarm: {},
};
const materials = {
  head: {},
  body: {},
  arms: {},
};
let animateDirection = 1; const animateSpeed = 0.0005;

/**
 * Initialize the application: scene, camera, renderer, etc.
 * Initialize animation and create character
 */
function init() {
  canvas = document.getElementById('character-creation');
  camera = new THREE.PerspectiveCamera(
      60, canvas.clientWidth / canvas.clientHeight, 0.01, 10 );
  camera.position.z = 1;
  camera.position.y = 0.8;
  camera.position.x = -0.8;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer( {antialias: true} );
  renderer.setClearColor('#000000');
  renderer.setSize( canvas.clientWidth, canvas.clientHeight );
  canvas.appendChild( renderer.domElement );

  newCharacter();
  animate();
}

/**
 * Determine the average third dimentional position of a mesh using
 * the array of vertices
 * @param {array} verts
 * @return {object} current average x,y,z position of the mesh
 */
function averagePos(verts) {
  let sumX = 0; let sumY = 0; let sumZ = 0;
  for (let i = 0; i < verts.length; i++) {
    sumX += verts[i].x;
    sumY += verts[i].y;
    sumZ += verts[i].z;
  }
  return {
    x: sumX / verts.length,
    y: sumY / verts.length,
    z: sumZ / verts.length,
  };
}

/**
 * Adjust meshes in the scene accordingly by animation frame.
 */
function animate() {
  requestAnimationFrame( animate );

  const headPos = averagePos(charShapes.head.vertices);
  charShapes.head.rotateY(0.01);
  if (animateDirection) {
    charShapes.head.translate(0, animateSpeed, 0);
    charShapes.body.translate(0, animateSpeed-0.0003, 0);
    charShapes.leftarm.translate(animateSpeed, animateSpeed-0.0002, 0);
    charShapes.rightarm.translate(-animateSpeed, animateSpeed-0.0002, 0);
    charShapes.leftarm.rotateZ(animateSpeed+0.0004);
    charShapes.rightarm.rotateZ(-(animateSpeed+0.0004));
    if (headPos.y > character.height/2+0.18) {
      animateDirection = 0;
    }
  } else if (!animateDirection) {
    charShapes.head.translate(0, -animateSpeed, 0);
    charShapes.body.translate(0, -(animateSpeed-0.0003), 0);
    charShapes.leftarm.translate(-animateSpeed, -(animateSpeed-0.0002), 0);
    charShapes.rightarm.translate(animateSpeed, -(animateSpeed-0.0002), 0);
    charShapes.leftarm.rotateZ(-(animateSpeed+0.0004));
    charShapes.rightarm.rotateZ(animateSpeed+0.0004);
    if (headPos.y < character.height/2+0.15) {
      animateDirection = 1;
    }
  }

  renderer.render( scene, camera );
}

/**
 * Create new character
 */
function newCharacter() {
  character = char.generateCharacter();
  updateCharacter();
}

/**
 * Resets all meshes and lights in the scene
 * Re-generates meshes based on user input
 */
function updateCharacter() {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
  const spot = new THREE.PointLight('#FFFFFF', 1, 1);
  spot.position.set(-0.5, 0.5, 0.5);
  scene.add(new THREE.AmbientLight('#FFFFFF', 0.5));
  scene.add(spot);
  switch (character.head.type) {
    case 0:
      charShapes.head = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      charShapes.head.translate(0, 5000, 0);
      break;
    case 1:
      charShapes.head = new THREE.TetrahedronGeometry(0.15, 0);
      charShapes.head.translate(0, character.height/2+0.15, 0);
      break;
    case 2:
      charShapes.head = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      charShapes.head.translate(0, character.height/2+0.15, 0);
      break;
    case 3:
      charShapes.head = new THREE.OctahedronGeometry(0.15, 0);
      charShapes.head.translate(0, character.height/2+0.15, 0);
      break;
    case 4:
      charShapes.head = new THREE.IcosahedronGeometry(0.15, 0);
      charShapes.head.translate(0, character.height/2+0.15, 0);
      break;
    case 5:
      charShapes.head = new THREE.DodecahedronGeometry(0.15, 0);
      charShapes.head.translate(0, character.height/2+0.15, 0);
      break;
    case 6:
      charShapes.head = new THREE.SphereGeometry(0.15);
      charShapes.head.translate(0, character.height/2+0.15, 0);
      break;
  }

  charShapes.body = new THREE.BoxGeometry(
      character.width, character.height, 0.13);

  charShapes.leftarm = new THREE.BoxGeometry(
      character.width/4+0.05, character.height/2+0.1, 0.1);
  charShapes.leftarm.translate(
      character.width/3+0.1, character.height/8+0.01, 0);

  charShapes.rightarm = new THREE.BoxGeometry(
      character.width/4+0.05, character.height/2+0.1, 0.1);
  charShapes.rightarm.translate(
      -(character.width/3+0.1), character.height/8+0.01, 0);

  materials.head = new THREE.MeshLambertMaterial({
    color: character.head.color,
  });
  materials.body = new THREE.MeshLambertMaterial({
    color: character.body.color,
  });
  materials.arms = new THREE.MeshLambertMaterial({
    color: character.arms.color,
  });

  scene.add(new THREE.Mesh(charShapes.head, materials.head));
  scene.add(new THREE.Mesh(charShapes.body, materials.body));
  scene.add(new THREE.Mesh(charShapes.leftarm, materials.arms));
  scene.add(new THREE.Mesh(charShapes.rightarm, materials.arms));

  camera.lookAt(new THREE.Vector3(0, character.height/2, 0));
}

/**
 * Handles events created by user input
 * @param {event} e
 */
function handleChange(e) {
  const attrib = e.id.substring(e.id.indexOf('-')+1);
  const value = e.value;
  char.changeCharacter(attrib, value);
  character = char.getCharacter();
  updateCharacter();
}

/**
 * Create new level
 */
function newLevel() {
  level = game.generateLevel();
  console.log(level);
}

module.exports = {handleChange, init};
