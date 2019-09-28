const express = require('express'),
      bodyParser = require("body-parser"),
      compression = require('compression'),
      helmet = require('helmet'),
      app = express(),
      low = require('lowdb'),
      FileSync = require('lowdb/adapters/FileSync'),
      adapter = new FileSync('data/fossil-fuel-co2-emissions-by-nation_json.summarized.json'),
      carbondb = low(adapter)

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(compression({level: 1}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.referrerPolicy());

carbondb.defaults({"emissions":[]})
  .write()

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/submit',
  function(request, response){
  
    let reading = request.body
    addRecord(reading).then(function(resolve){
      console.log(resolve)

      response.writeHeader( 200, { 'Content-Type': 'text/plain' })
      response.end("Ok");
    }).catch(err => console.log(err));
});

app.get('/emissions_data',
  function(request, response){
    let yr = request.query.year
    data = findRecord(yr)
    response.json(data)
  })


// listen for requests
const listener = app.listen(3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


const findRecord = function(yr){
  record = carbondb.get("emissions").filter((em => em.Year == yr)).value()
  c_ids = carbondb.get("country")
  compiled_record = []

  record.forEach(record => {
    let id = c_ids.find({name: record.Country}).value().id
    if(id != 0){  
      compiled_record.push({id: id, total: record.Total, perCapita: record["Per Capita"]})
    }
  });
  
  return compiled_record
}
