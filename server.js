const express = require('express'),
      app = express(),
      compression = require('compression'),
      helmet = require('helmet'),
      bodyparser = require('body-parser'),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('db.json'),
      db = low(adapter),
      morgan = require('morgan');

var grids = [];

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(compression());
app.use(helmet());

// Database defaults
db.defaults({grids: [
  {name: 'acorn', cells: [{j: 400, k: 300}, {j: 401, k: 301}, {j: 402, k: 301}, {j: 403, k: 301},
                          {j: 398, k: 299}, {j: 398, k: 301}, {j: 397, k: 301}]},
  {name: 'blinker', cells: [{j: 399, k: 300}, {j: 400, k: 300}, {j: 401, k: 300}]},
  {name: 'diehard', cells: [{j: 399, k: 300}, {j: 400, k: 300}, {j: 400, k: 301}, {j: 405, k: 299},
                            {j: 404, k: 301}, {j: 405, k: 301}, {j: 406, k: 301}]},
  {name: 'glider', cells: [{j: 400, k: 300}, {j: 401, k: 300}, {j: 401, k: 299}, {j: 399, k: 299}, {j: 401, k: 298}]},
  {name: 'r_pentomino', cells: [{j: 400, k: 300}, {j: 400, k: 301}, {j: 399, k: 300}, {j: 401, k: 299}, {j: 400, k: 299}]}]})
  .write();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

app.post('/layout', function(req, res) {
  let layout = db.get('grids').find({name: req.body.layout}).value();
  console.log(layout);
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(layout));

})

const listener = app.listen(process.env.PORT || 3000, function() {
  console.log('App is listening on port ' + listener.address().port);
});
