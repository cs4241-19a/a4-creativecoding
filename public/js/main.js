import Stats from './stats.module.js';
import controls from './controls.js';
import {openGuide, closeGuide} from "./popup.js";

var camera, scene, renderer, stats, root;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var gui = new dat.GUI({ width: 250 });

document.getElementById('openButton').onclick = openGuide;
document.getElementById('guide').onclick = closeGuide;

init();
animate();

function init() {
    openGuide();
    gui.add(controls, 'boxSize', 0, 1000).step(50).listen().onChange( function() {
        geometry = new THREE.SphereBufferGeometry(controls.boxSize, controls.boxSize, controls.boxSize);
    } );
    gui.add(controls, 'color', ["Black: 0x000000", "Yellow: 0xffff00", "Red: 0xff0000", "White: 0xffffff"]).name('Color').listen().onChange( function() {
        scene.background = new THREE.Color(Number(controls.color.substring(controls.color.length - 8, controls.color.length)));
    } );
    gui.add(controls, 'dx', 0.0, 2.0).step(0.05).listen();
    gui.add(controls, 'dy', 0.0, 2.0).step(0.05).listen();
    gui.add(controls, 'dz', 0.0, 2.0).step(0.05).listen();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 15000);
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    var geometry = new THREE.SphereBufferGeometry(controls.boxSize, controls.boxSize, controls.boxSize);
    var material = new THREE.MeshNormalMaterial();

    root = new THREE.Mesh(geometry, material);
    root.position.x = 1000;
    scene.add(root);

    var amount = 200, object, parent = root;

    for (var i = 0; i < amount; i++) {
        object = new THREE.Mesh(geometry, material);
        object.position.x = 100;

        parent.add(object);
        parent = object;
    }
    parent = root;

    for (var i = 0; i < amount; i++) {
        object = new THREE.Mesh(geometry, material);
        object.position.x = -100;

        parent.add(object);
        parent = object;

    }
    parent = root;

    for (var i = 0; i < amount; i++) {
        object = new THREE.Mesh(geometry, material);
        object.position.y = -100;

        parent.add(object);
        parent = object;
    }
    parent = root;

    for (var i = 0; i < amount; i++) {
        object = new THREE.Mesh(geometry, material);
        object.position.y = 100;

        parent.add(object);
        parent = object;
    }
    parent = root;

    for (var i = 0; i < amount; i++) {
        object = new THREE.Mesh(geometry, material);
        object.position.z = -100;

        parent.add(object);
        parent = object;
    }
    parent = root;

    for (var i = 0; i < amount; i++) {
        object = new THREE.Mesh(geometry, material);
        object.position.z = 100;

        parent.add(object);
        parent = object;
    }

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;
}

function animate() {
    requestAnimationFrame( animate );
    render();
    stats.update();
}

function render() {
    var time = Date.now() * 0.001;

    var rx = Math.sin( time * 0.5 ) * controls.dx;
    var ry = Math.sin( time * 0.3 ) * controls.dy;
    var rz = Math.sin( time * 0.2 ) * controls.dz;

    camera.position.x += ( mouseX - camera.position.x ) * 0.01;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.01;

    camera.lookAt( scene.position );

    root.traverse( function ( object ) {
        object.rotation.x = rx;
        object.rotation.y = ry;
        object.rotation.z = rz;
    } );

    renderer.render( scene, camera );
}

