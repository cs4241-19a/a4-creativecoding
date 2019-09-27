// init express
const express = require('express');
const app = express();
const port = 3000;

//middleware
const bodyParser = require('body-parser')
//const session = require('express-session')
const responseTime = require('response-time')
const helmet = require('helmet')
const compression = require('compression')

app.use(express.static('public'));
app.use(helmet())
app.use(bodyParser.json())
app.use(responseTime())
app.use(compression())

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/home.html');
});

// listen for requests :)
const listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});