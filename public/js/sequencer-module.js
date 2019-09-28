class Sequencer {
    // Modes
    playmode = "single";
    loop_mode = "synth";
    drum_mode = "analog";
    synthLoop;
    drumLoop;

    // Synths
    snr = new Tone.Synth().toMaster();
    bass = new Tone.MembraneSynth().toMaster();
    cym = new Tone.Synth().toMaster();
    syn = new Tone.Synth({
        oscillator: {type: 'fattriangle'},
        envelope: {attack: 3, sustain: 1, release: 1}
    }).connect(new Tone.Filter(300, 'lowpass').connect(
        new Tone.Gain(0.4).toMaster()
    )).toMaster();

    // Sounds
    allNotes = ["C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2",
        "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3",
        "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
        "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6",
        "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6", "C7"];

    map = {
        a: {track: "music/dnb/ALPHA1.wav"},
        b: {track: "music/dnb/ESHER1.wav"},
        c: {track: "music/dnb/glory11.WAV"},
        d: {track: "music/dnb/LITE1.wav"},
        e: {track: "music/dnb/mudab11.WAV"},
        f: {track: "music/dnb/PAD1.wav"},
        g: {track: "music/dnb/PHAZER1.wav"},
        h: {track: "music/dnb/wax11.WAV"},
        /// here
        i: {track: "/music/drum-kits/analog/clap.mp3"},
        j: {track: "/music/drum-kits/analog/hihat-closed.mp3"},
        k: {track: "/music/drum-kits/analog/hihat-open.mp3"},
        l: {track: "/music/drum-kits/analog/kick.mp3"},
        m: {track: "/music/drum-kits/analog/ride.mp3"},
        n: {track: "/music/drum-kits/analog/snare.mp3"},
        o: {track: "/music/drum-kits/analog/tom-high.mp3"},
        p: {track: "/music/drum-kits/analog/tom-low.mp3"}
    };

    /**
     * Starts the sequencer loop
     */
    startLoop() {
        Tone.Transport.stop();
        if (this.synthLoop) this.synthLoop.stop();
        if (this.drumLoop) this.drumLoop.stop();

        $('#start-loop').addClass('hover');
        $('#stop-loop').removeClass('hover');
        $('#stop-loop').attr("disabled", false);
        $('#drum').attr("disabled", false);

        this.playmode = "sequence";

        if (this.loop_mode === "synth") {
            this.synthLoop = new Tone.Sequence(function (time, col) {
                let n1 = $('.pad').children().eq(col).hasClass("box-active") ? ($('.pad').children().eq(col).attr('data-code')) : 0;
                let n2 = $('.pad').children().eq(col + 6).hasClass("box-active") ? ($('.pad').children().eq(col).attr('data-code')) : 0;
                let n3 = $('.pad').children().eq(col + 12).hasClass("box-active") ? ($('.pad').children().eq(col).attr('data-code')) : 0;
                let n4 = $('.pad').children().eq(col + 18).hasClass("box-active") ? ($('.pad').children().eq(col).attr('data-code')) : 0;

                $('.pad').children().removeClass('hover');

                $('.pad').children().eq(col).addClass('hover');
                $('.pad').children().eq(col + 7).addClass('hover');
                $('.pad').children().eq(col + 14).addClass('hover');
                $('.pad').children().eq(col + 21).addClass('hover');

                if (n1) {
                    this.snr.triggerAttackRelease(this.allNotes[n1 - 40], "10hz", time);
                }
                if (n2) {
                    this.bass.triggerAttackRelease(this.allNotes[n2 - 40], "10hz", time);
                }
                if (n3) {
                    this.cym.triggerAttackRelease(this.allNotes[n3 - 40], "10hz", time);
                }
                if (n4) {
                    this.syn.triggerAttackRelease(this.allNotes[n4 - 40], "10hz", time);
                }

            }.bind(this), [0, 1, 2, 3, 4, 5, 6], "16n").start();
            Tone.Transport.start();
        } else {
            this.drumLoop = new Tone.Sequence(function (time, col) {
                let n1 = $('.pad').children().eq(col).hasClass("box-active") ? "/music/drum-kits/" + this.drum_mode + "/clap.mp3" : 0;
                let n2 = $('.pad').children().eq(col + 6).hasClass("box-active") ? "/music/drum-kits/" + this.drum_mode + "/snare.mp3" : 0;
                let n3 = $('.pad').children().eq(col + 12).hasClass("box-active") ? "/music/drum-kits/" + this.drum_mode + "/hihat-open.mp3" : 0;
                let n4 = $('.pad').children().eq(col + 18).hasClass("box-active") ? "/music/drum-kits/" + this.drum_mode + "/tom-mid.mp3" : 0;

                $('.pad').children().removeClass('hover');

                $('.pad').children().eq(col).addClass('hover');
                $('.pad').children().eq(col + 7).addClass('hover');
                $('.pad').children().eq(col + 14).addClass('hover');
                $('.pad').children().eq(col + 21).addClass('hover');

                if (n1) {
                    let player = new Tone.Player(n1).toMaster();
                    player.autostart = true;
                }
                if (n2) {
                    let player = new Tone.Player(n2).toMaster();
                    player.autostart = true;
                }
                if (n3) {
                    let player = new Tone.Player(n3).toMaster();
                    player.autostart = true;
                }
                if (n4) {
                    let player = new Tone.Player(n4).toMaster();
                    player.autostart = true;
                }

            }.bind(this), [0, 1, 2, 3, 4, 5, 6], "16n").start();
            Tone.Transport.start();
        }
    }

    /**
     * Plays the ith effect
     * @param i
     */
    playEffect(i) {
        let track = this.map[i].track;
        if (this.map[i].player) {
            console.log(this.map[i].player.state);
            if (this.map[i].player.state === "started") {
                this.map[i].player.stop();
                return;
            }
        }
        this.map[i].player = new Tone.Player(track).toMaster();
        this.map[i].player.autostart = true;

    }


    playNote(i) {
        this.syn.triggerAttackRelease(this.allNotes[i], "8n");
    }
}

export {Sequencer};