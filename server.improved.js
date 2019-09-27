/**
 * Author: Zonglin Peng
 */
// - - - - - - MACROS - - - - - - 
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(bodyParser.json())

const helmet = require('helmet')
app.use(helmet())

const compression = require('compression')
app.use(compression())


// - - - - - - SERVER START - - - - - - 
app.listen(process.env.PORT || 3000, () => console.log('Audio Visualizer listening on port 3000!'));
