/* global THREE, svgRenderer */

var camera, scene, renderer;
var geometry_circle, material_circle, mesh_circle;
var geometry_cube, material_cube, mesh_cube;

init();
animate();

// initialize javascript scene
function init() {

    camera = new THREE.PerspectiveCamera(5000, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.z = 50;

    scene = new THREE.Scene();

    // make circle
    geometry_circle = new THREE.CircleGeometry(5, 32, 0, 6.3);
    material_circle = new THREE.MeshBasicMaterial({ color: 0x1f11f1, wireframe: true });
    mesh_circle = new THREE.Mesh(geometry_circle, material_circle);
    scene.add(mesh_circle);
  
    // make cube
    geometry_cube = new THREE.BoxGeometry(500, 500, 500);
    material_cube = new THREE.MeshBasicMaterial({
        color: 0x1f11f1, // blue
        wireframe: true
    });

    mesh_cube = new THREE.Mesh(geometry_cube, material_cube);
    scene.add(mesh_cube);
  
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);

    var button = document.getElementById("convert");
    button.addEventListener('click', svgSnapshot, false);
  
    document.body.appendChild(renderer.domElement);

}

// rotate the circle and the cube
function animate() {

    requestAnimationFrame(animate);

    mesh_circle.rotation.x += 0.01;
    mesh_circle.rotation.y += 0.02;
  
    mesh_cube.rotation.x += 0.01;
    mesh_cube.rotation.y += 0.02;

    renderer.render(scene, camera);

}

function removeChildrenFromNode(node) {
	var fc = node.firstChild;

	while( fc ) {
		node.removeChild( fc );
		fc = node.firstChild;
	}
}

// make render of the elements
function svgSnapshot() {
	var svgContainer = document.getElementById("svg");
	removeChildrenFromNode(svgContainer);
	svgRenderer = new THREE.SVGRenderer();
	svgRenderer.setClearColor( 0xfffff );
	svgRenderer.setSize(800,800);
	svgRenderer.setQuality( 'high' );
	svgContainer.appendChild( svgRenderer.domElement );
	svgRenderer.render( scene, camera );
	svgRenderer.domElement.removeAttribute("width");
	svgRenderer.domElement.removeAttribute("height");

  var url = "data:image/svg+xml;utf8," + encodeURIComponent(document.getElementById('svg').innerHTML);
  var link = document.getElementById("downloadFile");
  link.download = "threejs-example.svg";
  link.href = url;
  link.click();
}