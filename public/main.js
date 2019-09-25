import * as gui from './gui'
import * as board from './sketch';
import * as audio from './audio';

let help = document.getElementById('help');
let canvas = document.getElementById('board');
let color = board.redGradient;
let scale = audio.major;
let note = -1;

const getHelp = function(e) {
    e.preventDefault();
    window.alert('To start press anywhere on the screen. Where you click will change the music and color');
};

const handleClick = function(e) {
    e.preventDefault();
    audio.setup();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let fill = board.pickColor(x, color);
    board.createCircles(board.ctx, x, y, fill);
    note = findNote(x);
    console.log(note);
    audio.playNote(note, scale, '8n');
};

const changeColor = function(value) {
    switch(value) {
        case 'Red Gradient':
            color = board.redGradient;
            break;
        case 'Blue Gradient':
            color = board.blueGradient;
            break;
        case 'Rainbow':
            color = board.rainbow;
            break;
        case 'Greyscale':
            color = board.greyScale;
            break;
    }
};

const changeScale = function(value) {
    switch(value) {
        case 'Major':
            scale = audio.major;
            break;
        case 'Minor':
            scale = audio.minor;
            break;
        case 'Pentatonic':
            scale = audio.pentatonic;
            break;
        case 'Diatonic':
            scale = audio.diatonic;
            break;
    }
};

const findNote = function(x) {
    let note;
    if(scale != audio.pentatonic) {
        switch(true) {
            case (x < 265):
                note = 0;
                break;
            case (x >= 265 && x < 530):
                note = 1;
                break;
            case (x >= 530 && x < 795):
                note = 2;
                break;
            case (x >= 795 && x < 1060):
                note = 3;
                break;
            case (x >= 1060 && x < 1325):
                note = 4;
                break;
            case (x >= 1325 && x <= 1600):
                note = 5;
                break;
        }
    } else {
        switch(true) {
            case (x < 400):
                note = 0;
                break;
            case (x >= 400 && x < 800):
                note = 1;
                break;
            case (x >= 800 && x < 1200):
                note = 2;
                break;
            case (x >= 1200 && x <= 1600):
                note = 3;
                break;
        }
    }
    return note;
};

window.onload = function() {
    gui.setup();
    window.alert('To start press anywhere on the screen. Where you click will change the music and color');
    help.onclick = getHelp;
    canvas.onclick = handleClick;
    gui.colorController.onChange(function(value) {
        changeColor(value);
    });
    gui.scaleController.onChange(function(value) {
        changeScale(value);
    });
};