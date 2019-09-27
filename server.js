const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const app = express()
const port = 3001

app.use(compression())
app.use(helmet())

app.get('/', function (req, res) {
  res.sendFile('/views/index.html', { root: '.' })
})
app.get('/sampleAudio', function (req, res) {
  res.sendFile('/resources/test.mp3', { root: '.' })
})
app.get('/sampleAudioTwo', function (req, res) {
  res.sendFile('/resources/test2.mp3', { root: '.' })
})
app.get('/sampleAudioThree', function (req, res) {
  res.sendFile('/resources/test3.mp3', { root: '.' })
})
app.get('/bundle.js', function (req, res) {
  res.sendFile('/bundle.js', { root: '.' })
})
app.get('/main.js', function (req, res) {
  res.sendFile('/main.js', { root: '.' })
})
app.get('/fileOne.js', function (req, res) {
  res.sendFile('/fileOne.js', { root: '.' })
})
app.get('/fileTwo.js', function (req, res) {
  res.sendFile('/fileTwo.js', { root: '.' })
})
app.get('/dat.gui.min.js', function (req, res) {
  res.sendFile('/dat.gui.min.js', { root: '.' })
})
app.get('/toastr.js', function (req, res) {
  res.sendFile('/toastr.js', { root: '.' })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
