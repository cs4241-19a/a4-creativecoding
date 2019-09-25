const express = require('express')
const app = express()
app.listen(3000)

const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.json())

const helmet = require('helmet')
app.use(helmet())

const compression = require('compression')
app.use(compression())