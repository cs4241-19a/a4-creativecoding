const express = require('express'),
      app = express(),
      port = 3000,
      bodyParser = require('body-parser')

// specify parser
app.use(bodyParser .json());


// GET request for index.html
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'))

// GET request for the table data
app.get('/earthquakes', (req, res) => res.send(expensedb.get('earthquakes').values()))

// set up low db 
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// database for spreadsheets
const adapter = new FileSync('earthquakes.json')
const expensedb = low(adapter)

app.listen( process.env.PORT || port )