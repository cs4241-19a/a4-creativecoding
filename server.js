const express = require("express");
const app = express();

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(".data/db.json");
const db = low(adapter);
const compression = require("compression");
const helmet = require("helmet");

app.use(helmet());
app.use(compression());


db.defaults({ team: [
  { name: "red", players: [
    { name: "Andre Nani", hits: 0, abs: 0 }, {name:"Dane O\'Donnell", hits: 0, abs: 0}, {name:"Bran Poindexter", hits: 0, abs: 0}, {name:"Nikolas Christopher", hits: 0, abs: 0}, {name:"Merrill Raines", hits: 0, abs: 0}, {name:"Kellen Wilbur", hits: 0, abs: 0}, {name:"Nicolo Henriques", hits: 0, abs: 0}, {name:"Finnegan MacGinnis", hits: 0, abs: 0}, {name:"Drake Warner", hits: 0, abs: 0}
  ]},
  { name: "blue", players: [
    { name: "Shou Brice", hits: 0, abs: 0 }, {name:"Bernardo Josephs", hits: 0, abs: 0}, {name:"Hank Hayward", hits: 0, abs: 0}, {name:"Jaydon Adair", hits: 0, abs: 0}, {name:"Drew Payton", hits: 0, abs: 0}, {name:"Bryan Albinson", hits: 0, abs: 0}, {name:"Raul Simpson", hits: 0, abs: 0}, {name:"Brody Collingwood", hits: 0, abs: 0}, {name:"Stelios O Marcaigh", hits: 0, abs: 0}
  ]}
]}).write();

function pushDefaults() {
  db.get("team").push({name: "red", players: []}).write();
  db.get("team").find({name: "red"}).get("players").push({ name: "Andre Nani", hits: 0, abs: 0 }, {name:"Dane O\'Donnell", hits: 0, abs: 0}, {name:"Bran Poindexter", hits: 0, abs: 0}, {name:"Nikolas Christopher", hits: 0, abs: 0}, {name:"Merrill Raines", hits: 0, abs: 0}, {name:"Kellen Wilbur", hits: 0, abs: 0}, {name:"Nicolo Henriques", hits: 0, abs: 0}, {name:"Finnegan MacGinnis", hits: 0, abs: 0}, {name:"Drake Warner", hits: 0, abs: 0}).write();
  db.get("team").push({name: "blue", players: []}).write();
  db.get("team").find({name: "blue"}).get("players").push({ name: "Shou Brice", hits: 0, abs: 0 }, {name:"Bernardo Josephs", hits: 0, abs: 0}, {name:"Hank Hayward", hits: 0, abs: 0}, {name:"Jaydon Adair", hits: 0, abs: 0}, {name:"Drew Payton", hits: 0, abs: 0}, {name:"Bryan Albinson", hits: 0, abs: 0}, {name:"Raul Simpson", hits: 0, abs: 0}, {name:"Brody Collingwood", hits: 0, abs: 0}, {name:"Stelios O Marcaigh", hits: 0, abs: 0}).write();
}

function getTeam(name) {
  // db.get("team").push({name: "red", players: []}).write()
  // db.get("team").find({name: "red"}).get("players").push({ name: "red1", hits: 0, abs: 0 }, {name:"red2", hits: 0, abs: 0}, {name:"red3", hits: 0, abs: 0}, {name:"red4", hits: 0, abs: 0}, {name:"red5", hits: 0, abs: 0}, {name:"red6", hits: 0, abs: 0}, {name:"red7", hits: 0, abs: 0}, {name:"red8", hits: 0, abs: 0}, {name:"red9", hits: 0, abs: 0}).write()
  // db.get("team").push({name: "blue", players: []}).write()
  // db.get("team").find({name: "blue"}).get("players").push({ name: "blue1", hits: 0, abs: 0 }, {name:"blue2", hits: 0, abs: 0}, {name:"blue3", hits: 0, abs: 0}, {name:"blue4", hits: 0, abs: 0}, {name:"blue5", hits: 0, abs: 0}, {name:"blue6", hits: 0, abs: 0}, {name:"blue7", hits: 0, abs: 0}, {name:"blue8", hits: 0, abs: 0}, {name:"blue9", hits: 0, abs: 0}).write()
  var teams = db.get("team").value();
  // var dbstuff = db.get("team").value()
  // console.log(dbstuff)
  // console.log(players)
  return teams;
}

function getPlayers(team) {
  // db.get("team").push({name: "red", players: []}).write()
  // db.get("team").find({name: "red"}).get("players").push({ name: "red1", hits: 0, abs: 0 }, {name:"red2", hits: 0, abs: 0}, {name:"red3", hits: 0, abs: 0}, {name:"red4", hits: 0, abs: 0}, {name:"red5", hits: 0, abs: 0}, {name:"red6", hits: 0, abs: 0}, {name:"red7", hits: 0, abs: 0}, {name:"red8", hits: 0, abs: 0}, {name:"red9", hits: 0, abs: 0}).write()
  // db.get("team").push({name: "blue", players: []}).write()
  // db.get("team").find({name: "blue"}).get("players").push({ name: "blue1", hits: 0, abs: 0 }, {name:"blue2", hits: 0, abs: 0}, {name:"blue3", hits: 0, abs: 0}, {name:"blue4", hits: 0, abs: 0}, {name:"blue5", hits: 0, abs: 0}, {name:"blue6", hits: 0, abs: 0}, {name:"blue7", hits: 0, abs: 0}, {name:"blue8", hits: 0, abs: 0}, {name:"blue9", hits: 0, abs: 0}).write()
  var playerList = db.get("team").find({name: team}).get("players").value();
  // var dbstuff = db.get("team").value()
  // console.log(dbstuff)
  // console.log(players)
  // var players = db.get(team).find({name: "red"}).get("players").find({name: "red1"}).value()
  // console.log(playerList)
  return playerList;
}

function updateStats(team, player, hits, abs) {
  db.get("team").find({name: team}).get("players").find({name: player}).assign({hits: hits}).assign({abs: abs})
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/stats", function(request, response) {
  console.log("got this request");
    var dbUsers=[];
    var teams = db.get("team").value(); // Find all users in the collection
    // users.forEach(function(user) {
    //   dbUsers.push([user.username,user.password,user.admin]); // adds their info to the dbUsers value
    // });
    // console.log(teams)
    response.send(teams); // sends dbUsers back to the page
});

// removes entries from users and populates it with default users
app.get("/reset", function (request, response) {
  // removes all entries from the collection
  db.get("team")
  .remove()
  .write();
  console.log("Database cleared");
  pushDefaults();
  response.sendFile(__dirname + "/views/reset.html");
});

app.post("/updateStats", function (req, res) {
  console.log("got POST request");
  let dataString = "";
  req.on( "data", function( data ) {
    dataString += data;
    console.log(dataString);
    var json=JSON.parse(dataString);
    var homeHits = json.homeHits;
    var homeABs = json.homeABs;
    var awayHits = json.awayHits;
    var awayABs = json.awayABs;
    for(let i = 0; i < 9; i++) {
      // console.log(db.get("team").find("red").get("players").value())
      let j = i;
      var hp = getPlayers("red")[j];
      var hh = homeHits[j];
      var ha = homeABs[j];
      var curhh = hp.hits;
      var curha = hp.abs;
      var ap = getPlayers("blue")[j];
      var ah = awayHits[j];
      var aa = awayABs[j];
      var curah = ap.hits;
      var curaa = ap.abs;
      // console.log(getPlayers("red")[j])
      // console.log(homeHits[j])
      // console.log(homeABs[j])
      hp.hits += hh;
      hp.abs += ha;
      // function updateStats(team, player, hits, abs) {
      updateStats("red", hp.name, hp.hits, hp.abs);
      // hp.find({hits: curhh}).assign({hits: hp.hits})
      // hp.find({abs: curha}).assign({abs: hp.abs})
      ap.hits += ah;
      ap.abs += aa;
      updateStats("blue", ap.name, ap.hits, ap.abs)
      // ap.find({hits: curah}).assign({hits: ap.hits})
      // ap.find({abs: curaa}).assign({hits: ap.abs})
      // console.log(hp)
      // console.log(ap)
    }
//     console.log(json.username)
//     console.log(json.password)
  })
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
