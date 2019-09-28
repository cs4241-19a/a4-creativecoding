// server.js
// where your node app starts

// init project
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// http://expressjs.com/en/starter/static-files.html
// use middleware packages
app.use(express.static('public'));
app.use(compression());
app.use(helmet());

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
