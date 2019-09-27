import * as gui from './gui';
import * as board from './sketch';
import * as audio from './audio';

let help = document.getElementById('help');
let canvas = document.getElementById('board');
let color = board.redGradient;
let scale = audio.major;
let note = -1;
let octave = -1;
let helpString = 'To start press anywhere on the screen. Where you click will change the music and color. \n' +
    'From left to right the notes will change. From up to down the octave will change. \n' +
    'Use the settings in the top right to change scale and colors.';

let length = '8n';
let instrument;

const getHelp = function (e) {
    'use strict';
    e.preventDefault();
    window.alert(helpString);
};

const changeColor = function (value) {
    'use strict';
    if (value === 'Red Gradient') {
        color = board.redGradient;
    } else if (value === 'Blue Gradient') {
        color = board.blueGradient;
    } else if (value === 'Rainbow') {
        color = board.rainbow;
    } else if (value === 'Greyscale') {
        color = board.greyScale;
    }
};

const changeScale = function (value) {
    'use strict';
    if (value === 'Major') {
        scale = audio.major;
    } else if (value === 'Minor') {
        scale = audio.minor;
    } else if (value === 'Pentatonic') {
        scale = audio.pentatonic;
    } else if (value === 'Diatonic') {
        scale = audio.diatonic;
    }
};

const findNote = function (x) {
    'use strict';
    if (scale !== audio.pentatonic) {
        if (x < 200) {
            note = 0;
        } else if (x >= 200 && x < 400) {
            note = 1;
        } else if (x >= 400 && x < 600) {
            note = 2;
        } else if (x >= 600 && x < 800) {
            note = 3;
        } else if (x >= 800 && x < 1000) {
            note = 4;
        } else if (x >= 1000 && x < 1200) {
            note = 5;
        } else if (x >= 1200 && x <= 1400) {
            note = 6;
        }
    } else {
        if (x < 240) {
            note = 0;
        } else if (x >= 240 && x < 480) {
            note = 1;
        } else if (x >= 480 && x < 720) {
            note = 2;
        } else if (x >= 720 && x < 960) {
            note = 3;
        } else if (x >= 960 && x <= 1200) {
            note = 4;
        }
    }
    return note;
};

const findOctave = function (y) {
    'use strict';
    if (y < 44) {
        octave = 9;
    } else if (y < 88) {
        octave = 8;
    } else if (y < 132) {
        octave = 7;
    } else if (y < 176) {
        octave = 6;
    } else if (y < 220) {
        octave = 5;
    } else if (y < 264) {
        octave = 4;
    } else if (y < 308) {
        octave = 3;
    } else if (y < 352) {
        octave = 2;
    } else if (y <= 400) {
        octave = 1;
    }
    return octave;
};

const changeLength = function (value) {
    'use strict';
    if (value === 'Sixteenth Note') {
        length = '16n';
    } else if (value === 'Eighth Note') {
        length = '8n';
    } else if (value === 'Quarter Note') {
        length = '4n';
    } else if (value === 'Half Note') {
        length = '2n';
    } else if (value === 'Whole Note') {
        length = '1n';
    }
};

const handleClick = function (e) {
    'use strict';
    e.preventDefault();
    audio.setup(instrument);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let fill = board.pickColor(x, color);
    board.createCircles(board.ctx, x, y, fill);
    note = findNote(x);
    octave = findOctave(y);
    audio.playNote(note, scale, length, octave);
};

window.onload = function() {
    'use strict';
    gui.setup();
    window.alert(helpString);
    help.onclick = getHelp;
    canvas.onclick = handleClick;
    gui.colorController.onChange(function (value) {
        changeColor(value);
    });
    gui.scaleController.onChange(function (value) {
        changeScale(value);
    });
    gui.lengthController.onChange(function (value) {
        changeLength(value);
    });
    gui.instrumentController.onChange(function (value) {
        instrument = value;
    });
};