    // console.clear()
    //
    // let renderer, scene, camera, geometry, material, cube;
    //
    // //get our <DIV> container
    //
    // // Helper let which we will use as a additional correction coefficient for objects and camera
    // let distance = 400;
    // window.onload = function(){
    //     init()
    // }
    //
    // function init() {
    //     let container = document.getElementById('titleCanvas');
    //     //init render
    //     renderer = new THREE.WebGLRenderer({antialias: true});
    //     //render window size
    //     renderer.setSize(window.innerWidth, window.innerHeight);
    //     //background color
    //     renderer.setClearColor (0xff0000, 0.2);
    //     //append render to the <DIV> container
    //     container.appendChild(renderer.domElement);
    //
    //
    //     //init scene, camera and camera position
    //     scene = new THREE.Scene();
    //     camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
    //     //adding camera to the scene
    //     scene.add(camera);
    //
    //     //creating ojects to add to scene
    //     geometry = new THREE.BoxGeometry( 1, 1, 1 );
    //     material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    //     //generating a mesh cube with the given material
    //     cube = new THREE.Mesh( geometry, material );
    //     scene.add( cube );
    //     camera.position.z = 10;
    //     animate()
    //
    //
    //
    // }
    //
    // let animate = function () {
    //     console.log("animating")
    //     requestAnimationFrame( animate );
    //
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    //
    //     renderer.render( scene, camera );
    // };
    //
    //
    //
    //
    //
    // // window.onload = function () {
    // //     startThreeJs()
    // // }
    //
    // // function startThreeJs(){
    // //     //creating basic scene and adding camera to it
    // //     let scene = new THREE.Scene();
    // //     let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    // //     let renderer = new THREE.WebGLRenderer();
    // //     renderer.setSize( window.innerWidth, window.innerHeight );
    // //     document.body.appendChild( renderer.domElement );
    // //     //adding cube
    // //     let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // //     let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // //     let cube = new THREE.Mesh( geometry, material );
    // //     scene.add( cube );
    // //     camera.position.z = 5;
    // //     animate(scene, camera, renderer)
    // // }
    // //
    // // function animate(scene, camera, renderer) {
    // //     requestAnimationFrame(animate);
    // //     renderer.render(scene, camera)
    // // }