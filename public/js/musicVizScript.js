window.onload = function () {
    vizInit()
}

let scene, camera, renderer, analyser, uniforms;
let file, fileLabel, mediaElement

//will get the submitted audio file, label it,
//after user submits the file
let vizInit = function (){
    file = document.getElementById("thefile");
    fileLabel = document.querySelector("label.file");
    mediaElement = document.getElementById("audio");


    //if the user changes the file
    file.onchange = function(){
        fileLabel.classList.add('normal');
        mediaElement.classList.add('active');
        let files = this.files;

        mediaElement.src = URL.createObjectURL(files[0]);
        mediaElement.load();
        mediaElement.play();
        //call the function that generates the graphics
        play();
    }
}


//what happens when the song starts playing
function play() {

    let fftSize = 512; //size of fourier transform

    let container = document.getElementById( 'out' );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff ); //sets color of canvas /border not the inside where the movement is happening
    renderer.setPixelRatio( window.devicePixelRatio );
    container.appendChild( renderer.domElement );

    scene = new THREE.Scene();
    camera = new THREE.Camera();

    let listener = new THREE.AudioListener();
    let audio = new THREE.Audio( listener );
    audio.setMediaElementSource( mediaElement );
    mediaElement.loop = false;
    analyser = new THREE.AudioAnalyser( audio, fftSize );

    //threejs frequency line
    uniforms = {
        tAudioData: { value: new THREE.DataTexture( analyser.data, fftSize / 2, 1, THREE.LuminanceFormat ) }
    };

    let freqLineMaterial = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: document.getElementById( 'vertexShader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

    freqLineMaterial.uniforms.diffuse = { type: "c", value: { r:255, g:124, b:54 } };

    //creating the plane and the mesh
    let freqLineGeometry = new THREE.PlaneBufferGeometry( 2,2 );
    let freqLineMesh = new THREE.Mesh( freqLineGeometry, freqLineMaterial );
    scene.add(freqLineMesh);


    //starting the animation
    window.addEventListener( 'resize', onResize, false );
    animate();
}

function animate() {
    requestAnimationFrame( animate );
    render();
}
function render() {
    analyser.getFrequencyData();
    uniforms.tAudioData.value.needsUpdate = true;
    renderer.render( scene, camera );
}

function onResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener( 'resize', onResize, false );







//CUBE CODE
// //creating cube for the background
// //1 unit for width, height, depth
// let cubeGeometry = new THREE.CubeGeometry(2,2,2);
//
// // each cube side gets another color
// let cubeMaterials = [
//     new THREE.MeshBasicMaterial({color:0x33AA55, transparent:true, opacity:0.8}),
//     new THREE.MeshBasicMaterial({color:0x55CC00, transparent:true, opacity:0.8}),
//     new THREE.MeshBasicMaterial({color:0x000000, transparent:true, opacity:0.8}),
//     new THREE.MeshBasicMaterial({color:0x000000, transparent:true, opacity:0.8}),
//     new THREE.MeshBasicMaterial({color:0x0000FF, transparent:true, opacity:0.8}),
//     new THREE.MeshBasicMaterial({color:0x5555AA, transparent:true, opacity:0.8}),
// ];
// // create a MeshFaceMaterial, allows cube to have different materials on each face
// let cubeMaterial = cubeMaterials;
// let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//
// cube.position.set(0,0,0);
// group.add( cube );
// group.add( freqLineMesh );
//
// cube.scale.x = 2.5; // SCALE
// cube.scale.y = 2.5; // SCALE
// cube.scale.z = 2.5; // SCALE



//
//
//
// function onDocumentMouseMove( event ) {
//     mouseX = event.clientX - window.innerWidth/2;
//     targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
// }
// function onDocumentMouseUp() {
//     document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//     document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//     document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
// }
// function onDocumentMouseOut() {
//     document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
//     document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
//     document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
// }
//
// function onDocumentMouseDown( event ) {
//     event.preventDefault();
//     document.addEventListener( 'mousemove', onDocumentMouseMove, false );
//     document.addEventListener( 'mouseup', onDocumentMouseUp, false );
//     document.addEventListener( 'mouseout', onDocumentMouseOut, false );
//     mouseXOnMouseDown = event.clientX - window.innerWidth/2;
//     targetRotationOnMouseDown = targetRotation;
// }