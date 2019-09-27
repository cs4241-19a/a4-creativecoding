// init project
const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()
app.use(express.static('./'))
app.use(helmet())
app.use(bodyparser.json())
app.use(compression())

// GET call for index.html
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(process.env.PORT || 3000)
