const audioData = {

  state: {
    player: null,
    analyser: null,
    audioElement: null,
    results: null,
    path: ''
  },

  // Bin object prototype
  Bin: function (first, last) {
    this.first = first
    this.last = last
    this.length = (last + 1) - (first + 1)
  },

  init: function (pathName) {
    this.state.path = pathName
    const audioContext = new AudioContext()

    // Create a new audio element
    const audioElement = document.createElement('audio')
    this.state.audioElement = audioElement
    document.body.appendChild(audioElement)

    const analyser = audioContext.createAnalyser()
    this.state.analyser = analyser
    analyser.fftSize = 1024
    const player = audioContext.createMediaElementSource(audioElement)
    this.state.player = player
    player.connect(audioContext.destination)
    player.connect(analyser)
    audioElement.src = pathName
  },

  pauseAudio: function () {
    const st = this.state
    st.audioElement.pause()
  },

  startAudio: function () {
    const st = this.state
    if (st.audioElement !== null) {
      st.audioElement.play().then(function () {
      })
    } else {
      console.log('Element has not been created yet! Use the init() function!')
    }
  },

  getResults: function () {
    const state = this.state
    const tempArray = new Uint8Array(state.analyser.frequencyBinCount)
    state.analyser.getByteFrequencyData(tempArray)

    const bins = [new this.Bin(1, 3), new this.Bin(4, 8), new this.Bin(8, 12), new this.Bin(13, 25), new this.Bin(25, 55), new this.Bin(55, 85), new this.Bin(85, 150), new this.Bin(150, 511)]
    const finalAverages = []

    bins.forEach(function (bin) {
      // Get the slice of the array
      const slice = tempArray.slice(bin.first, bin.last)
      // Sum all elements in the slice
      const sum = slice.reduce((a, b) => a + b, 0)
      // Add the average to the final sum
      finalAverages.push(sum / bin.length)
    })

    return finalAverages
  }
}

export default audioData
