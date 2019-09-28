const express = require('express')
const server = express()
const port = 3000
const helmet = require('helmet')
const compression = require('compression')

server.use(helmet())


var session = require("express-session")

server.use(express.static("public"))

server.use(compression())

server.get('/', (req, res) => res.send())


var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
