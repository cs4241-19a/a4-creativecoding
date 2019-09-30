const gui= require('myGui')

console.log("Welcome to assignment 3!")

let audioContext = null
let audioIntervalId = null
let bufferSource = null
let fft = null //fft audio node
let samples = 128
let setup = false //indicate if audio is set up yet

function submit( e ) {
  console.log('button pressed')
      // Create an AudioContext for output
      if (audioContext) {
        audioContext.close()
        clearInterval(audioIntervalId)
      }
      audioContext = new AudioContext()
      bufferSource = audioContext.createBufferSource()
      // Open an XMLHttpRequest to stream audio data from YouTube
      const videoUrl = document.querySelector( '#ytvid' ).value;
      let videoId = ''
      try {
        videoId = videoUrl.split('=')[1]
      } catch (error) {
      // eslint-disable-next-line no-console
        console.log('failed to split video url. try again.')
        return
      }
      const request = new XMLHttpRequest()
      request.open('POST', `/stream/${videoId}`, true)
      request.responseType = 'arraybuffer'
      request.onload = function() {
        console.log('starting audio decode')
        // Decode the arraybuffer from the XMLHttpRequest
        audioContext.decodeAudioData(request.response, buffer => {
          // Connect the audio buffer to the AudioContext for output
          bufferSource.buffer = buffer
          setupCanvas()
          play()

        }, error => {
          alert('Unable to process audio stream')
          console.error(error)
        })
      }
      request.send()
    return false
}

function play(){
  if (!audioContext) {
    return 0
  }
  //create fft
  fft = audioContext.createAnalyser();
  fft.fftSize = samples;

  //connect them up into a chain
  bufferSource.connect(fft);
  fft.connect(audioContext.destination);

  bufferSource.start(0)
  setup = true
}

let gProps = {
  style: 2,
  R: 255,
  G: 0,
  B: 0,
  thiqness: 15,
  height: 100,
  spread: 4
}

var gfx;
function setupCanvas() {
    var canvas = document.getElementById('canvas');
    gfx = canvas.getContext('2d');
    window.requestAnimationFrame(update);

    gui.loadGUI(gProps)
}


function update(){
  if(gProps.style === 1){
    sinDraw()
  }else{
    barDraw()
  }
}

function sinDraw(){
  fft.fftSize = 2048
  var bufferLength = fft.frequencyBinCount
  var dataArray = new Uint8Array(bufferLength)
  gfx.clearRect(0, 0, 800, 600)

  function draw() {
    let drawVisual = requestAnimationFrame(draw)
    fft.getByteTimeDomainData(dataArray)
    gfx.fillStyle = 'rgb(' + (255- gProps.R) + ', ' + (255- gProps.G) + ', '+ (255- gProps.B) + ')'
    gfx.fillRect(0, 0, 800, 600)
    gfx.lineWidth = 2
    gfx.strokeStyle = 'rgb(' + gProps.R + ', ' + gProps.G + ', '+gProps.B + ')'
    gfx.beginPath()
    let sliceWidth = 800 * 1.0 / bufferLength;
    let x = 0;
    for(let i = 0; i < bufferLength; i++) {

        let v = dataArray[i] / 128.0;
        let y = v * 600/2;

        if(i === 0) {
          gfx.moveTo(x, y);
        } else {
          gfx.lineTo(x, y);
        }

        x += sliceWidth;
      }
      gfx.lineTo(canvas.width, canvas.height/2);
      gfx.stroke();
    }
    //start
    draw()
}


function barDraw() {
    window.requestAnimationFrame(update);
    if(!setup) return;
    gfx.clearRect(0,0,1000,800);
    gfx.fillStyle = 'rgb(' + (255- gProps.R) + ', ' + (255- gProps.G) + ', '+ (255- gProps.B) + ')';
    gfx.fillRect(0,0,1000,800);

    var data = new Uint8Array(samples);
    fft.getByteFrequencyData(data);
    gfx.fillStyle = 'rgb(' + gProps.R + ', ' + gProps.G + ', '+gProps.B + ')';
    for(var i=0; i<data.length; i++) {
        // gfx.fillRect(100+i*(gProps.thiqness+1),100+256-data[i]*2,(gProps.thiqness),100);
        gfx.fillRect(10+i*(gProps.thiqness+1),(100+356-data[i]*.5*(gProps.spread)),(gProps.thiqness),(gProps.height));
    }
}



module.exports = { submit, play, setupCanvas }
