/**
 * Audiovisuals
 */

// Fix bug when editing hydra

const avcanvas = document.getElementById("renderer");
const ctx = avcanvas.getContext('2d');
const audioCtx = new AudioContext();
// const audioElement = document.createElement('audio');
// document.body.appendChild(audioElement);
// audioElement.src = 'music/Bloodstream.mp3';
// audioElement.loop = true;
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 1024;// 512 bins
// const player = audioCtx.createMediaElementSource(audioElement);
// player.connect(audioCtx.destination);
// player.connect(analyser);

if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, function (stream) {
        microphone = audioCtx.createMediaStreamSource(stream);
        microphone.connect(analyser);
        //analyser.connect(audioCtx.destination);
        //microphone.stop()
    });
}

const marchingCanvas = document.getElementById("marchingCanvas");
const babylonCanvas = document.getElementById("babylonCanvas");

let babylonInit = false;
let marchingInit = false;

function firstVis() {
    hideWebGl();

    const start = function () {
        //audioElement.play();

        const results = new Uint8Array(analyser.frequencyBinCount);

        let background = new Image();
        background.src = "texture/synth.jpeg";

        let draw = function () {
            window.requestAnimationFrame(draw);
            ctx.drawImage(background, 0, 0);
            ctx.fillStyle = "white";
            analyser.getByteFrequencyData(results);
            for (let i = 0; i < analyser.frequencyBinCount; i++) {
                ctx.fillRect(i * 4, 300 + 256 - results[i] * 2, 3, 100);
            }
        };
        draw();
    };

    start();
}


function secondVis() {
    hideWebGl();

    let center_x, center_y, radius, bars,
        x_end, y_end, bar_height, bar_width,
        results;
    bars = 100;
    bar_width = 15;

    results = new Uint8Array(analyser.frequencyBinCount);
    //audioElement.play();
    animate();

    function animate() {
        center_x = avcanvas.width / 2;
        center_y = avcanvas.height / 2;
        radius = 150;

        let gradient = ctx.createLinearGradient(0, 0, 0, avcanvas.height);
        gradient.addColorStop(0, "rgb(255,78,231)");
        gradient.addColorStop(1, "rgb(43,204,197)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, avcanvas.width, avcanvas.height);

        ctx.beginPath();
        ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        analyser.getByteFrequencyData(results);
        for (let i = 0; i < bars; i++) {
            let rads = Math.PI * 2 / bars;
            bar_height = results[i] * 0.9;
            let x = center_x + Math.cos(rads * i) * (radius);
            let y = center_y + Math.sin(rads * i) * (radius);
            x_end = center_x + Math.cos(rads * i) * (radius + bar_height);
            y_end = center_y + Math.sin(rads * i) * (radius + bar_height);
            drawBar(x, y, x_end, y_end, bar_width, results[i]);
        }
        window.requestAnimationFrame(animate);
    }

    function drawBar(x1, y1, x2, y2, width, frequency) {
        let lineColor = "rgb(" + frequency * 0.9 + ", " + frequency * 1.3 + ", " + 10 + ")";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

function thirdVis() {
    hideWebGl();

    //audioElement.play();

    const results = new Uint8Array(analyser.frequencyBinCount);

    draw = function () {
        window.requestAnimationFrame(draw);

        let grd = ctx.createLinearGradient(0, 0, 0, avcanvas.height - 150);

        grd.addColorStop(0.000, 'rgba(0, 255, 0, 1.000)');
        grd.addColorStop(0.200, 'rgba(0, 255, 0, 1.000)');
        grd.addColorStop(0.200, 'rgba(191, 255, 0, 1.000)');
        grd.addColorStop(0.400, 'rgba(191, 255, 0, 1.000)');
        grd.addColorStop(0.400, 'rgba(221, 255, 0, 1.000)');
        grd.addColorStop(0.600, 'rgba(221, 255, 0, 1.000)');
        grd.addColorStop(0.600, 'rgba(255, 229, 0, 1.000)');
        grd.addColorStop(0.800, 'rgba(255, 229, 0, 1.000)');
        grd.addColorStop(0.800, 'rgba(255, 144, 0, 1.000)');
        grd.addColorStop(1.000, 'rgba(255, 144, 0, 1.000)');
        grd.addColorStop(1.000, 'rgba(255, 50, 0, 1.000)');


        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, avcanvas.width, avcanvas.height);

        grd = ctx.createLinearGradient(0, avcanvas.height, 0, avcanvas.height / 2);
        grd.addColorStop(0.000, 'rgba(0, 255, 0, 1.000)');
        grd.addColorStop(0.200, 'rgba(191, 255, 0, 1.000)');
        grd.addColorStop(0.400, 'rgba(221, 255, 0, 1.000)');
        grd.addColorStop(0.600, 'rgba(255, 229, 0, 1.000)');
        grd.addColorStop(0.800, 'rgba(255, 144, 0, 1.000)');
        grd.addColorStop(1.000, 'rgba(255, 50, 0, 1.000)');

        ctx.fillStyle = grd;

        ctx.lineWidth = 10;
        ctx.strokeStyle = grd;
        ctx.beginPath();

        let sliceWidth = avcanvas.width * 1.0 / analyser.frequencyBinCount;
        let x = 0;

        //analyser.getByteFrequencyData(results);
        analyser.getByteTimeDomainData(results);

        for (let i = 0; i < analyser.frequencyBinCount; i++) {
            // ctx.fillRect(i * 3, avcanvas.height, 10, results[i] * -2.5) // upside down

            let v = results[i] / 128.0;
            let y = v * avcanvas.height / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }
        ctx.lineTo(avcanvas.width, avcanvas.height / 2);
        ctx.stroke();
    };
    draw();
}

function fourthVis() {
    //audioElement.play();

    if (marchingInit) {
        marchingCanvas.style.display = "block";
        babylonCanvas.style.display = "none";
        return;
    }

    marchingInit = true;
    Marching.export(window);
    marchingCanvas.style.display = "block";
    babylonCanvas.style.display = "none";
    Marching.init(marchingCanvas);

    const s = march(
        Marching.Repeat(
            Marching.StairsDifference(
                Marching.Sphere(2),
                Marching.Repeat(Marching.Sphere(0.1), 0.25),
                0.25,
                10
            ),
            6
        ).translate(0, -1.5),
        Marching.Plane().texture('cellular', {strength: -0.5, scale: 10})
    )
        .fog(0.1, Vec3(0, 0, 0.25))
        .background(Vec3(0, 0, 0.25))
        .render();

    window.onresize = function () {
        s.resolution(0.5)
    }
}

function fifthVis() {
    //audioElement.play();

    if (babylonInit) {
        marchingCanvas.style.display = "none";
        babylonCanvas.style.display = "block";
        return;
    }

    babylonInit = true;
    marchingCanvas.style.display = "none";
    babylonCanvas.style.display = "block";
    let engine = new BABYLON.Engine(babylonCanvas, true); // Generate the BABYLON 3D engine

    // Create the scene space
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black();

    // Add a camera to the scene and attach it to the canvas
    let camera = new BABYLON.ArcRotateCamera("camera1", -Math.PI / 2, 6 * Math.PI / 12, 50, new BABYLON.Vector3(0, 5, 0), scene);
    camera.attachControl(babylonCanvas, true);

    // Add lights to the scene
    let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    let light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    let url = "texture/blue-purple-gradient-linear-1920x1080-c2-191970-800080-a-135-f-14.png";
    let background = new BABYLON.Layer("back", url, scene);
    background.isBackground = true;

    let groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
    groundMaterial.majorUnitFrequency = 5;
    groundMaterial.minorUnitVisibility = 0.45;
    groundMaterial.gridRatio = 2;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new BABYLON.Color3(0, 1, 1);
    groundMaterial.lineColor = new BABYLON.Color3(0, 1.0, 1.0);
    groundMaterial.opacity = 0.98;

    let ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", 'texture/heightMap.png', 150, 150, 150, 0, 15, scene, false);
    ground.material = groundMaterial;


    // BABYLON.SceneLoader.Append("../texture/drum_kit/", "scene.gltf", scene, function (scene) {
    //     // do something with the scene
    // });


    let defaultGridMaterial = new BABYLON.GridMaterial("default", scene);
    defaultGridMaterial.majorUnitFrequency = 5;
    defaultGridMaterial.gridRatio = 0.5;
    defaultGridMaterial.emissiveColor = new BABYLON.Color3(1, 0, 1);

    let mySphere = BABYLON.MeshBuilder.CreateSphere("mySphere", {diameter: 20}, scene);
    mySphere.material = defaultGridMaterial;
    mySphere.position.y += 10;
    mySphere.position.z += 10;

    let spatialBoxArray = [];
    let spatialBox;
    let color;
    const results = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(results);
    for (let index = 0; index < analyser.frequencyBinCount - 150; index++) {
        spatialBox = BABYLON.MeshBuilder.CreateBox("sb" + index, {height: 0.05, width: 0.05, depth: 0.1}, scene);
        spatialBox.position = new BABYLON.Vector3(index / 20 - 9, 0, -38);
        spatialBox.material = new BABYLON.StandardMaterial("sbm" + index, scene);
        // spatialBox.material.alpha = 0.8;
        // color = hsvToRgb(index / (analyser.frequencyBinCount) / 2 * 360, 100, 50),
        spatialBox.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        spatialBox.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
        spatialBoxArray.push(spatialBox);
    }

    let gl = new BABYLON.GlowLayer("glow", scene);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        //camera.alpha += 0.003;
        scene.render();
    });

    scene.registerBeforeRender(function () {
        analyser.getByteFrequencyData(results);
        for (let i = 0; i < analyser.frequencyBinCount - 150; i++) {
            spatialBoxArray[i].position.y = 4 + results[i] * 0.015;
        }
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

function hideWebGl() {
    marchingCanvas.style.display = "none";
    babylonCanvas.style.display = "none";
}

function changeTo(song) {
    if (song === "bloodstream") {
        document.getElementById("bloodstream").classList.add("active");
        document.getElementById("tron").classList.remove("active");
        audioElement.src = 'music/Bloodstream.mp3';
    } else {
        document.getElementById("bloodstream").classList.remove("active");
        document.getElementById("tron").classList.add("active");
        audioElement.src = 'music/TRON.mp3';
    }
    audioElement.play();
}