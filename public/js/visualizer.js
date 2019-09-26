const startMello = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/mello.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + b + "," + g + "," + r + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

const startAC = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/acdc.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + g+ "," + r + "," + b + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

const startElectro = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/shelter.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + r + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

const startRamm = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/deutschland.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

const startInst = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/inst.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + r + "," + b + "," + g + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

const startBeat = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/exploder.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + g + "," + b + "," + r + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

const startDub = function() {
    document.getElementById('canvas').innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    document.getElementById('canvas').appendChild( canvas )
    canvas.width = 1500;
    canvas.height = 800;
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    document.getElementById('canvas').appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048;
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    audioElement.src = '../media/dubstep.mp3';
    audioElement.play()

    const results = new Uint8Array( analyser.frequencyBinCount )

    draw = function() {
        // temporal recursion, call tthe function in the future
        window.requestAnimationFrame( draw )

        // ctx.fillStyle = 'black'
        // ctx.fillRect( 0,0,canvas.width,canvas.height )
        // ctx.fillStyle = 'white'

        analyser.getByteFrequencyData( results )

        let x = 0;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
            //ctx.fillRect( i, 0, 1, results[i] ) // upside down
            let barHeight = results[i] * 2 + 60;

            var r = barHeight + (25 * (i/analyser.frequencyBinCount));
            var g = 250 * (i/analyser.frequencyBinCount);
            var b = 50;

            ctx.fillStyle = "rgb(" + b + "," + r + "," + g + ")";
            ctx.fillRect(x, canvas.height - barHeight, (canvas.width/analyser.frequencyBinCount) * 2.5, barHeight);

            x += (canvas.width/analyser.frequencyBinCount) * 2.5 + 1;
        }
    }
    draw()
}

window.onload = function() {
    document.getElementById('mello').onclick = startMello;
    document.getElementById('rammstein').onclick = startRamm;
    document.getElementById('electro').onclick = startElectro;
    document.getElementById('instru').onclick = startInst;
    document.getElementById('beats').onclick = startBeat;
    document.getElementById('dubstep').onclick = startDub;
    document.getElementById('acdc').onclick = startAC;
}