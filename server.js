
const express = require('express');
const app = express();
app.use(express.static('public'));
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

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
