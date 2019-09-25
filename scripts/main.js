import Physijs from '../js/physi.js'
import * as THREE from '../js/three.js'
import {sound,play,stop,loop} from './audio.js'
import {scene,ground,box,celing,floor,bounceSound,music,mass,color,on,off,end,restart,drag,reset,stretch} from './geometry.js'

'use strict';
let initScene, render, renderer, camera, ground_material, friction, controls;
var xPos = 0
var yPos = 0
let count = 0
let score = 0
Physijs.scripts.worker = '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';
      
    initScene = function() {
      
        // ===================================================================================================
        // CAMERA SETUP
        // ===================================================================================================
        
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('viewport').appendChild(renderer.domElement);
        camera = new THREE.PerspectiveCamera(35,window.innerWidth / window.innerHeight,1,1000);
        camera.position.set( 300, 100, 60 );
        camera.lookAt(scene.position);
        scene.add(camera);
        requestAnimationFrame(render);
          
        // ===================================================================================================
        // MOUSE TRACKER
        // ===================================================================================================

        function getCurrPos(event){
           let img = new Image();
           event.dataTransfer.setDragImage(img, 0, 0);
           xPos = event.clientX
           yPos = event.clientY
           ground.__dirtyRotation = true;
           ground.rotation.set((xPos-(screen.width/2))/200, 0, (yPos-(screen.height/2))/100)
           //document.getElementById("title").innerHTML = xPos + "  " + yPos
        }
      
        
        // ===================================================================================================
        // KEYBOARD CONTROLS
        // ===================================================================================================

        let x = 1
        let z = 1
        let colors = [0xFFFFFF, 0xFF0000, 0x00FF00, 0x0000FF, 0xF0F000, 0x00F0F0, 0x000F0F]
        let colornames = ["white", "red", "green", "blue", "yellow", "cyan", "magenta"]
        let cindex = 0
        let flag = 0
        
        function changeDim(event){
          switch (event.keyCode) {
            case 87:
              x = x + .1
              z = z - .1
              ground.scale.set(x,1,z)
              play(stretch)
              break;
            case 83:
              x = x - .1
              z = z + .1
              ground.scale.set(x,1,z)
              play(stretch)
              break;
            case 65:
              cindex++
              cindex = cindex % 7
              box.material.color.setHex(colors[cindex])
              document.getElementById('title').style.color = colornames[cindex]
              play(color)
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
              play(mass)
              break;
            case 88:
              stop(music)
          }
        }
        
        document.getElementById('textend').onclick = restart
        document.getElementById('viewport').ondrag = getCurrPos
        document.getElementById('viewport').ondragstart = drag
        document.getElementById('viewport').ondragend = reset
        document.addEventListener('keydown', changeDim, false)
        
        //INITSCENE END
      }

      function start() {
          document.getElementById("overlaystart").style.display = "block";
          document.getElementById("textstart").innerHTML = "Click, hold and drag the center of the wooden plank. Press 'w' and 's' to shift the plank's dimentions. Press 'a' to alter the cube's color. Press 'd' to disable bounce. Press 'x' to disable music. These won't help you but the assignment requires that I have them. Keypresses will not register while you're holding the plank. Balance the cube. Click to start. Click to restart when you lose. My high score is 31."
      }

      function dismiss(){
          document.getElementById("overlaystart").style.display = "none";
          loop(music)
          initScene();
          render();
      }
       
      render = function(){
          scene.simulate();
          renderer.render( scene, camera); 
          renderer.physicallyCorrectLights = true;
          requestAnimationFrame( render );
        };

      window.onload = function(){
          document.getElementById('textstart').onclick = dismiss
          start();
        }
      