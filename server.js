const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const app = express()

app.use(express.static('public'))
app.use(compression())
app.use(helmet())

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
})

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
