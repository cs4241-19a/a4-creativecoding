/*
 *Author: Zonglin Peng
 */
window.onload = function() {
  var visualizer = new Visualizer();
  visualizer.init();
  document.getElementById('playButton').onclick = function() {
      visualizer.loadDefaultAndPlay(visualizer.url);
  };
};

var Visualizer = function() {
  this.appName='3D Audio Visualizer';
  this.audioContext;
  this.source;
  this.url = 'materials/test.mp3';
  this.file;
  this.infoContainer = document.getElementById('info');
  this.statsContainer = document.getElementById('stats');
  this.stats;
  this.gui;
  this.controls;
  this.status = 0; //flag to indicate the audio is playing or stoed
  this.processing = false; //detect if there's a file is under processing, if so refuse to handle new files
  this.forceStop = false; //the audio is stoped by a new file or normally end
  this.MWIDTH = 1;
  this.GAP = 2;
  this.METERNUM = Math.round(100 / (this.MWIDTH + this.GAP)); // calculated by 200/(MWIDTH+GAP),200 is the width of the visualizer area
  this.MTHICKNESS = 1;
  this.scene;
  this.render;
  this.camera;
  this.orbitControls;
  this.clock;
  this.animationId;
}
Visualizer.prototype = {
  init: function() { //prepare the audio and the scene
      //fix the browser vendor
      window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
      window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame;
      window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
      try {
          this.audioContext = new AudioContext();
      } catch (e) {
          this.infoContainer.textContent = 'audio context is not supported :(';
      }
    //   this._handleDragDrop();
      this._initStats();
      this._initControlPanel();
      this._prepareScene();
      this._initControls();
  },
  _initStats: function(statsContainer) {
      var stats = new Stats();
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.right = '0px'; //default left and top is 0px, so actually there's no need to set it
      stats.domElement.style.bottom = '0px';
      this.statsContainer.appendChild(stats.domElement);
      this.stats = stats;
  },
  _initControlPanel: function() { //TODO Change page style
      var controlPanel = document.getElementById('controlPanel'),
          actionBtn = document.getElementById('action');
      actionBtn.onclick = function() {
          var left = controlPanel.style.left;
          if (left == '0px' || left == '') {
              controlPanel.style.left = '-190px';
              actionBtn.textContent = '>>';
          } else {
              controlPanel.style.left = '0px';
              actionBtn.textContent = '<<';
          };
      };
  },
  _initControls: function() {
      var gui = this.gui,
          controls = this.controls,
          orbitControls = this.orbitControls,
          scene = this.scene;
    // ========== GUI ==========
      gui = new dat.GUI(); //the control panel
      controls = new function() {
          this.autoRotate = false;
          this.barColor = 0x7a7a7a;
          this.capColor = 0x848484;
          this.ambientColor = 0x0c0c0c;
          this.dropSpeed = 0.3;
      };
      //initialize the control ui, custom the meter color
      gui.add(controls, 'dropSpeed', 0.0, 0.5);
      gui.addColor(controls, 'barColor').onChange(function(e) {
          scene.children.forEach(function(child) {
              if (child.name.indexOf('cube') > -1) {
                  child.material.color.setStyle(e);
                  child.material.ambient = new THREE.Color(e)
                  child.material.emissive = new THREE.Color(e)
                  child.material.needsUpdate = true;
              }
          });
      });
      gui.addColor(controls, 'capColor').onChange(function(e) {
        scene.children.forEach(function(child) {
            if (child.name.indexOf('cap') > -1) {
                child.material.color.setStyle(e);
                child.material.ambient = new THREE.Color(e)
                child.material.emissive = new THREE.Color(e)
                child.material.needsUpdate = true;
            }
        });
    });
      gui.add(controls, 'autoRotate').onChange(function(e) {
          orbitControls.autoRotate = e;
      });
      // gui.addColor(controls, 'meterBottomColor').onChange(function(e) {
      //     // cube.color = new THREE.Color(e);
      // });
      this.controls = controls;
      this.gui = gui;
    // ====================

  },
//   _handleDragDrop: function() {
//     // ========== OPTIONAL: ADD FILES ==========

//       var that = this,
//           dropContainer = document.body,
//           uploadBtn = document.getElementById('upload');
//       //listen the file upload
//       uploadBtn.onchange = function() {
//           if (!that.audioContext || that.processing) {
//               return;
//           };
//           if (uploadBtn.files.length !== 0) {
//               that.processing = true;
//               that.infoContainer.textContent = 'uploading...';
//               that.file = uploadBtn.files[0];
//               that.fileName = that.file.name;
//               that._readFile(that.file);
//               uploadBtn.value='';//fix for chrome: when uploading the same file this onchange event wont trigger
//           };
//       };
//       //handle drag and drop
//       dropContainer.addEventListener("dragenter", function() {
//           if (that.processing) {
//               return;
//           };
//           that.infoContainer.textContent = 'drop it to the page...';
//       }, false);
//       dropContainer.addEventListener("dragover", function(e) {
//           e.stopPropagation();
//           e.preventDefault();
//           e.dataTransfer.dropEffect = 'copy';
//       }, false);
//       dropContainer.addEventListener("dragleave", function() {
//           if (that.status) {
//               that.infoContainer.textContent = 'playing ' + that.fileName;
//           } else {
//               that.infoContainer.textContent = that.appName;
//           };
//       }, false);
//       dropContainer.addEventListener("drop", function(e) {
//           e.stopPropagation();
//           e.preventDefault();
//           if (!that.audioContext || that.processing) {
//               console.log('there is a file under processing, please wait');
//               return;
//           };
//           that.processing = true;
//           that.infoContainer.textContent = 'uploading...';
//           //get the dropped file
//           that.file = e.dataTransfer.files[0];
//           that.fileName = that.file.name;
//           that._readFile(e.dataTransfer.files[0]);
//       }, false);
//   },
  loadDefaultAndPlay: function(url) {
      var that = this,
          // load the default file
          xhr = new XMLHttpRequest();
      if (!this.audioContext) {
          this.processing = false;
          this.infoContainer.textContent = 'audio context is not supported :(';
          return;
      };
      if (this.processing) {
          this.processing = false;
          console.log('there is a file under processing, please wait');
          return;
      };
      this.fileName = 'bbc_sherlock_london.mp3'
      xhr.open('GET', url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
          that.infoContainer.textContent = 'load success, start next process...';
          var result = xhr.response;
          that.play(result);
      };
      xhr.onerror = xhr.onabord = function() {
          that.processing = false;
          that.infoContainer.textContent = 'fail to load the audio :(';
      };
      this.infoContainer.textContent = 'loading the audio...';
      this.processing = true;
      xhr.send();
  },
  _readFile: function(file) {
      var that = this,
          fr = new FileReader();
      fr.onload = function(e) {
          var fileResult = e.target.result;
          if (!that.audioContext) {
              return;
          };
          that.play(fileResult);
      };
      fr.onerror = function(e) {
          this.processing = false;
          that.infoContainer.textContent = '!Fail to read';
      };
      that.infoContainer.textContent = 'Starting read the file';
      fr.readAsArrayBuffer(file);
  },
  play: function(audio) {
    // ========== LOAD MUSIC ==========

      var that = this;
      that.infoContainer.textContent = 'Decoding the audio...';
      this.audioContext.decodeAudioData(audio, function(buffer) {
          that.infoContainer.textContent = 'Decode succussfully,start the visualizer';
          that._visualize(buffer);
      }, function(e) {
          that.processing = false;
          that.infoContainer.textContent = '!Fail to decode';
      });
  },
  _visualize: function(buffer) {
      var audioContext = this.audioContext,
          audioBufferSouceNode = audioContext.createBufferSource(),
          analyser = audioContext.createAnalyser(),
          that = this;
      //connect the source to the analyser
      audioBufferSouceNode.connect(analyser);
      //connect the analyser to the destination(the speaker), or we won't hear the sound
      analyser.connect(audioContext.destination);
      //then assign the buffer to the buffer source node
      audioBufferSouceNode.buffer = buffer;
      //stop the previous sound if any
      if (this.source) {
          if (this.status != 0) {
              this.forceStop = true;
              this.source.stop(0);
          };
      }
      this.source = audioBufferSouceNode;
      audioBufferSouceNode.start(0);
      this.status = 1;
      this.processing = false;
      this.source.onended = function() {
          that._audioEnd();
      };
      this.infoContainer.textContent = 'playing ' + this.fileName;
      if (this.animationId) {
          cancelAnimationFrame(this.animationId);
      };
      this._drawVisualizer(this.scene, this.render, this.camera, analyser);
  },
  _audioEnd: function() {
      if (this.forceStop) {
          this.forceStop = false;
          return;
      } else {
          this.forceStop = false;
          this.status = 0;
          this.infoContainer.textContent = this.appName;
      };
  },
  _prepareScene: function() {
    // ========== SCENE ==========

      var that = this,
          WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight,
          GAP = this.GAP, //distance between 2 meters
          MWIDTH = this.MWIDTH, //width of the meter
          METERNUM = this.METERNUM, //how many meter will be in the spectrum visualizer
          MTHICKNESS = this.MTHICKNESS, //the thickness of the meter
          stats = this.stats, //display fps info for webgl render
          controls = this.controls,
          gui = this.gui,
          //TODO: to modules
          axes = new THREE.AxisHelper(20), //the axes for debug using
          scene = new THREE.Scene(),
          render = new THREE.WebGLRenderer({
              antialias: true
          }),
          camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 1000),
          plane,
          planeGeometry,
          planeMaterial,
          spotLight = new THREE.SpotLight(0xffffff),
          ambientLight = new THREE.AmbientLight(0x404040),
          orbitControls = new THREE.OrbitControls(camera);
      orbitControls.minDistance = 50;
      orbitControls.maxDistance = 200;
      orbitControls.maxPolarAngle = 1.5;
      orbitControls.noPan = true;
      clock = new THREE.Clock();
      render.setClearColor(0x212121);
      render.setSize(WIDTH, HEIGHT);
      render.shadowMapEnabled = true;
      //the plane
      planeGeometry = new THREE.PlaneGeometry(500, 500);
      planeMaterial = new THREE.MeshPhongMaterial({
          map: THREE.ImageUtils.loadTexture("../materials/bg.jpg"),
          color: 0x222222,
          ambient: 0x555555,
          specular: 0xdddddd,
          shininess: 5,
          reflectivity: 2,
          side: THREE.DoubleSide
        });
    //   planeMaterial.side = THREE.DoubleSide;
    // ========== SHAPES ==========
      plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 15;
      plane.position.y = 0;
      plane.position.z = 0;
      plane.receiveShadow = true;
      scene.add(plane);
      //the cube
      var cubeGeometry = new THREE.CubeGeometry(MWIDTH, 1, MTHICKNESS);
      var cubeMaterial = new THREE.MeshPhongMaterial({
          color: 0x7a7a7a, //0x16f1ff,
          ambient: 0x7a7a7a, 
          specular: 0x7a7a7a,
          shininess: 20,
          reflectivity: 5.5
      });
      var capGeometry = new THREE.SphereGeometry(MWIDTH, 0.5, MTHICKNESS);
      var capMaterial = new THREE.MeshPhongMaterial({
          color: 0x848484,
          ambient: 0x848484,
          specular: 0x848484,
          shininess: 30,
          reflectivity: 5.5
      });
      for (var i = METERNUM - 1; i >= 0; i--) {
        // ========== CREATE CUBEs ==========
            //cap
            var cap = new THREE.Mesh(capGeometry, capMaterial);
            cap.position.x = -45 + (MWIDTH + GAP) * i;
            cap.position.y = 0.5;
            cap.position.z = Math.sqrt(Math.pow(METERNUM , 2) - Math.pow(cap.position.x , 2))* Math.pow(-1, i);
            cap.castShadow = true;
            cap.name = 'cap' + i;
            scene.add(cap);
            //bar
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.position.x = -45 + (MWIDTH + GAP) * i;
            cube.position.y = -1;
            cube.position.z = Math.sqrt(Math.pow(METERNUM , 2) - Math.pow(cube.position.x , 2)) * Math.pow(-1, i);
            cube.castShadow = true;
            cube.name = 'cube' + i;
            scene.add(cube); 
      };
    // ========== CANERA ==========

      //the camera
      camera.position.x = 0;
      camera.position.y = 10;
      camera.position.z = 110;
      camera.lookAt(scene.position);
      //add an ambient light for a better look
      scene.add(ambientLight);
      //the spot light
      spotLight.position.set(0, 60, 40);
      //spotLight.castShadow = true;
      scene.add(spotLight);
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight.castShadow = true;
      directionalLight.position.set(0, 10, 10);
      scene.add(directionalLight);
    // ========== OUTPUT ==========
      //output the scene to the page
      document.getElementById('visualizer_container').appendChild(render.domElement);
      render.render(scene, camera);
      this.scene = scene;
      this.render = render;
      this.camera = camera;
      this.orbitControls = orbitControls;
      this.clock = clock;
      this.orbitControls = orbitControls;
      this._drawVisualizer(scene, render, camera);
  },
  _drawVisualizer: function(scene, render, camera, analyser) {
      var that = this,
          METERNUM = this.METERNUM, //how many meter will be in the spectrum visualizer
          controls = this.controls,
          clock = this.clock,
          orbitControls = this.orbitControls;
      var renderAnimation = function() {
          that.stats.update();
          var delta = clock.getDelta();
          orbitControls.update(delta);
          if (analyser) {
              var array = new Uint8Array(analyser.frequencyBinCount);
              analyser.getByteFrequencyData(array);
              var step = Math.round(array.length / METERNUM);
              // update height of bar and cap
              for (var i = 0; i < METERNUM; i++) {
                  var value = array[i * step] / 4;
                  value = value < 1 ? 1 : value;
                  var bar = scene.getObjectByName('cube' + i, true),
                      cap = scene.getObjectByName('cap' + i, true);
                  bar.scale.y = value;
                  bar.geometry.computeBoundingBox();
                  height = ((bar.geometry.boundingBox.max.y - bar.geometry.boundingBox.min.y) * value) / 2;
                  if (height > cap.position.y) {
                      cap.position.y = (height - 0.5)>0?(height - 0.5) : 0.5;
                  } else {
                      cap.position.y -= 0.51 - controls.dropSpeed;
                  };
              }
          };
          //render all stuff out
          render.render(scene, camera);
          that.animationId = requestAnimationFrame(renderAnimation);
      };
      that.animationId = requestAnimationFrame(renderAnimation);
  }
}