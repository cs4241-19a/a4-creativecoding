class Piano {

    gui = new dat.GUI();

    TWINKLE_TWINKLE = {
        notes: [
            {pitch: 60, startTime: 0.0, endTime: 0.5},
            {pitch: 60, startTime: 0.5, endTime: 1.0},
            {pitch: 67, startTime: 1.0, endTime: 1.5},
            {pitch: 67, startTime: 1.5, endTime: 2.0},
            {pitch: 69, startTime: 2.0, endTime: 2.5},
            {pitch: 69, startTime: 2.5, endTime: 3.0},
            {pitch: 67, startTime: 3.0, endTime: 4.0},
            {pitch: 65, startTime: 4.0, endTime: 4.5},
            {pitch: 65, startTime: 4.5, endTime: 5.0},
            {pitch: 64, startTime: 5.0, endTime: 5.5},
            {pitch: 64, startTime: 5.5, endTime: 6.0},
            {pitch: 62, startTime: 6.0, endTime: 6.5},
            {pitch: 62, startTime: 6.5, endTime: 7.0},
            {pitch: 60, startTime: 7.0, endTime: 8.0},
        ],
        totalTime: 8
    };

    rnn_vals = {
        steps: 40,
        temperature: 1.5
    };

    reverb = new Tone.Convolver('https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/hm2_000_ortf_48k.mp3').toMaster();

    sampler = new Tone.Sampler({
        C3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c3.mp3',
        'D#3': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds3.mp3',
        'F#3': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs3.mp3',
        A3: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a3.mp3',
        C4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c4.mp3',
        'D#4': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds4.mp3',
        'F#4': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs4.mp3',
        A4: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a4.mp3',
        C5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-c5.mp3',
        'D#5': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-ds5.mp3',
        'F#5': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-fs5.mp3',
        A5: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/969699/plastic-marimba-a5.mp3'
    }).connect(this.reverb);

    midiNotes = [];
    recordMode = false;

    // Magenta.js
    // let player = new mm.Player();
    vaePlayer = new mm.Player();
    rnnPlayer = new mm.Player();
    music_rnn;
    music_vae;

    autocomplete = false;

    constructor(div_id) {
        this.constructPiano(div_id);


        if (!this.music_rnn) {
            // let music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/basic_rnn');
            this.music_rnn = new mm.MusicRNN('https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn');
            this.music_rnn.initialize();
        }

        if (!this.music_vae) {
            this.music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_16bar_small_q2');
            this.music_vae.initialize();
        }

        this.gui.domElement.style.display = "none";
        this.controller = this.gui.add(this.sampler, 'attack', 0, 10).name("attack");
        this.controller = this.gui.add(this.sampler, 'release', 0, 1).name("release");
        this.controller = this.gui.add(this.rnn_vals, 'steps', 1, 40).name("steps");
        this.controller = this.gui.add(this.rnn_vals, 'temperature', 0.1, 2.5).name("temperature");
        this.controller.onChange(function (value) {
            console.log(value);
        });
    }


    playNote(msg) {
        console.log(msg);

        if (this.recordMode) this.midiNotes.push(msg.note);

        let freq = Tone.Frequency(msg.note, 'midi');
        this.sampler.triggerAttack(freq);

        if (this.autocomplete) {
            this.playMusicVAE();
        }
    }

    stopPlaying() {
        if (this.autocomplete) {
            if (this.vaePlayer.isPlaying()) {
                this.vaePlayer.stop();

            }
        }
    }


    improvise() {
        let seq = this.getSequence(this.midiNotes);
        this.playMusicRNN(seq);
        console.log("MIDI NOTES", this.midiNotes);
        this.midiNotes = [];
    }

    /**
     * A MusicRNN is an LSTM-based language model for musical notes -- it is best at continuing a NoteSequence that you give it.
     */
    playMusicRNN(sequence) {

        if (this.rnnPlayer.isPlaying()) {
            this.rnnPlayer.stop();
            return;
        }

        this.music_rnn.continueSequence(sequence, this.rnn_vals.steps, this.rnn_vals.temperature).then((sample) => {
            this.rnnPlayer.start(sample);
            this.rnnPlayer.callbackObject = {
                // This method is called every time we play a new note. We use
                // it to keep the visualization in sync with the audio.
                run: (note) => {
                    console.log(note);
                    const key = document.querySelector(`.key[data-key="${note.pitch}"]`);
                    Piano.animatePlay(key, note.pitch, false)
                },
                stop: () => {
                }
            };
        });
    }

    /**
     *  As a generative model, you can think of a VAE as coming up with new sequences that could be a decoding of some summarized version.
     */
    playMusicVAE() {

        if (this.vaePlayer.isPlaying()) {
            this.vaePlayer.stop();
            return;
        }

        this.vaePlayer.callbackObject = {
            // This method is called every time we play a new note. We use
            // it to keep the visualization in sync with the audio.
            run: (note) => {
                console.log(note);
                const key = document.querySelector(`.key[data-key="${note.pitch}"]`);
                Piano.animatePlay(key, note.pitch, false)
            },
            stop: () => {
            }
        };

        this.music_vae
            .sample(1, this.rnn_vals.temperature)
            .then((sample) => this.vaePlayer.start(sample[0]));

    }


    /**
     * Create a quantized sequence
     * @returns {{notes: [], quantizationInfo: {stepsPerQuarter: number}}}
     */
    getSequence(list) {
        const sequence = {notes: []};
        if (list.length <= 0) {
            console.log("DEFAULT SEQUENCE");
            return mm.sequences.quantizeNoteSequence(this.TWINKLE_TWINKLE, 1);
        } else {
            let noteNum = 0;
            for (let x of list) {
                sequence.notes.push(
                    {pitch: x, startTime: noteNum, endTime: noteNum + 0.5},
                );
                sequence.totalTime = noteNum + 1;
                noteNum += 0.5;
            }
            return mm.sequences.quantizeNoteSequence(sequence, 1);
        }
    }

    /** Animate Piano Keys **/
    static animatePlay(keyEl, note, isHuman) {
        console.log("animating");
        if (!keyEl) return;
        let sourceColor = isHuman ? '#1E88E5' : '#E91E63';
        let targetColor = keyEl.classList.contains("sharp") ? 'black' : 'white';
        keyEl.animate(
            [{backgroundColor: sourceColor}, {backgroundColor: targetColor}],
            {duration: 700, easing: 'ease-out'}
        );
    }

    constructPiano(div_id) {
        $(div_id).html("<div class=\"keys\">\n" +
            "        <div data-key=\"48\" class=\"key\" data-note=\"C\">\n" +
            "        </div>\n" +
            "        <div data-key=\"49\" class=\"key sharp\" data-note=\"C#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"50\" class=\"key\" data-note=\"D\">\n" +
            "        </div>\n" +
            "        <div data-key=\"51\" class=\"key sharp\" data-note=\"D#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"52\" class=\"key\" data-note=\"E\">\n" +
            "        </div>\n" +
            "        <div data-key=\"53\" class=\"key\" data-note=\"F\">\n" +
            "        </div>\n" +
            "        <div data-key=\"54\" class=\"key sharp\" data-note=\"F#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"55\" class=\"key\" data-note=\"G\">\n" +
            "        </div>\n" +
            "        <div data-key=\"56\" class=\"key sharp\" data-note=\"G#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"57\" class=\"key\" data-note=\"A\">\n" +
            "        </div>\n" +
            "        <div data-key=\"58\" class=\"key sharp\" data-note=\"A#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"59\" class=\"key\" data-note=\"B\">\n" +
            "        </div>\n" +
            "        <div data-key=\"60\" class=\"key\" data-note=\"C\">\n" +
            "        </div>\n" +
            "        <div data-key=\"61\" class=\"key sharp\" data-note=\"C#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"62\" class=\"key\" data-note=\"D\">\n" +
            "        </div>\n" +
            "        <div data-key=\"63\" class=\"key sharp\" data-note=\"D#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"64\" class=\"key\" data-note=\"E\">\n" +
            "        </div>\n" +
            "        <div data-key=\"65\" class=\"key\" data-note=\"F\">\n" +
            "        </div>\n" +
            "        <div data-key=\"66\" class=\"key sharp\" data-note=\"F#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"67\" class=\"key\" data-note=\"G\">\n" +
            "        </div>\n" +
            "        <div data-key=\"68\" class=\"key sharp\" data-note=\"G#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"69\" class=\"key\" data-note=\"A\">\n" +
            "        </div>\n" +
            "        <div data-key=\"70\" class=\"key sharp\" data-note=\"A#\">\n" +
            "        </div>\n" +
            "        <div data-key=\"71\" class=\"key\" data-note=\"B\">\n" +
            "        </div>\n" +
            "    </div>")
    }
}

export {Piano};