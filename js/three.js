//based on this js example: https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
const THREE = require('three')


window.onload  = function(){
    //Creating a Scene 
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 
        0.1, 1000);

    var renderer = new THREE.WebGLRenederer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //the cube 
    var geometry = new THREE.BoxGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial(
        {color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    //animation
    animate();
}

//render/animation loop 
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}



