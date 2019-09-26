
const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

app.use(express.static('public'));
app.use(helmet());
app.use(compression());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/public/images/favicon.ico', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/images/favicon.ico'));
});

app.get('/public/js/scripts.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/js/scripts.js'));
});

app.get('/public/js/alert.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/js/alert.js'));
});

app.get('/public/js/main.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/js/main.js'));
});

app.get('/public/js/files.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/js/files.js'));
});

app.get('/public/musics/bobross.mp3', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/musics/bobross.mp3'));
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
