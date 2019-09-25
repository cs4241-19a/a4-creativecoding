import Physijs from '../js/physi.js'
import * as THREE from '../js/three.js'
import {sound,play,stop,loop} from './audio.js'

       'use strict';
       
      var bounceSound = sound("https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2F404769__owlstorm__retro-video-game-sfx-bounce.wav?v=1569358326681");
      var music = sound("https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2FUndertale%20OST%20042%20-%20Thundersnail.mp3?v=1569359250719​");
      var mass = sound("https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2F270341__littlerobotsoundfactory__pickup-04.wav?v=1569364678712");
      var color = sound("https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2F270332__littlerobotsoundfactory__hit-03.wav?v=1569364682744");
      var stretch = sound("https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2F401648__inspectorj__bodyboard-stretch-a.wav?v=1569364805642")
      let count = 0
      let score = 0
      Physijs.scripts.worker = '../js/physijs_worker.js';
      Physijs.scripts.ammo = '../js/ammo.js';
      let initScene, render, renderer, scene, camera, box, ground, ground_material, friction, controls;
      var xPos = 0
      var yPos = 0
      initScene = function() {
        
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById( 'viewport' ).appendChild( renderer.domElement );

        scene = new Physijs.Scene;
        camera = new THREE.PerspectiveCamera(
          35,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.set( 300, 100, 60 );
        camera.lookAt( scene.position );
        scene.add( camera );
        
        var loader = new THREE.TextureLoader();
        loader.load('https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2F8bb0cedfaea9e07b8c3aa6f8c41684bc.jpg?v=1569202443143', function ( texture ) {
              ground_material = Physijs.createMaterial(new THREE.MeshBasicMaterial({map: texture}) ,.8, .9);
              ground = new Physijs.BoxMesh(new THREE.BoxGeometry(150, 30, 150),ground_material,1);
              ground.receiveShadow = true;
              ground.__dirtyRotation = true;
              var constraint = new Physijs.PointConstraint( ground, new THREE.Vector3( 0, 0, 0 ));
               ground.addEventListener( 'collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
               score++
               bounceSound.play()
               document.getElementById('text').innerHTML = score
               on()
               setTimeout(function(){
                    off();
                },500);
              });
              scene.add( ground );
              scene.addConstraint( constraint );
          });
       
        let floor_mat = Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: "black" } ) ,.9, .9);
        let floor = new Physijs.BoxMesh (new THREE.BoxGeometry(10000,1,10000), floor_mat, 0);
        floor.addEventListener( 'collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
           document.getElementById('textend').innerHTML = "Should've balanced the cube. " + score + " hits."
          music.stop()
           end()
        });
        floor.position.y = -200;
        
        let celing_mat = Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: "black" } ) ,.9, .9);
        let celing = new Physijs.BoxMesh (new THREE.BoxGeometry(10000,1,10000), celing_mat, 0);
        celing.addEventListener( 'collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
           document.getElementById('textend').innerHTML = "Is the game called Drop the Cube? " + score + " hits."
          music.stop()
           end()
        });
        celing.position.y = 200;
        
        let ball_material = Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: 0xFFFFFF } ) ,.9, .9);
        box = new Physijs.BoxMesh (new THREE.BoxGeometry(10,10,10), ball_material, 1);
        requestAnimationFrame( render );
        box.position.z = 10;
        box.position.x = 0;
        box.position.y = 90;
        box.rotation.x = 10;
        box.__dirtyPosition = true;
        scene.add(box)
        scene.add(floor)
        scene.add(celing)
        

        function getCurrPos(event){
           let img = new Image();
           event.dataTransfer.setDragImage(img, 0, 0);
           xPos = event.clientX
           yPos = event.clientY
           ground.__dirtyRotation = true;
           ground.rotation.set((xPos-(screen.width/2))/200, 0, (yPos-(screen.height/2))/100)
           //document.getElementById("title").innerHTML = xPos + "  " + yPos
        }
        
        function on() {
          document.getElementById("overlay").style.display = "block";
        }

        function off() {
          document.getElementById("overlay").style.display = "none";
        }
        
         function end() {
          document.getElementById("overlayend").style.display = "block";
        }

        function restart(){
          document.getElementById("overlayend").style.display = "none";
          location.reload()
        }
        
        function drag(event){
          let img = new Image();
          event.dataTransfer.setDragImage(img, 0, 0);
        }
        
        function reset(event){
           ground.__dirtyRotation = true;
           ground.rotation.set(0,0,0)
           ground.setAngularVelocity(new THREE.Vector3(0, 0, 0));
        }
        let x = 1
        let z = 1
        let colors = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xF0F000, 0x00F0F0, 0x000F0F]
        let colornames = ["white", "red", "green", "blue", "yellow", "cyan", "magenta"]
        let cindex = 0
        let flag = 0
        function changeDim(event){
          switch (event.keyCode) {
            case 87:
              //document.getElementById("title").innerHTML = event.keyCode
              x = x + .1
              z = z - .1
              ground.scale.set(x,1,z)
              stretch.play()
              break;
            case 83:
              x = x - .1
              z = z + .1
              ground.scale.set(x,1,z)
              stretch.play()
              break;
            case 65:
              cindex++
              cindex = cindex % 7
              box.material.color.setHex(colors[cindex])
              document.getElementById('title').style.color = colornames[cindex]
              color.play()
              break;
            case 68:
              //bounce off 
              if (flag == 0){
                let newMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: "magenta" } ) ,.9, .1);
                box.material = newMaterial
                box.mass = 10
                flag = 1
              }
              else{
                let newMaterial = Physijs.createMaterial(new THREE.MeshBasicMaterial( { color: "white" } ) ,.9, .9);
                box.material = newMaterial
                box.mass = 1
                flag = 0
              }
              mass.play()
              break;
            case 88:
              music.stop()
              
          }
        }
        
       
        //document.addEventListener("keydown", onDocumentKeyDown, false);
        document.getElementById('textend').onclick = restart
        document.getElementById('viewport').ondrag = getCurrPos
        document.getElementById('viewport').ondragstart = drag
        document.getElementById('viewport').ondragend = reset
        document.addEventListener('keydown', changeDim, false)
               

        
      }
              
        function start() {
          document.getElementById("overlaystart").style.display = "block";
          document.getElementById("textstart").innerHTML = "Click, hold and drag the center of the wooden plank. Press 'w' and 's' to shift the plank's dimentions. Press 'a' to alter the cube's color. Press 'd' to disable bounce. Press 'x' to disable music. These won't help you but the assignment requires that I have them. Keypresses will not register while you're holding the plank. Balance the cube. Click to start. Click to restart when you lose. My high score is 31."
        }
        function dismiss(){
          document.getElementById("overlaystart").style.display = "none";
          music.loop()
          initScene();
          render();
        }
       
        render = function(){
          scene.simulate();
          renderer.render( scene, camera); // render the scen
          renderer.physicallyCorrectLights = true;
          requestAnimationFrame( render );
        };

        window.onload = function(){
          document.getElementById('textstart').onclick = dismiss
          start();
          //const datGui  = new dat.GUI({ autoPlace: true });
          //datGui.domElement.id = 'gui' 
        }
      