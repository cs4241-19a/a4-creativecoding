$(document).ready(() => {
  let audioContext = null
  let audioIntervalId = null

  // Create a socket object for communicating information about the markov chain
  const socket = io()

  $('.button-loading').hide()
  let processing = false

  $('.video-input-form').submit(() => {
    if (!processing) {
      $('.button-loading').show()
      $('.button-idle').hide()
      $('.video-url-input').prop('disabled', 'disabled')
      processing = true

      // Create an AudioContext for output
      if (audioContext) {
        audioContext.close()
        clearInterval(audioIntervalId)
      }
      audioContext = new AudioContext()
      const audioContextTimestamp = Date.now()
      const bufferSource = audioContext.createBufferSource()
      const resonanceAudio = new ResonanceAudio(audioContext)
      resonanceAudio.output.connect(audioContext.destination)

      // Open an XMLHttpRequest to stream audio data from YouTube
      const videoUrl = $('.video-url-input').val()
      let videoId = ''
      try {
        videoId = videoUrl.split('=')[1]
      } catch (error) {
      // eslint-disable-next-line no-console
        console.error('Unable to parse video ID. Our code is also really bad.')
        processing = false
        return
      }
      const request = new XMLHttpRequest()
      request.open('POST', `/stream/${videoId}`, true)
      request.responseType = 'arraybuffer'
      request.onload = function() {
        // Decode the arraybuffer from the XMLHttpRequest
        audioContext.decodeAudioData(request.response, buffer => {
          // Process the audio stream for spatialization
          calculateSpatialVectors(buffer, peaks => {
            $('.button-loading').hide()
            $('.button-idle').show()
            $('.video-url-input').removeAttr('disabled')
            processing = false
            // Connect the audio buffer to the AudioContext for output
            const source = resonanceAudio.createSource()
            bufferSource.buffer = buffer
            bufferSource.connect(source.input)
            bufferSource.start()
            const audioContextDelay = Date.now() - audioContextTimestamp

            // Request the current state of the markov chain from the server
            socket.emit('get-markov', pdf => {
              const sequence = new Sequence(pdf, peaks)
              const positionVector = sequence.getPointList()
              audioIntervalId = setInterval(() => {
                const frame = Math.round(
                  audioContext.currentTime * 1000 - audioContextDelay)
                source.setPosition(...positionVector[frame])
              }, UPDATE_RATE)

              bufferSource.onended = () => {
                clearInterval(audioIntervalId)
              }

              $('.pause').off().on('click', () => {
                audioContext.suspend()
              })

              $('.resume').off().on('click', () => {
                audioContext.resume()
              })

              $('.upvote').off().on('click', () => {
                alert('Sequence upvoted!')
                socket.emit('update-markov', {
                  direction: 1,
                  sequence: sequence
                })
              })

              $('.downvote').off().on('click', () => {
                alert('Sequence downvoted!')
                socket.emit('update-markov', {
                  direction: -1,
                  sequence: sequence
                })
              })
            })
          })
        }, error => {
          alert('Unable to process audio stream! Fuck!')
          $('.button-loading').hide()
          $('.button-idle').show()
          $('.video-url-input').removeAttr('disabled')
          processing = false
          // eslint-disable-next-line no-console
          console.error(error)
        })
      }
      request.send()
    }
    return false
  })
})
