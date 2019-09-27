console.log('Reading server.improved')

const port = 3000
const express = require('express')
const app = express()
app.use(express.static(__dirname))

// end of passport stuff

const compression = require('compression')
const helmet = require('helmet')

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
})

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
