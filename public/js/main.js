import {Piano} from './piano-module.js';
import {Sequencer} from "./sequencer-module.js";
import {hydra_samples} from "./hydra-samples.js";

/** TONE JS SETUP **/
let synthFilter = new Tone.Filter(300, 'lowpass').connect(
    new Tone.Gain(0.4).toMaster()
);
let synthConfig = {
    oscillator: {type: 'fattriangle'},
    envelope: {attack: 3, sustain: 1, release: 1}
};

let sequencer = new Sequencer();
let piano = new Piano("#piano");

// Edit mode
let dragged = false;

let syn = new Tone.Synth(synthConfig).connect(synthFilter).toMaster();
let synthsPlaying = {};

let bpm_dummy = {
    value: Tone.Transport.bpm.value
};

/** DAT GUI CONTROLLER **/
let gui = new dat.GUI();
let controller = gui.add(bpm_dummy, 'value', 0, 140).name("tempo");

controller.onChange(function (value) {
    // send tempo change
    socket.emit('chat message', {'room': subscription, 'msg': {tempo: value}});
    console.log(value);
});


//Tweaking tone and behavior of each instrument
Tone.Transport.bpm.value = 80;

const allNotes = ["C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2",
    "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3",
    "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5", "C#5", "D5", "D#5",
    "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5", "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6", "C7"];

// possible modes: tone, hydra, gibber, piano, audiovis, ....
let mode = "tone";

// let canvas = document.createElement('canvas');
let canvas = document.getElementById('myCanvas');
let hydra = new Hydra(canvas);

// Websocket
let socket = io();
let subscription = "global";

// Code Mirror
const cm = CodeMirror.fromTextArea(document.getElementById('code'), {
    theme: 'tomorrow-night-eighties',
    mode: {name: 'javascript', globallets: true},
    lineWrapping: true,
    styleSelectedText: true,
    extraKeys: {
        'Shift-Enter': function (instance) {
            socket.emit('hydra message', {'room': subscription, 'msg': cm.getValue()});
        }
    }
});

// TODO: Send Socket Message
const gibbercm = CodeMirror.fromTextArea(document.getElementById('gibber'), {
    theme: 'tomorrow-night-eighties',
    mode: {name: 'javascript', globallets: true},
    lineWrapping: true,
    styleSelectedText: true,
    extraKeys: {
        'Shift-Enter': function (instance) {
            //socket.emit('hydra message', {'room': subscription, 'msg': cm.getValue()});
            gibbercm.refresh();
            eval(gibbercm.getValue());
        }
    }
});

/**
 * When document is loaded
 */
$(document).ready(function () {

    // Update the logged on user
    $.getJSON("loggeduser", function (data) {
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty('username')) {
            // TODO: Change to display name
            $("#profile").text(data.username.username);
        }
    });

    /****** Bindings *****/
    $("#change-loop").bind("click", changeDrumLoop);
    $("#edit").bind("click", editMode);

    $("#synth").bind("click", function () {
        changeLoopMode("synth");
    });
    $("#drum").bind("click", function () {
        changeLoopMode("drum");
    });

    $("#start-loop").bind("click", function () {
        socket.emit('chat message', {room: subscription, msg: 'start loop'});
    });
    $("#stop-loop").bind("click", function () {
        socket.emit('chat message', {room: subscription, msg: 'stop loop'});
    });

    $("#improvise").bind("click", function () {
        piano.improvise();
    });

    $("#autocomplete").bind("click", function () {
        $("#autocomplete").toggleClass("hover");
        piano.autocomplete = !piano.autocomplete;
    });

    $("#record").bind("click", record);
    $("#dropdownbtn").bind("click", myFunction);

    $("#myDropdown button").bind("click", function (e) {
        changeMode($(this).attr("data-id"));
    });

    $("#audiovisualbuttons button").bind("click", function (e) {
        switch ($(this).attr("data-id")) {
            case 'first':
                firstVis();
                break;
            case 'second':
                secondVis();
                break;
            case 'third':
                thirdVis();
                break;
            case 'fourth':
                fourthVis();
                break;
            case 'fifth':
                fifthVis();
                break;
        }
    });

    $("#join-session").bind("click", joinSession);
    $("#save").bind("click", saveSession);
    $("#load").bind("click", loadSession);

    $("#drop_zone").bind("drop", dropHandler);
    $("#drop_zone").bind("dragover", dragOverHandler);
    $('#ex1').modal('show');

    /** Emit user has subscribed ***/
    socket.emit('subscribe', subscription);

    /** MIDI SETUP **/
    if (navigator.requestMIDIAccess) {
        console.log('This browser supports WebMIDI!');
        navigator.requestMIDIAccess()
            .then(onMIDISuccess, onMIDIFailure);

        function onMIDISuccess(midiAccess) {
            for (let input of midiAccess.inputs.values())
                input.onmidimessage = getMIDIMessage;

        }

        function onMIDIFailure() {
            console.log('Could not access your MIDI devices.');
        }
    } else {
        console.log('WebMIDI is not supported in this browser.');
    }

    function getMIDIMessage(message) {
        let command = message.data[0];
        let note = message.data[1];
        let velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

        switch (command) {
            case 144: // noteOn
                // attack
                playMidiNote(note, velocity);
                break;
            case 128: // noteOff
                // release
                stopMidiNode(note);
                break;
        }
    }

    $(".keys div").click(function () {
        let dk = $(this).attr("data-key");
        const key = document.querySelector(`.key[data-key="${dk}"]`);
        Piano.animatePlay(key, dk, true);
        socket.emit('midi message', {
            'room': subscription,
            'msg': {type: "start", note: dk, time: Tone.now(), speed: 90}
        });
    });

    function playMidiNote(note, velocity) {
        const key = document.querySelector(`.key[data-key="${note}"]`);
        if (key) {
            Piano.animatePlay(key, note, true);
        }
        socket.emit('midi message', {
            'room': subscription,
            'msg': {type: "start", note: note, time: Tone.now(), speed: velocity}
        });
    }

    function stopMidiNode(note) {
        piano.stopPlaying();
        socket.emit('midi message', {'room': subscription, 'msg': {type: "stop", note: note}});
    }

    // Removing styles
    $('[contenteditable]').on('paste', function (e) {
        e.preventDefault();
        let text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
        document.execCommand('insertText', false, text);
    });

    /***** WEB SOCKET LISTENERS *****/
    socket.on('time', function (msg) {
        stopLoop();
        for (let n of msg.msg) {
            $("div[data-code='" + n + "']").toggleClass("box-active");
        }
        sequencer.startLoop(msg.time);
    });

    socket.on('update', function (msg) {
        // Only send active nodes if a sequence is currently playing
        if (sequencer.playmode === "sequence") {
            emitActiveNotes();
        }
    });

    socket.on('midi message', function (msg) {
        console.dir("midi");
        if (msg.type === "start") {
            let synth = new Tone.Synth(synthConfig).connect(synthFilter);
            synthsPlaying[msg.note] = synth;
            // TODO: Fix feedback
            piano.playNote(msg);
        } else {
            if (synthsPlaying[msg.note]) {
                let synth = synthsPlaying[msg.note];
                synth.triggerRelease();
                setTimeout(() => synth.dispose(), 2000);
                synthsPlaying[msg.note] = null;
            }
        }
    });


    socket.on('chat message', function (msg) {
        if (msg === "start loop") {
            sequencer.startLoop(msg.time);
            return;
        }

        if (msg === "stop loop") {
            stopLoop();
            return;
        }

        if (mode === "hydra") {
            runHydra(msg);
            return;
        }

        if (msg.tempo) {
            // tempo change
            Tone.Transport.bpm.value = msg.tempo;
            return;
        }

        $("div[data-code='" + (msg + 40) + "']").toggleClass("box-active");
        if (sequencer.playmode === "single" || isNaN(msg)) {
            playNote(msg);
            setTimeout(function () {
                $("div[data-code='" + (msg + 40) + "']").removeClass("box-active");
            }, 200);
        }
    });

    socket.on('hydra message', function (msg) {
        console.log("hydra message");

        console.log("msg", msg);
        cm.setValue(msg);
        cm.refresh();
        eval(cm.getValue());
    });

    // Run initial hydra code
    hydra.src(o0)
        .modulate(o0, 0.0001)
        .layer(shape(3, 0.3, 0).diff(shape()).rotate(0, 0.1).repeat([1, 1], 1).scale([0.1, 0.2, 0.5, 1, 2].fast()).scrollX(0, 0).luma(0.6).invert(() => Math.sin(time)))
        .modulateRotate(osc(10, 0.1, 0.2), -0.01)
        .scrollX(-0.001)
        .out();

    $('.box').on('mousedown', async function (e) {
        if ($(this).attr("data-file")) {
            // midi file
            if ($(this).attr("data-file") == "stop") {
                clearMidiD3();
                return;
            }

            const midi = await Midi.fromUrl("midi/" + $(this).attr("data-file"));
            showMidiVis(midi);
            return;
        }

        if (isNaN($(this).attr("data-code"))) {
            socket.emit('chat message', {'room': subscription, 'msg': $(this).attr("data-code")});
        } else {
            socket.emit('chat message', {'room': subscription, 'msg': $(this).attr("data-code") - 40});
        }
    });

    $(window).keydown(function (e) {
        if (mode === "tone") {
            let code = e.keyCode;
            socket.emit('chat message', {'room': subscription, 'msg': code - 40});
        }
    });

    function playNote(i) {
        console.log("playnote", i);
        if (isNaN(i)) {
            return sequencer.playEffect(i)
        }

        return sequencer.playNote(i)
    }
});

function stopLoop() {
    // De-select all selected keys
    $(".pad").children().removeClass("box-active");
    $('#drum').attr("disabled", true);

    $('#stop-loop').addClass('hover');
    $('#start-loop').removeClass('hover');

    sequencer.playmode = "single";
    Tone.Transport.stop();

    $('.pad').children().removeClass('hover');
}

function changeLoopMode(v) {
    if (v === "synth") {
        $('#synth').addClass('hover');
        $('#drum').removeClass('hover');
        $('#change-loop').attr("disabled", true);
    } else {
        $('#change-loop').attr("disabled", false);
        $('#drum').addClass('hover');
        $('#synth').removeClass('hover');
    }
    sequencer.loop_mode = v;
    if (sequencer.playmode === "sequence") sequencer.startLoop();
}

function changeDrumLoop() {
    if (sequencer.drum_mode === "analog") {
        sequencer.drum_mode = "dubstep";
    } else if (sequencer.drum_mode === "dubstep") {
        sequencer.drum_mode = "electronic";
    } else if (sequencer.drum_mode === "electronic") {
        sequencer.drum_mode = "hiphop";
    } else if (sequencer.drum_mode === "hiphop") {
        sequencer.drum_mode = "percussion";
    } else if (sequencer.drum_mode === "percussion") {
        sequencer.drum_mode = "analog";
    }
    createSnackBar("Changed to " + sequencer.drum_mode)
}

function editMode() {
    $('#edit').toggleClass('hover');
    $('.pad').draggable();
    $('.pad-top').draggable();
    $('#profile-div').draggable();
    $('#help-div').draggable();


    if (dragged) {
        $('.pad').draggable("disable");
        $('.pad-top').draggable("disable");
        $('#profile-div').draggable("disable");
        $('#help-div').draggable("disable");
        dragged = false;
    } else {
        $('.pad').draggable("enable");
        $('.pad-top').draggable("enable");
        $('#profile-div').draggable("enable");
        $('#help-div').draggable("enable");
        dragged = true;
    }
}

/**
 * Joins a session
 */
function joinSession() {
    let session = prompt("What's the session key? Type a new key to create a session, or an existing one to join.");
    if (session == "" || session == null) {
        console.log("Not joining");
        return;
    }
    socket.emit('unsubscribe', subscription);
    socket.emit('subscribe', session);
    subscription = session;
    alert("Joined session " + session + "!");
}

/**
 * Saves a session
 */
function saveSession() {
    let response = prompt("What do you want to call this?.");

    if (response == "" || response == null) {
        console.log("Not saving");
        return;
    }

    $.getJSON("loggeduser", function (data) {
        console.log(data);
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty('username')) {
            console.log(data.username._id);
            $.post("savesession", {
                hydra: cm.getValue(),
                tone: getActiveNoteList(),
                user: data.username._id,
                name: response
            });
        }
    });
}


/**
 * Loads a session
 */
function loadSession() {
    let response = prompt("What is the name of the session?");

    if (response == "" || response == null) {
        console.log("Not loading");
        return;
    }

    $.getJSON("loggeduser", function (data) {
        // Make sure the data contains the username as expected before using it
        if (data.hasOwnProperty('username')) {
            $.getJSON("sessions?&id=" + data.username._id + "&name=" + response, function (data) {
                console.log(data);
                if (data[0]) {
                    // TODO: Refactor out emits into functions?

                    // For all users
                    socket.emit('hydra message', {'room': subscription, 'msg': data[0].hydra});

                    // load music if there
                    if (data[0].tone.length > 0) {
                        console.log("TONE IS FILLED");
                        socket.emit('time', {'room': subscription, 'msg': data[0].tone, 'time': Tone.now()});
                    }
                } else {
                    alert("Couldn't find session " + response + "!")
                }
            });
        }
    });
}

/**
 * Runs a hydra thingy
 * @param msg
 */
function runHydra(msg) {
    //todo: get code mappings from js file
    let code;
    switch (msg) {
        case 'a':
            code = 'osc().out()';
            break;
        case 'b':
            code = 'solid().out()';
            break;
        case 'c':
            code = 'voronoi().out()';
            break;
        case 'd':
            code = 'gradient().out()';
            break;
        case 'e':
            code = 'shape(5).out()';
            break;
        case 'f':
            code = 'noise().out()';
            break;
        case 'g':
            code = 's0.initCam() \nsrc(s0).out()';
            break;
        case 'h':
            alert("Make sure you have the ScreenCapture extension from https://github.com/ojack/hydra");
            code = 's1.initScreen() \nsrc(s1).out()';
            break;
        case 'i':
            code = 'shape(5, () => a.fft[2]).out()\n' +
                'a.show()\n';
            break;
        case 'j':
            keys = Object.keys(hydra_samples);
            code = hydra_samples[keys[keys.length * Math.random() << 0]];
            break;

    }
    socket.emit('hydra message', {'room': subscription, 'msg': code});
}

/**
 * Gets active note list
 * @returns {[]}
 */
function getActiveNoteList() {
    let data_codes = [];
    $('.pad').children().each(function () {
        if ($(this).hasClass('box-active')) {
            console.log($(this).attr("data-code"));
            data_codes.push($(this).attr("data-code"));
        }
    });

    return data_codes;
}


function emitActiveNotes() {
    socket.emit('time', {'room': subscription, 'msg': getActiveNoteList(), 'time': Tone.now()});
}

/**
 * Toggles record mode
 */
function record() {
    if (piano.recordMode) {
        piano.recordMode = false;
        $("#record").text("record");
    } else {
        piano.recordMode = true;
        $("#record").text("stop");
    }
}

// Init Gibber
Gibber.init();


// FILE DROPPING
function dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    console.log(ev);
    ev.dataTransfer = ev.originalEvent.dataTransfer;

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                let file = ev.dataTransfer.items[i].getAsFile();
                console.log('... file[' + i + '].name = ' + file.name);

                // load a midi file in the browser
                const reader = new FileReader();
                reader.onload = function (e) {
                    const midi = new Midi(e.target.result);
                    showMidiVis(midi);

                };
                reader.readAsArrayBuffer(file)

            }
        }
    } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
        }
    }
}

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

let midiSynths = [];

function clearMidiD3() {
    for (let midisynth of midiSynths) {
        midisynth.dispose();
    }
    midiSynths = [];
    d3.select("#svg-container").selectAll("svg").remove();
}

function showMidiVis(midi) {
    $("#drop_zone").css({opacity: 0});
    // clear all
    clearMidiD3();

    // d3
    let width = Math.max(960, innerWidth),
        height = Math.max(500, innerHeight);

    let i = 0;

    let svg = d3.select("#svg-container")
        .append("svg")
        .style("z-index", 1)
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    // THE TRACK
    const now = Tone.now() + 0.5;
    midi.tracks.forEach(track => {
        const notes = track.notes;
        const synth = new Tone.PolySynth(10, Tone.Synth, {
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.3,
                release: 1
            }
        }).toMaster();

        midiSynths.push(synth);

        notes.forEach(note => {
            synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
            // TODO: d3?

            setTimeout(particle, (note.time + 0.5) * 1000);

            function particle() {
                let heightScale = d3.scaleLinear()
                    .range([0, window.innerHeight])
                    .domain([0, 128]);

                let widthScale = d3.scaleLinear()
                    .range([0, window.innerWidth])
                    .domain([0, 128]);

                svg.insert("circle", "rect")
                    .attr("cx", widthScale(note.midi))
                    .attr("cy", window.innerHeight / 2)
                    // .attr("cy", heightScale(note.midi))
                    .attr("r", 1e-6)
                    .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
                    .style("fill", d3.hsl((i = (i + 1) % 360), 1, .5))
                    .style("stroke-opacity", 1)
                    .style("fill-opacity", 1)
                    .transition()
                    .duration(note.duration * 1000)
                    .ease(Math.sqrt)
                    .attr("r", 200)
                    .style("stroke-opacity", 1e-6)
                    .style("fill-opacity", 1e-6)
                    .remove();
            }
        })
    })
}

/**
 * Creates a snack bar
 * @param text
 */
function createSnackBar(text) {
    // Snackbar
    let x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = text;
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}


/**
 * Drop Down Functionality
 */
window.myFunction = function () {
    document.getElementById("myDropdown").classList.toggle("drp-show");
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('drp-show')) {
                openDropdown.classList.remove('drp-show');
            }
        }
    }
};


/**
 * Change Modes
 */
function hideAll() {
    $("#myCanvas").hide();
    $(".pad").hide();
    $(".pad-top").hide();
    $("#hydra-div").hide();
    $(".CodeMirror").hide();
    $(".piano").hide();
    $("#audiovisualbuttons").hide();
    $("#midioptions").hide();
    $("#audiovisual").hide();
    $("#svg-container").hide();
    $("#midi-container").hide();
    $("#piano-side-buttons").hide();
    $("#sequence-div").hide();
    $("#drum-side-buttons").hide();
    $(".dg").hide();

    gui.domElement.style.display = "none";
}

function changeMode(m) {
    if (m === "tone") {
        mode = "tone";
        hideAll();
        $("#myCanvas").show();
        $(".pad").show();
        $(".pad-top").show();
        gui.domElement.style.display = "block";

        $("#sequence-div").show();
        $("#drum-side-buttons").show()

    } else if (m === "hydra") {
        // change to hydra
        mode = "hydra";
        hideAll();
        $("#hydra-div").show();
        $("#myCanvas").show();
        cm.getWrapperElement().style.display = "block";
        gibbercm.getWrapperElement().style.display = "none";
        cm.refresh();
    } else if (m === "piano") {
        // change to piano
        mode = "piano";
        hideAll();
        $("#piano-side-buttons").show();
        $("#myCanvas").show();
        $(".piano").show();

        $(".dg").show();
        gui.domElement.style.display = "none";

    } else if (m === "gibber") {
        // change to gibber
        mode = "gibber";
        hideAll();
        $("#myCanvas").show();
        cm.getWrapperElement().style.display = "none";
        gibbercm.getWrapperElement().style.display = "block";
        gibbercm.refresh();
    } else if (m === "audiovisual") {
        // change to audiovisual
        mode = "audiovisual";
        hideAll();

        $("#audiovisualbuttons").show();
        $("#audiovisual").show();

        // TEST
        $("#renderer").show();
        firstVis();
        // TEST

    } else if (m == "d3") {
        // change to midi editor
        hideAll();
        mode = "d3";

        let width = Math.max(960, innerWidth),
            height = Math.max(500, innerHeight);

        let i = 0;

        $("#svg-container").show();
        // d3.select("#svg-container").selectAll("svg").remove();

        let svg = d3.select("#svg-container svg")
            .attr("width", width)
            .attr("height", height);

        if (d3.select("#svg-container svg")._groups[0][0] == null) {
            console.log("wooo");
            svg = d3.select("#svg-container")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
        }

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

        function particle() {
            let m = d3.mouse(this);
            let heightScale = d3.scaleLinear()
                .domain([0, window.innerHeight])
                .range([15, -15]);

            let widthScale = d3.scaleLinear()
                .domain([0, window.innerWidth])
                .range([0, 72]);

            // TODO: Reset after this view?
            syn.volume.value = Math.floor(heightScale([m[1]]));
            syn.triggerAttackRelease(allNotes[Math.floor(widthScale([m[0]]))], "8n");


            svg.insert("circle", "rect")
                .attr("cx", m[0])
                .attr("cy", m[1])
                .attr("r", 1e-6)
                .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
                .style("stroke-opacity", 1)
                .transition()
                .duration(2000)
                .ease(Math.sqrt)
                .attr("r", 100)
                .style("stroke-opacity", 1e-6)
                .remove();

            d3.event.preventDefault();
        }
    } else if (m == "midi") {
        // midi
        hideAll();
        // TODO: Drag and drop midi file for editing
        mode = "midi";
        $("#svg-container").show();
        $("#midi-container").show();
        $("#midioptions").show();

    }
    createSnackBar("Changed to " + mode + " mode.");
}