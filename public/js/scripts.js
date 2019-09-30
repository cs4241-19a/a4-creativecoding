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

var gfx;
function setupCanvas() {
    var canvas = document.getElementById('canvas');
    gfx = canvas.getContext('2d');
    webkitRequestAnimationFrame(update);
}

function update() {
    webkitRequestAnimationFrame(update);
    if(!setup) return;
    gfx.clearRect(0,0,800,600);
    gfx.fillStyle = 'gray';
    gfx.fillRect(0,0,800,600);

    var data = new Uint8Array(samples);
    fft.getByteFrequencyData(data);
    gfx.fillStyle = 'red';
    for(var i=0; i<data.length; i++) {
        gfx.fillRect(100+i*4,100+256-data[i]*2,3,100);
    }

}


module.exports = { submit, play }
