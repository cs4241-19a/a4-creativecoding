// server.js
// where your node app starts

// init project
const express = require('express')
const app = express()
const serveStatic = require('serve-static')
const path = require('path')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(helmet())
app.use(express.static('public'))
app.use(compression())
app.use(serveStatic(path.join(__dirname, 'views')))
app.use(serveStatic(path.join(__dirname, 'public')))
app.use(cors())

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.send('views/index.html')
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
