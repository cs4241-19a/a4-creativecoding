// Add some Javascript code here, to run on the front end.

console.log("Welcome to assignment 3!")

function submit( e ) {

  console.log('button pressed')
  let audioContext = null
  let audioIntervalId = null
      // Create an AudioContext for output
      if (audioContext) {
        audioContext.close()
        clearInterval(audioIntervalId)
      }
      audioContext = new AudioContext()
      const bufferSource = audioContext.createBufferSource()
      // const resonanceAudio = new ResonanceAudio(audioContext)
      // resonanceAudio.output.connect(audioContext.destination)

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
          // console.log('about to start buffer')
          bufferSource.buffer = buffer
          bufferSource.connect(audioContext.destination)
          bufferSource.start(0)
          // console.log('buffer started')
        }, error => {
          alert('Unable to process audio stream')
          console.error(error)
        })
      }

      request.send()
    return false
}


modules.exports = { submit }
