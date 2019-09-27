// init project
const express = require('express');
const low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
const dataAdapter = new FileSync('db.json');
const db = low(dataAdapter);
const app = express();
const helmet = require('helmet')
const compression = require('compression') 
app.use(helmet())
app.use(compression())

app.use(express.static('public'));

// default data ////////////////////////////////
db.defaults({ data: [
      {"user":"","score":""}
    ]
  }).write();

//////////////////////////////////////////
//GET FUNCTIONS
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/public/client.js', function(request, response) {
  response.sendFile(__dirname + '/public/client.js');
});

app.get('/three.module.js', function(request, response) {
  response.sendFile(__dirname + '/three.module.js');
});

app.get('/scores', function(request, response) {
  response.sendFile(__dirname + '/views/scoreboard.html');
});

app.get('/scoreData', function(request, response) {
  response.send(JSON.stringify(db.get('data').values()))
});


//////////////////////////////////////////
//add a new score to user data
const scoreAddition = function (data) {
  const new_score = data
  db.get('data').push(new_score).write()
}

//////////////////////////////////////////
//POST FUNCTIONS

app.post('/addScore', function (req, res) {
  let dataString = ''
  req.on( 'data', function( data ) {
      dataString += data 
  })
  req.on( 'end', function() {
    let body = JSON.parse( dataString )
    const addData = JSON.parse( dataString )
    db.get('data').push(addData).write()
    //scoreAddition(addData)
  })
  return false
})

// listen for requests :)////////////////////////
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
