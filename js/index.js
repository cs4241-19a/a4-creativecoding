//based on an example found here: https://codepen.io/programking/pen/MyOQpO
const THREE = require('three');
const dat = require('dat.gui');

//need to declare these variables globally 
//creating a scene 
var scene, camera, renderer;
//the cube
var geometry, material;
//gui stuff 
var options, gui;
//things on menu
var cam, velocity, box;


window.onload  = function(){
    //Creating a Scene 
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 
        0.1, 1000);
    camera.position.z = 75;
    camera.position.x = 50;
    camera.position.y = 50;
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();

    //rendering 
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //the cube 
    geometry = new THREE.BoxGeometry(5,5,5,5,5,5);
    material = new THREE.MeshBasicMaterial(
        {opacity: 0.1,
        blending: THREE.NormalBlending,
        depthTest: true});
    
        cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
        
    //options for menu
    options = {
        velx: 0,
        vely: 0,
        camera: {
          speed: 0.0001
        },
        stop: function() {
          this.velx = 0;
          this.vely = 0;
        },
        reset: function() {
          this.velx = 0.1;
          this.vely = 0.1;
          camera.position.z = 75;
          camera.position.x = 0;
          camera.position.y = 0;
          cube.scale.x = 1;
          cube.scale.y = 1;
          cube.scale.z = 1;
          cube.material.wireframe = true;
        }
      };
      
    //setting up gui
    gui = new dat.GUI();

    //setting up menu
    cam = gui.addFolder('Camera');
    cam.add(options.camera, 'speed', 0, 0.0010).listen();
    cam.add(camera.position, 'y', 0, 100).listen();
    cam.open();

    velocity = gui.addFolder('Velocity');
    velocity.add(options, 'velx', -0.2, 0.2).name('X').listen();
    velocity.add(options, 'vely', -0.2, 0.2).name('Y').listen();
    velocity.open();

    box = gui.addFolder('Cube');
    box.add(cube.scale, 'x', 0, 3).name('Width').listen();
    box.add(cube.scale, 'y', 0, 3).name('Height').listen();
    box.add(cube.scale, 'z', 0, 3).name('Length').listen();
    box.add(cube.material, 'wireframe').listen();
    box.open();

    gui.add(options, 'stop');
    gui.add(options, 'reset');

    //animation 
    render();
}

//cube animation
var render = function() {

    requestAnimationFrame(render);
  
    var timer = Date.now() * options.camera.speed;
    camera.position.x = Math.cos(timer) * 100;
    camera.position.z = Math.sin(timer) * 100;
    camera.lookAt(scene.position); 
    camera.updateMatrixWorld();
  
    cube.rotation.x += options.velx;
    cube.rotation.y += options.vely;
  
    renderer.render(scene, camera);
  
  };