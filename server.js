const express = require('express')
const app = express()
const compression = require('compression')
const helmet = require('helmet')
const serveStatic = require('serve-static')
const port = 3000

app.use(serveStatic('public'))
app.use(compression())
app.use(helmet())

app.get('/', function (request, response) {
  console.log(request.url)
  response.sendFile(__dirname.join('/index.html'))
})

app.listen(port)