import * as gui from './gui'
import * as board from './sketch';
import * as audio from './audio';

let help = document.getElementById('help');
let canvas = document.getElementById('board');
let color = board.redGradient;
let scale = audio.major;
let note = -1;
let octave = -1;

const getHelp = function(e) {
    e.preventDefault();
    window.alert('To start press anywhere on the screen. Where you click will change the music and color. \n' +
    'From left to right the notes will change. From up to down the octave will change. \n' +
    'Use the settings in the top right to change scale and colors.');
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
    octave = findOctave(y);
    audio.playNote(note, scale, '8n', octave);
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
            case (x < 200):
                note = 0;
                break;
            case (x >= 200 && x < 400):
                note = 1;
                break;
            case (x >= 400 && x < 600):
                note = 2;
                break;
            case (x >= 600 && x < 800):
                note = 3;
                break;
            case (x >= 800 && x < 1000):
                note = 4;
                break;
            case (x >= 1000 && x < 1200):
                note = 5;
                break;
            case (x >= 1200 && x <= 1400):
                note = 6;
                break;
        }
    } else {
        switch(true) {
            case (x < 240):
                note = 0;
                break;
            case (x >= 240 && x < 480):
                note = 1;
                break;
            case (x >= 480 && x < 720):
                note = 2;
                break;
            case (x >= 720 && x < 960):
                note = 3;
                break;
            case (x >= 960 && x <= 1200):
                note = 4;
                break;
        }
    }
    return note;
};

const findOctave = function(y) {
    switch(true) {
        case (y < 44):
            octave = 9;
            break;
        case (y < 88):
            octave = 8;
            break;
        case (y < 132):
            octave = 7;
            break;
        case (y < 176):
            octave = 6;
            break;
        case (y < 220):
            octave = 5;
            break;
        case (y < 264):
            octave = 4;
            break;
        case (y < 308):
            octave = 3;
            break;
        case (y < 352):
            octave = 2;
            break;
        case (y <= 400):
            octave = 1;
            break;
    }
    return octave;
};

window.onload = function() {
    gui.setup();
    window.alert('To start press anywhere on the screen. Where you click will change the music and color. \n' +
        'From left to right the notes will change. From up to down the octave will change. \n' +
        'Use the settings in the top right to change scale and colors.');
    help.onclick = getHelp;
    canvas.onclick = handleClick;
    gui.colorController.onChange(function(value) {
        changeColor(value);
    });
    gui.scaleController.onChange(function(value) {
        changeScale(value);
    });
};