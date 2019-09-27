var blocks = [],
    width = 500,
    height = 400,
    ROWS = 20,
    COLS = 10,
    blockWidth = 50,
    blockHeight = 10;

var baseBlock = {
    width: 80,
    height: 5,
    speed: 320,
    x: 0,
    y: 0,    
    dir: 0,
    mesh: null
};

var ball = {
    x: 0,
    y: 0,
    radius: 7,
    velocity: {x: 0, y: 250},
    mesh: null
};

var game = {
    state: "ready",
    blockCount: ROWS*COLS,   
    score: 0,
    lives: 1
};

export {blocks, width, height, ROWS, COLS, blockWidth, blockHeight, baseBlock, ball, game}
