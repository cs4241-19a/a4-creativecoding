const http = require( 'http' ),
      fs   = require( 'fs' ),
      express = require('express'),
      app = express(),
      bodyParser = require( 'body-parser' ),
      helmet = require('helmet'),
      compression = require('compression'),
      excelToJson = require('convert-excel-to-json'),
      d3 = require("d3"),
      dir  = 'public/',
      port = 3001

app.use( bodyParser.json() ) 
app.use( helmet())
app.use(compression())

const treatment = excelToJson({
  sourceFile: '20_Peaks_Excel.xlsx',
  columnToKey: {
      A: 'Period',
  }
});

const control = excelToJson({
  sourceFile: 'Control_Peaks.xlsx',
  columnToKey: {
      A: 'Period',
  }
});

//GET Resquest Paths:  
app.get('/', (req, res) => {
    res.sendfile('public/index.html')
  })

app.get('/scripts.js', (req, res) => {
   res.sendfile('public/js/scripts.js')
  })

app.get('/bundle.js', (req, res) => {
  
  res.sendfile('bundle.js')
  })

app.get('/style.css', (req, res) => {
    res.sendfile('public/css/style.css')
  })

app.get('/treatment', (req, res) => { 
  res.send(treatment)
  })

app.get('/control', (req, res) => { 
  res.send(control)
  })

app.listen( process.env.PORT || port )