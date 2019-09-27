const alerts = function() {
    this.showAsAlert = false;
    this.message = "My message";
    this.show = function() {
        if (this.showAsAlert) {
            alert(this.message);
        }
        else {
            console.log(this.message);
        }
    }
};

let maze = emptyMaze(20, 20);

window.onload = function() {
    console.log("Loaded!");
    const alert = new alerts();
    const gui = new dat.GUI();
    gui.add(alert, 'showAsAlert');
    gui.add(alert, 'message');
    gui.add(alert, 'show');

    printMaze(maze);
}

function emptyMaze(xSize, ySize) {
    let arr = new Array(xSize);

    for (let i = 0 ; i < arr.length ; i++) {
        arr[i] = new Array(ySize);
        for (let j = 0 ; j < ySize ; j++) {
            arr[i][j] = 'a';
        }
    }

    return arr;
}

function printMaze(maze) {
    let mazeDiv = document.querySelector('#maze');                  //the maze div
    mazeDiv.innerHTML = '';                                         //clear the div of any prior maze content
    const xSize = maze.length;
    const ySize = maze[0].length;
    for (let i = 0 ; i < xSize ; i++) {
        let rowDivNode = document.createElement('div');
        rowDivNode.setAttribute('id', '#maze-row-' + i);
        let lineA = '';
        let lineB = '';
        let lineC = '';

        for (let j = 0 ; j < ySize ; j++) {
            switch (maze[i][j]) {
                case 'a':
                    lineA += '+--+';
                    lineB += '|  |';
                    lineC += '+--+'
                    break;
                case 'b':
                    lineA += '+--+';
                    lineB += '|  |';
                    lineC += '+--+'
                    break;
                case 'c':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'd':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'e':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'f':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'g':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'h':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'i':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'j':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'k':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'l':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'm':
                    lineA += '+-+';
                    lineB += '| |';
                    lineC += '+-+'
                    break;
                case 'n':
                    rowDivNode.innerHTML += 'N';
                    break;
            }
        }
        rowDivNode.innerHTML += lineA + '<br>' + lineB + '<br>' + lineC;
        mazeDiv.appendChild(rowDivNode);
    }
}

let up = false;
let right = false;
let down = false;
let left = false;
let xAxis = 0;
let yAxis = 0;

document.addEventListener('keydown', press);

function press(e){
    switch(e.keyCode) {
        case 38:
            up = true;
            break;
        case 40:
            down = true;
            break;
        case 37:
            left = true;
            break;
        case 39:
            right = true;
            break;
    }
}

document.addEventListener('keyup', release);

function release(e){
    switch(e.keyCode) {
        case 38:
            up = false;
            break;
        case 40:
            down = false;
            break;
        case 37:
            left = false;
            break;
        case 39:
            right = false;
            break;
    }
}
function gameLoop() {
  var player = document.querySelector('#player');
  if (up){
    yAxis = yAxis - 5
  }
  if (right){
    xAxis = xAxis + 5
  }
  if (down){
    yAxis = yAxis + 5
  }
  if (left){
    xAxis = xAxis - 5
  }
  player.style.marginLeft = xAxis+'px'
  player.style.marginTop = yAxis+'px'
  window.requestAnimationFrame(gameLoop)
}
window.requestAnimationFrame(gameLoop)