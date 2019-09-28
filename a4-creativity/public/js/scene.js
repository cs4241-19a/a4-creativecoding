var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 )
var renderer = new THREE.WebGLRenderer()
renderer.setSize( window.innerWidth/2, window.innerHeight/2 )
document.body.appendChild( renderer.domElement )

var firstChoice;
var secondChoice;
var matchs=0;
var winningMessage="Congrats! You Win"
var wrongMessage="Wrong!"

var geometry = new THREE.BoxGeometry( 1, 1, 1)
 geometry.faces[ 10 ].color.setHex( Math.random() * 0xffffff );
  geometry.faces[ 11 ].color.setHex( Math.random() * 0xffffff );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } )
var cube = new THREE.Mesh( geometry, material )
var cube4 = new THREE.Mesh( geometry, material )
cube.translateX(-2)
cube.translateY(1)
cube4.translateX(0)
cube4.translateY(-1)
scene.add(cube)
scene.add(cube4)


var geometry = new THREE.BoxGeometry( 1, 1, 1)
geometry.faces[ 10 ].color.setHex( Math.random() * 0xffffff );
 geometry.faces[ 11 ].color.setHex( Math.random() * 0xffffff );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } )
var cube3 = new THREE.Mesh( geometry, material )
var cube2 = new THREE.Mesh( geometry, material )
cube3.translateX(0)
cube3.translateY(1)
cube2.translateX(-2)
cube2.translateY(-1)
scene.add(cube3)
scene.add(cube2)


var geometry = new THREE.BoxGeometry( 1, 1, 1)
 geometry.faces[ 10 ].color.setHex( Math.random() * 0xffffff );
  geometry.faces[ 11 ].color.setHex( Math.random() * 0xffffff );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } )
var cube5 = new THREE.Mesh( geometry, material )
var cube6 = new THREE.Mesh( geometry, material )
cube5.translateX(2)
cube5.translateY(1)
cube6.translateX(2)
cube6.translateY(-1)
scene.add(cube5)
scene.add(cube6)


camera.position.z = 5;
function animate(){
   requestAnimationFrame(animate)
   cube.geometry.colorsNeedUpdate = true
   renderer.render( scene, camera )
  }
  animate()

  function firstMatch(event) {
    var x = event.key;
    console.log(x)
    if(x==='1'){
      requestAnimationFrame(animate)
      cube.rotation.y -= Math.PI
      renderer.render(scene, camera)
      firstChoice='1'
    }
    if(x==='2'){
      requestAnimationFrame(animate);
      cube2.rotation.y -= Math.PI;
      renderer.render( scene, camera );
      firstChoice='2'
    }
    if(x==='3'){
      requestAnimationFrame(animate)
      cube3.rotation.y -= Math.PI
      renderer.render(scene, camera)
      firstChoice='3'
    }
    if(x==='4'){
      requestAnimationFrame(animate);
      cube4.rotation.y -= Math.PI;
      renderer.render( scene, camera );
      firstChoice='4'
    }
    if(x==='5'){
      requestAnimationFrame(animate)
      cube5.rotation.y -= Math.PI
      renderer.render(scene, camera)
      firstChoice='5'
    }
    if(x==='6'){
      requestAnimationFrame(animate);
      cube6.rotation.y -= Math.PI;
      renderer.render( scene, camera );
      firstChoice='6'
    }
  }

  function secondMatch(event) {
    var x = event.key;
    console.log(x)
    if(x==='1'){
      requestAnimationFrame(animate)
      cube.rotation.y -= Math.PI
      renderer.render(scene, camera)
      secondChoice='4'
    }
    if(x==='2'){
      requestAnimationFrame(animate);
      cube2.rotation.y -= Math.PI;
      renderer.render( scene, camera );
      secondChoice='3'
    }
    if(x==='3'){
      requestAnimationFrame(animate)
      cube3.rotation.y -= Math.PI
      renderer.render(scene, camera)
      secondChoice='2'
    }
    if(x==='4'){
      requestAnimationFrame(animate);
      cube4.rotation.y -= Math.PI;
      renderer.render( scene, camera );
      secondChoice='1'
    }
    if(x==='5'){
      requestAnimationFrame(animate)
      cube3.rotation.y -= Math.PI
      renderer.render(scene, camera)
      secondChoice='6'
    }
    if(x==='6'){
      requestAnimationFrame(animate);
      cube4.rotation.y -= Math.PI;
      renderer.render( scene, camera );
      secondChoice='5'
    }
    checkCorrect(x)
  }

  function checkCorrect(x){
    if(firstChoice==secondChoice){
      matchs++
    }
    else{
      document.getElementById('win').innerHTML=wrongMessage
      if(x==='1'){
        requestAnimationFrame(animate)
        cube.rotation.y -= Math.PI
        renderer.render(scene, camera)
      }
      if(x==='2'){
        requestAnimationFrame(animate);
        cube2.rotation.y -= Math.PI;
        renderer.render( scene, camera );
      }
      if(x==='3'){
        requestAnimationFrame(animate)
        cube3.rotation.y -= Math.PI
        renderer.render(scene, camera)
      }
      if(x==='4'){
        requestAnimationFrame(animate);
        cube4.rotation.y -= Math.PI;
        renderer.render( scene, camera );
      }
      if(firstChoice==='1'){
        requestAnimationFrame(animate)
        cube.rotation.y -= Math.PI
        renderer.render(scene, camera)
      }
      if(firstChoice==='2'){
        requestAnimationFrame(animate);
        cube2.rotation.y -= Math.PI;
        renderer.render( scene, camera );
      }
      if(firstChoice==='3'){
        requestAnimationFrame(animate)
        cube3.rotation.y -= Math.PI
        renderer.render(scene, camera)
      }
      if(firstChoice==='4'){
        requestAnimationFrame(animate);
        cube4.rotation.y -= Math.PI;
        renderer.render( scene, camera );
      }
    }
    if(matchs===4){
      winner()
    }
    document.getElementById('pick1').value = ''
    document.getElementById('pick2').value = ''
  }

  function winner(){
    console.log('win')
    document.getElementById('win').innerHTML=winningMessage
  }

function setting(){
  winningMessage=document.getElementById('winmes').value
  wrongMessage=document.getElementById('wrong').value
}
