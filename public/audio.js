const major = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
const minor = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
const pentatonic = ['c', 'd', 'e', 'g', 'a'];
const diatonic = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];

let Tone = require("Tone");
let synth;

function playNote(note, scale, length, octave) {
    let trueNote = scale[note] + octave;
    synth.triggerAttackRelease(trueNote, length);
}

const getFromInstrument = function(newInstrument) {
    switch (newInstrument) {
        case 'AMSynth':
            return new Tone.AMSynth().toMaster();
        case 'DuoSynth':
            return new Tone.DuoSynth().toMaster();
        case 'FMSynth':
            return new Tone.FMSynth().toMaster();
        case 'MembraneSynth':
            return new Tone.MembraneSynth().toMaster();
        case 'MetalSynth':
            return new Tone.MetalSynth().toMaster();
        case 'MonoSynth':
            return new Tone.MonoSynth().toMaster();
        case 'NoiseSynth':
            return new Tone.NoiseSynth().toMaster();
        case 'PluckSynth':
            return new Tone.PluckSynth().toMaster();
        case 'PolySynth':
            return new Tone.PolySynth().toMaster();
        default:
            return new Tone.Synth().toMaster();
    }
};

function setup(newInstrument) {
    synth = getFromInstrument(newInstrument);
    Tone.start().catch(function (err) {
        console.log(err);
    });
}

export {playNote, setup, major, minor, pentatonic, diatonic};