/*
 * Server file for CS 4241 Assignment 4
 * by Terry Hearst
 */

// #######################
// ## INITIALIZE SERVER ##
// #######################

const express = require('express')
const app = express()
const helmet = require('helmet')
const path = require('path')
const compression = require('compression')

// Helmet middleware
app.use(helmet())

// Compression middleware
app.use(compression())

// Host static files
app.use(express.static('public'))

// Route '/' to main page
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// Listen for requests
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
