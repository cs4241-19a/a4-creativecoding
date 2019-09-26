const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// const oscillatorNode = audioCtx.createOscillator();
// const gainNode = audioCtx.createGain();
// const finish = audioCtx.destination;

const oscs = [];  // oscillators

function startNote(key, type) {
    const octave = key.parentElement.dataset.octave;
    const note = key.dataset.note;
    console.log("Start: ", octave, note);
    if (audioCtx.state === "suspended") {
        audioCtx.resume();  // let resume finish whenever. first note or more will not play but that's ok
    }
    else if (!oscs[note + octave]) {
        oscs[note + octave] = playTone(getFrequency(note, Number(octave)), type);
    }
}
function endNote(key) {
    const octave = key.parentElement.dataset.octave;
    const note = key.dataset.note;
    console.log("Stop: ", octave, note);
    if (note && oscs[note + octave]) {
        oscs[note + octave].stop();
        oscs[note + octave] = null;
    }
}

function playTone(freq, type) {
    // let type = wavePicker.options[wavePicker.selectedIndex].value;
    // osc.type = type;
    const oscillator = audioCtx.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = freq;
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    return oscillator;
}

// fn = f0 * (a)n
// f0 = the frequency of one fixed note which must be defined
// n = the number of half steps away from the fixed note you are. If you are at a higher note, n is positive. If you are on a lower note, n is negative.
// fn = the frequency of the note n half steps away.
// a = (2)1/12 = the twelth root of 2
function getFrequency(note, octave) {
    const A4 = 440;
    const a = Math.pow(2, 1/12);
    // const hsDiff = 8 * (octave - 4) + ((getHS(note) + 3) % 12); // half step difference from A4
    const hsDiff = 12 * (octave - 4) + (getHS(note) - 9); // half step difference from A4
    return A4 * (Math.pow(a, hsDiff));
}
// get the number of half steps from octave start
function getHS(note) {
    switch (note) {
        case 'C': return 0;
        case 'C#': return 1;
        case 'D': return 2;
        case 'D#': return 3;
        case 'E': return 4;
        case 'F': return 5;
        case 'F#': return 6;
        case 'G': return 7;
        case 'G#': return 8;
        case 'A': return 9;
        case 'A#': return 10;
        case 'B': return 11;
    }
}


export {startNote, endNote}