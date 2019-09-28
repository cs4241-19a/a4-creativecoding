const express = require('express')
const app = express()
const favicon = require('serve-favicon')

const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.json())
const compression = require('compression')
app.use(compression())
const helmet = require('helmet')
app.use(helmet())
app.use(favicon(__dirname + '/icon.png'));
app.listen(process.env.PORT || 3000)
