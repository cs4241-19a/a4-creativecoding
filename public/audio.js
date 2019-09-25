const major = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const minor = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const pentatonic = ['c', 'd', 'e', 'g', 'a'];
const diatonic = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];

let Tone = require("Tone");

//create a synth and connect it to the master output (your speakers)
let synth = new Tone.Synth().toMaster();

function playNote(note, scale, length, octave) {
    let trueNote = scale[note] + octave;
    synth.triggerAttackRelease(trueNote, length);
}

function setup() {
    Tone.start();
}

export {playNote, setup, major, minor, pentatonic, diatonic}