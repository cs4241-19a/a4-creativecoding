const express = require('express'),
      app = express(),
      port = 3000,
      bodyParser = require('body-parser'),
      session = require("express-session"),
      compression = require('compression'),
      helmet = require('helmet');


// specify parser
app.use(bodyParser .json());

// Uses the css and javascript files
app.use(express.static(__dirname + '/public'))

// implement compression and helmet modules
app.use(compression())
app.use(helmet())


// GET request for index.html
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

// GET request for the earthquake data
app.get('/earthquakes', (req, res) => res.send(quakedb.get('earthquakes').values()))

// set up low db 
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// database for spreadsheets
const adapter = new FileSync('earthquakes.json')
const quakedb = low(adapter)

// Set some defaults (required if your JSON file is empty)
quakedb.defaults({ earthquakes: [] })
  .write()


app.listen( process.env.PORT || port )