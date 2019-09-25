const major = ['c4', 'd4', 'e4', 'f4', 'g4', 'a4', 'b4'];
const minor = ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4'];
const pentatonic = ['c4', 'd4', 'e4', 'g4', 'a4'];
const diatonic = ['f4', 'c4', 'g4', 'd4', 'a4', 'e4', 'b4'];

let Tone = require("Tone");

//create a synth and connect it to the master output (your speakers)
let synth = new Tone.Synth().toMaster();

function playNote(note, scale, length) {
    console.log(scale[note]);
    synth.triggerAttackRelease(scale[note], length);
}

function setup() {
    Tone.start();
}

export {playNote, setup, major, minor, pentatonic, diatonic}