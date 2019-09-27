import * as THREE from "../three.module.js"
import {blocks, width, height, ROWS, COLS, blockWidth, blockHeight, baseBlock, ball, game} from "/constants.js"

//start this bad larry up
var scene = null
var renderer = null
var camera = null
start();

//////////////////////////////////////////

//to to the scoreboard page
function goToScore() {
  fetch( '/scores', {
      method:'GET',
    })
    .then( function( r ) {
      window.location.href = r.url
    })
  return false;
}
//////////////////////////////////////////
//initializations 
function initEdges() {
    var sidegeometry = new THREE.BoxGeometry(1, 400, 100);
    var topGeometry = new THREE.BoxGeometry(500, 1, 100);
    var sidematerial = new THREE.MeshPhongMaterial({color: 0xff8c00, specular: 0x333333, shininess: 5});
    
    var leftbox = new THREE.Mesh(sidegeometry, sidematerial);
    var rightbox = new THREE.Mesh(sidegeometry, sidematerial);
    var backbox = new THREE.Mesh(new THREE.BoxGeometry(500, 400, 1),sidematerial);
    var botbox = new THREE.Mesh(topGeometry, sidematerial);
    var topbox = new THREE.Mesh(topGeometry, sidematerial);
    
    leftbox.position.set(-1, 200, 0);
    rightbox.position.set(width, 200, 0);
    backbox.position.set(250, 200, -49);
    botbox.position.set(250, 0, 0);
    topbox.position.set(250, 400, 0);
    scene.add(botbox);
    scene.add(leftbox);
    scene.add(rightbox);
    scene.add(backbox);
    scene.add(topbox);
}

//light up the scene
function initLights() {
    var light = new THREE.DirectionalLight(0xffffff, 0.7);
  //lights all objects of scene equally
    var ambient = new THREE.AmbientLight(0xffffff, 0.2);
    light.position.set(50, 10, 100);
    scene.add(light);
    scene.add(ambient);
}

//shows score as the game is being played
function smolScoreText() {
    var status = document.createElement("div");
    status.id = "status";
    status.style.position = "sticky";
    status.style.top = "0px";
    status.style.padding = "10px";
    status.style.width = "300px";
    status.style.height = "100px";
    status.style.fontFamily = "monospace";
    status.innerHTML = "Score: " + game.score + " Press H for directions";
    status.style.color = "white";
    document.body.appendChild(status);
}

//////////////////////////////////////////

function start() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 400;
    camera.position.x = 200;
    camera.position.y = 200;
  //I have decided to make this hard and make it dark, you could make it easier by initializing this
    //initLights();
    initEdges();
    smolScoreText();
    initGame();
    initKeys();
    var time = 0;
  //common loop for games like this, used this resource https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
    function mainLoop(timestamp) {
        requestAnimationFrame(mainLoop);
        renderer.render(scene, camera);
        var delta = timestamp - time;
        time = timestamp;
        var baseBlockDelta = baseBlock.speed*delta/1000;
            if ((baseBlock.dir === -1 && baseBlock.x > baseBlockDelta) || (baseBlock.dir === 1 && baseBlock.x + baseBlockDelta + baseBlock.width < width))
                baseBlock.x += baseBlockDelta * baseBlock.dir;
            if (game.state === "running") {
                ball.x += ball.velocity.x * delta / 1000;
                ball.y += ball.velocity.y * delta / 1000;
                detectHit();
            } else  {
                ball.x = baseBlock.x+baseBlock.width/2;
                ball.y = baseBlock.y+baseBlock.height+ball.radius;
            } 
            if (ball) {
                ball.mesh.position.x = ball.x;
                ball.mesh.position.y = ball.y;
            }
            if (baseBlock) {
                baseBlock.mesh.position.x = baseBlock.x+baseBlock.width/2
                baseBlock.mesh.position.y = baseBlock.y+baseBlock.height/2;
            }
    }
    mainLoop();
}
//////////////////////////////////////////
function updateStatus() {
    var s = document.getElementById("status");
    if (game.lives === 0) {
      window.alert("GAME OVER")
	    game.state = "over";
      goToScore();
    } else if (game.blockCount === 0) {
      window.alert("YOU WIN")
      resetGame();
      game.state = "over";
      goToScore();
    } 
    s.innerHTML = 'Score: ' + game.score + " Press H for directions";
}

//reset the whole game
function resetGame() {
    game.lives = 1
    game.score = 0
    game.blockCount = ROWS*COLS;
  
  //remove everything
    scene.remove(baseBlock.mesh);
    scene.remove(ball.mesh);
    for (var i = 0; i < ROWS; i++)
	    for (var j = 0; j < COLS; j++)
	      scene.remove(blocks[i][j].object);
  //anddddd then reinitialize it all, i tried to just reinitialize and not remove and had some issues
    initGame();
}

//////////////////////////////////////////
//this was v hard, had help from online with this part
function resetbaseBlock() {
    baseBlock.x = width/2-baseBlock.width/2;
    baseBlock.y = 0;
    baseBlock.mesh.position.x = baseBlock.x+baseBlock.width/2;
    baseBlock.mesh.position.y = baseBlock.height/2;
    baseBlock.dir = 0;
    ball.x = baseBlock.x+baseBlock.width/2;
    ball.y = baseBlock.y+baseBlock.height+ball.radius;
    ball.mesh.position.x = ball.x;
    ball.mesh.position.y = ball.y;
    ball.velocity.x = Math.random()*200-100;
    ball.velocity.y = 250;
}

//////////////////////////////////////////
//most of the actual game is done here

function detectHit() {
  //all about those wall hits
    if (ball.x+ball.radius > width) {
      //right wall
      //'bounce'
      ball.velocity.x = -ball.velocity.x;
      ball.x = width-ball.radius;
	    return;
    }
    if (ball.x-ball.radius < 0) {
      //left wall
	    ball.velocity.x = -ball.velocity.x;
	    ball.x = ball.radius;
	    return;
    }
    if (ball.y+ball.radius > height) {
      //upper height
      //'bounce'
	    ball.velocity.y = -ball.velocity.y;
	    ball.y = height-ball.radius;
	    return;
    }
    
    // hit against base block
    if (ball.y-ball.radius < baseBlock.y+baseBlock.height && game.state === "running") {
        if (ball.x >= baseBlock.x && ball.x < baseBlock.x+baseBlock.width) {
          //if ball is between start and end of baseBlock aka you hit the block and aren't dead
            ball.velocity.x += baseBlock.dir*50;
          //bounce up
            ball.velocity.y = -ball.velocity.y;
            ball.y = baseBlock.y+baseBlock.height+ball.radius;
        } else {
          //this is the case that you didn't hit the block and you dead
            game.lives--;
            game.score = 0;
            resetbaseBlock();
            game.state = "ready";
            updateStatus();
        }
	  return;
    }
    
    // we hit a block and we're making progress!
    if (ball.y+ball.radius < height-ROWS*blockHeight)
      //nothing is being hit, we good
	    return;
    
    var col = Math.floor((ball.x-ball.radius)/blockWidth);
    var row = Math.floor((height-ball.y-ball.radius)/blockHeight);
    if (row < 0 || col < 0 || blocks[row][col].status === 1)
      //fractions less than 0 meaning that the ball has not hit anything yet
	    return;
    
  //ball.x-ball.radius
    var x = col*blockWidth;
  //height - ball.y - ball.radius
    var y = height-row*blockHeight;
    if (ball.x+ball.radius >= x && ball.x-ball.radius < x+blockWidth && ball.y+ball.radius > y-blockHeight && ball.y-ball.radius < y) {
      //'bounce'
      ball.velocity.y = -ball.velocity.y;
      blocks[row][col].status = 1;
      scene.remove(blocks[row][col].object);
      game.score++;
      game.blockCount--;
      updateStatus();
    }
}

//////////////////////////////////////////
//here is where we take care of all the user controls
function initKeys() {
  document.addEventListener("keydown", function(e) {
    if (e.keyCode === 39)
      //arrow right, move right
        baseBlock.dir = 1;
    else if (e.keyCode === 37)
      //arrow left, move left
        baseBlock.dir = -1;
    else if (e.keyCode === 72)
      //h button to show directions
        window.alert("Need help? Here's how to play- space bar to start, right arrow to move bar right, left arrow to move bar left, up arrow to make it speedy, and down arrown to slow it back down")
    else if (e.keyCode === 38)
      //arrow up, speed up, make it harder
        ball.velocity.x += 100
    else if (e.keyCode === 40)
      //arrow down
      ball.velocity.x = 10
    else if (e.keyCode === 32 && game.state === "ready") {
      //space bar
        ball.velocity.x += baseBlock.dir * 25;
        if (ball.velocity.x > width)
          ball.velocity.x = width;
          game.state = "running";
    }

    if (game.state === "over") {
      var doneMessage = document.getElementById("message");
      doneMessage.parentNode.removeChild(doneMessage);
      game.state = "ready";
    }
  }, false);
  
  document.addEventListener("keyup", function(e) {
  //stop motin when key is 'let go'
	if ((e.keyCode === 39 && baseBlock.dir === 1) ||
	    (e.keyCode === 37 && baseBlock.dir === -1))
    	    baseBlock.dir = 0;
    }, false);
}

//////////////////////////////////////////
//initialize the game
function initGame() {
  
    var geometry = new THREE.BoxGeometry(blockWidth, blockHeight, 100);
    for (var i = 0; i < ROWS; i++) {
      //iterate through the rows
	    blocks[i] = [];
	    for (var j = 0; j < COLS; j++) {
        //iterate through the columns
	      var material = new THREE.MeshPhongMaterial(
		    {color: new THREE.Color("rgb(118, 215, 196)")});
	      var object = new THREE.Mesh(geometry, material);
        //blocks [row][column]
	      blocks[i][j] = { status: 0, object: object};
	      object.position.set(j*blockWidth+blockWidth/2,
				height-(i*blockHeight+blockHeight/2), 0);
	      scene.add(object);
	    }
    }
    
  //creation of the base block
    var material = new THREE.MeshPhongMaterial({color: 0xF1948A});
    var baseBlockGeometry = new THREE.BoxGeometry(baseBlock.width, baseBlock.height, 50);
    baseBlock.mesh = new THREE.Mesh(baseBlockGeometry, material);
    scene.add(baseBlock.mesh);
    
  //creation of the ball
    ball.mesh = new THREE.PointLight(0xffffff , 3, 200);
    var ballGeometry = new THREE.SphereGeometry(ball.radius);
    var ballMaterial = new THREE.MeshBasicMaterial({color: 0xfF5CBA7 });
    ball.mesh.add(new THREE.Mesh(ballGeometry, ballMaterial));
    scene.add(ball.mesh);
  
    //set the game state
    game.state = "ready";
    resetbaseBlock();
    window.alert("Need help? Here's how to play- space bar to start, right arrow to move bar right, left arrow to move bar left, up arrow to make it speedy, and down arrown to slow it back down")
}