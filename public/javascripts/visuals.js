/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
function graphicsFunction() {
    const options = {
        rotateX: Math.PI / 180,
        rotateY: Math.PI / 180,
        rotateZ: Math.PI / 180,
        cubeSize: 10,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
        stepCounter: 0,
        shine: 100,
        animationSpeed: 2,
    };

    const app = {
        init() {
            //CREATE THE SCENE
            this.scene = new THREE.Scene();
            this.clock = new THREE.Clock(true);
            this.clock.start();
            this.timeElapsed = 0;
            //CREATE THE CAMERA
            this.camera = new THREE.PerspectiveCamera();
            this.camera.position.set(50, 30, 50);
            this.camera.lookAt(0, 0, 0);
            //this.camera = new THREE.OrthographicCamera();
            this.scene.add(this.camera);


            var listener = new THREE.AudioListener();
            var audioLoader = new THREE.AudioLoader();
            var sound = new THREE.Audio(listener);



            audioLoader.load("../images/rainbowRoad.mp3", function(buffer) {
                sound.setBuffer(buffer);
                sound.setLoop(true);
                sound.setVolume(0.5);
            });


            this.camera.add(listener);



            //CREATE THE RENDERER
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
            var temp = document.createElement("SPAN");
            temp.id = "threeConfig";
            document.body.appendChild(temp);
            document.getElementById("threeConfig").appendChild(this.renderer.domElement).id = "threeScene";

            this.createLights();
            //this.dodecahedron = this.createDodecahedron();
            this.cube = this.createCube();


            // ...the rare and elusive hard binding appears! but why?
            this.render = this.render.bind(this);
            this.render();

            gui.createGUI();


            // load a sound and set it as the Audio object's buffer

            var mainLoop = () => {

                requestAnimationFrame(mainLoop);

                if (this.clock.elapsedTime > options.animationSpeed) {
                    switch (options.stepCounter) {
                        case 0:
                            var mat = new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;
                            this.cube.material = mat;
                            options.stepCounter++;
                            break;
                        case 1:
                            var mat = new THREE.MeshPhongMaterial({ color: 0xFF7F00, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;

                            this.cube.material = mat;
                            options.stepCounter++;
                            break;
                        case 2:
                            var mat = new THREE.MeshPhongMaterial({ color: 0xFFFF00, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;
                            this.cube.material = mat;
                            options.stepCounter++;
                            break;
                        case 3:
                            var mat = new THREE.MeshPhongMaterial({ color: 0x00FF00, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;
                            this.cube.material = mat;
                            options.stepCounter++;
                            break;
                        case 4:
                            var mat = new THREE.MeshPhongMaterial({ color: 0x0000FF, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;
                            this.cube.material = mat;
                            options.stepCounter++;
                            break;
                        case 5:
                            var mat = new THREE.MeshPhongMaterial({ color: 0x4B0082, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;
                            this.cube.material = mat;
                            options.stepCounter++;
                            break;
                        case 6:
                            var mat = new THREE.MeshPhongMaterial({ color: 0x8B00FF, shininess: options.shine, vertexColors: THREE.FaceColors });
                            this.cube.material.needsUpdate = true;
                            this.cube.material = mat;
                            options.stepCounter = 0;
                            break;
                    }
                    this.clock.start();
                }
                this.render();
                this.cube.rotation.x += options.rotateX;
                this.cube.rotation.y += options.rotateY;
                this.cube.rotation.z += options.rotateZ;
                this.cube.scale.set(options.scaleX, options.scaleY, options.scaleZ);
            };

            mainLoop();
        },

        createLights() {
            const pointLight = new THREE.PointLight(0xffffff);
            pointLight.position.set(25, 25, 25);
            this.scene.add(pointLight);
        },

        createKnot() {
            const knotgeo = new THREE.TorusKnotGeometry(10, .1, 128, 16, 5, 21);
            const mat = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: options.shine });
            const knot = new THREE.Mesh(knotgeo, mat);
            this.scene.add(knot);
            return knot;
        },

        createDodecahedron() {
            const radius = 7;
            new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: options.shine });
            const geometry = new THREE.DodecahedronGeometry(radius);
            const dodecahedron = new THREE.Mesh(geometry, mat);
            this.scene.add(dodecahedron);
            return dodecahedron;
        },

        createCube() {
            //new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 0});
            const geometry = new THREE.BoxGeometry(options.cubeSize, options.cubeSize, options.cubeSize, 1, 1, 1);
            // colors
            const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: options.shine, vertexColors: THREE.FaceColors });
            const cube = new THREE.Mesh(geometry, mat);
            cube.rotation.x = 0;
            cube.rotation.y = 45 * Math.PI / 180;
            cube.rotation.z = 0;
            this.scene.add(cube);
            return cube;
        },

        render() {
            this.timeElapsed = this.clock.getElapsedTime() - this.clock.oldTime;
            this.renderer.render(this.scene, this.camera);
            window.requestAnimationFrame(this.render);
        },


        updateRender() {
            this.renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
        },

        playMusic() {
            this.sound.play();
        }
    }


};

const gui = {
    reset() {
        options.rotateX = Math.PI / 180;
        options.rotateY = Math.PI / 180;
        options.rotateZ = Math.PI / 180;
    },
    stop() {
        options.rotateX = 0;
        options.rotateY = 0;
        options.rotateZ = 0;
    },

    createGUI() {
        var gui = new dat.GUI({ autoPlace: false });
        document.getElementById("threeConfig").appendChild(gui.domElement);
        var anim = gui.addFolder("Rotation Controls");
        anim.add(options, "rotateX", 0, Math.PI / 45).listen();
        anim.add(options, "rotateY", 0, Math.PI / 45).listen();
        anim.add(options, "rotateZ", 0, Math.PI / 45).listen();
        anim.open();

        var features = gui.addFolder("Scale Controls");
        features.add(options, "scaleX", .5, 5).listen();
        features.add(options, "scaleY", .5, 5).listen();
        features.add(options, "scaleZ", .5, 5).listen();
        features.open();

        var onTime = gui.addFolder("Color Controls");
        onTime.add(options, "animationSpeed", .25, 10).listen();
        onTime.open();
    }

};
//window.addEventListener("resize", app.onWindowResize());
window.onload = () => app.init();
window.onresize = () => app.updateRender();
window.onclick = () => app.playMusic();
}

export default graphicsFunction;