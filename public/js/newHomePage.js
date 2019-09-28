// setup the control gui
// once everything is loaded, we run our Three.js stuff.
let scene, camera, webGLRenderer;
let canDismiss = false;
let blocked = false;

//what to run as soon as window loads
window.onload = function () {
    init();
    typeIt();
};

//listeners
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener("click", function() {
    console.log("dismiss called with canDismiss and blocked val", canDismiss, blocked);
    if (canDismiss === true) {
        document.getElementById("typed").innerText = "";
        document.getElementById("typed").innerHTML = "";
        canDismiss = false
    }
});
document.getElementById("helpContainer").addEventListener("click", function(){
    if (canDismiss === false && blocked === false){
        typeIt()
    }
});



//function that initializes everything
function init() {
    // create a scene
    scene = new THREE.Scene();
    // create a camera and assign vertical field of view, aspect ratio, and near and far planes
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a webgl render and set the size
    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    // position and point the camera to the center of the scene
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 70;
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    // add the output of the renderer to the html element
    document.getElementById("titleCanvas").append(webGLRenderer.domElement);

    let step = 0; //for keeping track of rotation
    let knot; //the object being viewed
    //initiate the characteristics of the created object
    let controls = new function () {
        this.radius = 30;
        this.tube = 28.2;
        this.radialSegments = 400;
        this.tubularSegments = 30;
        this.p = 6;
        this.q = 5;
        this.heightScale = 4;
        this.asParticles = true;
        this.rotate = true;

        //to update the parameters for characteristics
        this.redraw = function () {
            // remove the old plane
            if (knot) scene.remove(knot);
            // create a new one using torus knot geometry
            let geom = new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q), controls.heightScale);
            if (controls.asParticles) {
                knot = createParticleSystem(geom);
            } else {
                knot = createMesh(geom);
            }
            // add it to the scene.
            scene.add(knot);
        };
    };


    //generate controls box on the gui that for every changed attribute calls the redraw function
    let gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
    gui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
    gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
    gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);
    gui.add(controls, 'heightScale', 0, 5).onChange(controls.redraw);
    gui.add(controls, 'asParticles').onChange(controls.redraw);
    gui.add(controls, 'rotate').onChange(controls.redraw);
    gui.close();
    controls.redraw();
    render();

    // from THREE.js examples
    function generateSprite() {
        let canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        let context = canvas.getContext('2d');
        let gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgb(0,5,255)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        let texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    //controls the interval of rotation of the object
    setInterval(function(){
            if (controls.radius < 80 && controls.tubularSegments > 12) {
                controls.radius += 0.5
                controls.tubularSegments -= 1
            }
                // remove the old plane
                if (knot) {scene.remove(knot);}
                // create a new one
                let geom = new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q), controls.heightScale);
                if (controls.asParticles) {
                    knot = createParticleSystem(geom);
                } else {
                    knot = createMesh(geom);
                }
                scene.add(knot);
            }
        , 10);

    //creating point cloud system given the geometry and material
    function createParticleSystem(geom) {
        //creating material with attributes
        let material = new THREE.PointCloudMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending, //necessary for realistic points
            map: generateSprite()
        });
        return new THREE.PointCloud(geom, material);;
    }

    //creating mesh and adding materials to it
    function createMesh(geom) {
        // assign two materials
        let meshMaterial = new THREE.MeshNormalMaterial({});
        // creates object that is composed of a lot of other objects
        let mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);
        return mesh;
    }


    function render() {
        if (controls.rotate) {
            knot.rotation.y = step += 0.003; //rotation speed
        }
        // render using requestAnimationFrame
        requestAnimationFrame(render);
        webGLRenderer.render(scene, camera);
    }
};


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    webGLRenderer.setSize( window.innerWidth, window.innerHeight );
}


function onMouseMove(event) {
    let mouseX = event.clientX - window.innerWidth / 2;
    let mouseY = event.clientY - window.innerHeight / 2;
    camera.position.x += (mouseX - camera.position.x) * 0.005;
    camera.position.y += (mouseY - camera.position.y) * 0.005;
    //set up camera position
    camera.lookAt(scene.position);
};



//function to type help text
function typeIt(){
    blocked = true;
    //remove previous instance of this in case user wants to see help again, so no two instances of it run at the same time
    let helpContainer = document.getElementById("helpContainer");
    helpContainer.innerText = "";
    helpContainer.innerHTML = "null";
    helpContainer.innerHTML = "<span id='typed'></span>"
    helpContainer.addEventListener("click", function(){
        if(canDismiss===false && blocked === false){ typeIt() }
    });
    new Typed('#typed', {
        strings: ["Here, let me help you navigate this site.",
            "If you scroll down, you will find some cards. ",
            "Click on one of them to see a visualization of some sort.",
            "Click the back button to go back.",
            "Also, check out the controls on this background, they're pretty cool.",
            "Have fun!",
            "Click anywhere to dismiss me,",
            "And click here again to read this again."
        ],
        typeSpeed: 1,
        onComplete: (self) => { typeCompleted() }
    })
}

//change vars when typed finishes
function typeCompleted(){
    canDismiss = true;
    blocked = false;
}




//in case I decide to bring back stats
// stats = initStats(); //stats box on the top left corner

//intialize stats box on top left
// function initStats() {
//     let stats = new Stats();
//     stats.setMode(0);
//
//     // Align top-left
//     stats.domElement.style.position = 'absolute';
//     stats.domElement.style.left = '0px';
//     stats.domElement.style.top = '0px';
//
//     //append to html doc
//     document.getElementById("statsOutput").append(stats.domElement);
//     return stats;
// }
