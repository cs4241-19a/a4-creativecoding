
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
//let dat = require('dat.gui')
//app.use('/js', express.static('js'));



app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/js/three.js', function(request, response) {
  response.sendFile(__dirname + '/js/three.js');
});

app.get('/js/physi.js', function(request, response) {
  response.sendFile(__dirname + '/js/physi.js');
});

app.get('/js/physijs_worker.js', function(request, response) {
  response.sendFile(__dirname + '/js/physijs_worker.js');
});

app.get('/js/ammo.js', function(request, response) {
  response.sendFile(__dirname + '/js/ammo.js');
});

app.get('/js/client.js', function(request, response) {
  response.sendFile(__dirname + '/js/client.js');
});

app.get('/scripts/audio.js', function(request, response) {
  response.sendFile(__dirname + '/scripts/audio.js');
});

app.get('/scripts/main.js', function(request, response) {
  response.sendFile(__dirname + '/scripts/main.js');
});

app.get('/scipts/geometry.js', function(request, response) {
  response.sendFile(__dirname + '/scripts/geometry.js');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
