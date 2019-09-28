const THREE = require('three');
const dat = require('dat.gui');
const OrbitControls = require('three-orbitcontrols');
const GLTFLoader = require('three-gltf-loader');
//const babelify = require("babelify");
//browserify().transform(babelify, {presets: ["@babel/preset-env", "@babel/preset-react"]});

//ES6 
import{x,y,z} from './module1.js';
import{posx , posy, posz, intensity} from './light_module.js'

//need to declare these variables globally 
var scene, camera, renderer, controls;
var light, lightAmb;
var gui, loader, box, cam;


window.onload  = function(){
    //Creating a Scene 
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    camera = new THREE.PerspectiveCamera(
        44, window.innerWidth / window.innerHeight, 
        0.25, 20);
    camera.position.z = z;
    camera.position.x = x;
    camera.position.y = y;
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();

    //rendering 
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); //added 
    renderer.setClearColor( 0xffffff, 0);
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
    document.body.appendChild(renderer.domElement);
   
    renderer.gammaOutput = true;

    //controls 
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);

     //light
     light = new THREE.PointLight(0x16a183, 1, 100);
     light.position.set(posz,posx,posy);
     light.intensity = intensity;
     scene.add(light);

     lightAmb = new THREE.AmbientLight(0x777777);
     scene.add(lightAmb);
        
    //the 3d model 
   //manager = new THREE.LoadingManager(render);
    loader = new GLTFLoader();
  
    loader.load('/3dModel/Garza_Mesh.glb', (gltf) => {
        //mesh = gltf.scene;
        scene.add(gltf.scene);
        console.log("should be loaded");
        gltf.scene.scale.set(2,2,2);

  
    //setting up gui
    gui = new dat.GUI();
    
    //playing with mesh
    box = gui.addFolder('Mesh');
     box.add(gltf.scene.scale, 'x', 1, 10).name('Width').listen();
     box.add(gltf.scene.scale, 'y', 1, 10).name('Height').listen();
     box.add(gltf.scene.scale, 'z', 1, 10).name('Length').listen();
    box.open();
    //playing with camera 
    cam = gui.addFolder('Camera');
    cam.add(camera.position, 'x', 0, 10).name('X-Axis').listen();
    cam.add(camera.position, 'y', 0, 10).name('Y-Axis').listen();
    cam.add(camera.position, 'z', 0, 15).name('z-Axis').listen();
    cam.open();

   render();
   
    })
 
}

//cube animation
var render = function() {
    
    requestAnimationFrame(render);
    
    renderer.render(scene, camera);
  
  };


