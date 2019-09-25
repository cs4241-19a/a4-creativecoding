const express = require('express'),
      app = express(),
      compression = require('compression'),
      helmet = require('helmet');

app.use(express.static('public'));
app.use(compression());
app.use(helmet());

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('App is listening on port ' + listener.address().port);
});
