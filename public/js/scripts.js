const gui= require('myGui')

console.log("Welcome to assignment 3!")

let audioContext = null
let audioIntervalId = null
const bufferSource
var fft; //fft audio node
var samples = 128;
var setup = false; //indicate if audio is set up yet

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
    return 0;
  }
  // var analyser = audioContext.createAnalyser()
  // source = audioContext.createMediaStreamSource(stream);
  // source.connect(analyser);
  // analyser.connect(distortion);
  // distortion.connect(audioContext.destination);

  bufferSource.connect(audioContext.destination)
  bufferSource.start(0)
}


module.exports = { submit, play }
