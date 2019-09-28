import {prepAudio} from "./prepareAudioForAnalysis.js"
let file, fileLabel, mediaElement, analyser, audioContext;

window.onload = function () {
    vizInit()
}


//will get the submitted audio file, label it,
// and assign it to a letiable for future use
//after user submits the file
let vizInit = function (){
    file = document.getElementById("thefile");
    fileLabel = document.querySelector("label.file");
    mediaElement = document.getElementById("audio");


    //if the user changes the file (uploads or reuploads)
    file.onchange = function(){
        fileLabel.classList.add('normal');
        mediaElement.classList.add('active');
        let files = this.files;

        mediaElement.src = URL.createObjectURL(files[0]);
        mediaElement.load();
        mediaElement.play();

        //call the function that generates the graphics
        init();
    }
};


//function to initialize the drawing of the elements
function init(){
    //creates audio context and analyzer
    //connect the analyzer with the gain handler
    //connect the gain handler to the song
    let audioElements = prepAudio(mediaElement);
    audioContext = audioElements.audioContext;
    analyser = audioElements.analyser;


    //get fft waveform of audio at every update (every frame)
    //returning in Uint8Array gives us the exact range needed to perform Canvas pixel manipulation
    const spectrum = new Uint8Array(analyser.frequencyBinCount)
    ;(function updateSpectrum() {
        requestAnimationFrame(updateSpectrum);
        analyser.getByteFrequencyData(spectrum)
    })();

    //initialize canvas, compile shader
    const fragCanvas = document.getElementById('oscillatingElement');
    fragCanvas.width = window.innerWidth;
    fragCanvas.height = window.innerHeight;
    const gl = fragCanvas.getContext('webgl') || fragCanvas.getContext('experimental-webgl');
    const vertexShaderSrc = document.getElementById('vertexShader').textContent;
    const fragmentShaderSrc = document.getElementById('fragmentShader').textContent;
    const fragShader = createShader(gl, vertexShaderSrc, fragmentShaderSrc);


    //initialize shader letiables
    const fragPosition = gl.getAttribLocation(fragShader, 'position');
    gl.enableVertexAttribArray(fragPosition);
    const fragTime = gl.getUniformLocation(fragShader, 'time');
    gl.uniform1f(fragTime, audioContext.currentTime);
    const fragResolution = gl.getUniformLocation(fragShader, 'resolution');
    gl.uniform2f(fragResolution, fragCanvas.width, fragCanvas.height);
    const fragSpectrumArray = new Uint8Array(4 * spectrum.length);



    //initialize fullscreen rectangle and start render loop
    //update time and spectrum letiable in every frame
    initQuad(gl);

    function renderFragment() {
        requestAnimationFrame(renderFragment);
        gl.uniform1f(fragTime, audioContext.currentTime);
        copyAudioDataToTexture(gl, spectrum, fragSpectrumArray);
        renderQuad(gl)
    }
    renderFragment()
}


//will generate a fullscreen rectangle (quad). we will draw the fragment shader on top of this
//initializing elements of the rectangle
function initQuad(gl) {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]); //indices of the vertices
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
}

//rendering rectangle as two back to back triangles
function renderQuad(gl) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

//creating shaders
//will take a vertex shader and a fragment shader, and return the compiled shader program
function createShader(gl, vertexShaderSrc, fragmentShaderSrc) {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(vertexShader))
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(fragmentShader))
    }

    const shader = gl.createProgram();
    gl.attachShader(shader, vertexShader);
    gl.attachShader(shader, fragmentShader);
    gl.linkProgram(shader);
    gl.useProgram(shader);

    return shader
}

function copyAudioDataToTexture(gl, audioData, textureArray) {
    for (let i = 0; i < audioData.length; i++) {
        textureArray[2 * i    ] = audioData[i]; // R
        textureArray[2 * i + 1] = audioData[i]; // G
        textureArray[2 * i + 2] = audioData[i]; // B
        textureArray[2 * i + 3] = 255          // A
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, audioData.length, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureArray);
}