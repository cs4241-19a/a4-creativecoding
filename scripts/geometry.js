import Physijs from '../js/physi.js'
import * as THREE from '../js/three.js'
let score = 0

  
        // ===================================================================================================
        // MAKE PLANK
        // ===================================================================================================
        
        var loader = new THREE.TextureLoader();
        loader.load('https://cdn.glitch.com/c3c1ab32-34b4-400c-9040-faa6873ac320%2F8bb0cedfaea9e07b8c3aa6f8c41684bc.jpg?v=1569202443143', function(texture) {
              let ground_material = Physijs.createMaterial(new THREE.MeshBasicMaterial({map: texture}) ,.8, .9);
              let ground = new Physijs.BoxMesh(new THREE.BoxGeometry(150, 30, 150),ground_material,1);
              ground.receiveShadow = true;
              ground.__dirtyRotation = true;
              var constraint = new Physijs.PointConstraint( ground, new THREE.Vector3(0, 0, 0));
               ground.addEventListener('collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision) {
               score++
               play(bounceSound)
               document.getElementById('text').innerHTML = score
               on()
               setTimeout(function(){
                    off();
                },500);
              });
              scene.add(ground);
              scene.addConstraint(constraint);
          });
      
        // ===================================================================================================
        // MAKE FLOOR
        // ===================================================================================================
       
        let floor_mat = Physijs.createMaterial(new THREE.MeshBasicMaterial({color: "black"}) ,.9, .9);
        let floor = new Physijs.BoxMesh (new THREE.BoxGeometry(10000,1,10000), floor_mat, 0);
        floor.addEventListener( 'collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision ) {
           document.getElementById('textend').innerHTML = "Should've balanced the cube. " + score + " hits."
           stop(music);
           end()
        });
        floor.position.y = -200;
        scene.add(floor)
            
        // ===================================================================================================
        // MAKE CELING
        // ===================================================================================================
      
        let celing_mat = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: "black" }) ,.9, .9);
        let celing = new Physijs.BoxMesh (new THREE.BoxGeometry(10000,1,10000), celing_mat, 0);
        celing.addEventListener('collision', function( objCollidedWith, linearVelOfCollision, angularVelOfCollision) {
           document.getElementById('textend').innerHTML = "Is the game called Drop the Cube? " + score + " hits."
           stop(music);
           end()
        });
        celing.position.y = 200;
        scene.add(celing);
      
        // ===================================================================================================
        // MAKE CUBE
        // ===================================================================================================
        
        let ball_material = Physijs.createMaterial(new THREE.MeshBasicMaterial({ color: 0xFFFFFF }) ,.9, .9);
        box = new Physijs.BoxMesh (new THREE.BoxGeometry(10,10,10), ball_material, 1);
        box.position.z = 10;
        box.position.x = 0;
        box.position.y = 90;
        box.rotation.x = 10;
        box.__dirtyPosition = true;
        scene.add(box);
  
        // ===================================================================================================
        // CALLBACKS
        // ===================================================================================================
        
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
