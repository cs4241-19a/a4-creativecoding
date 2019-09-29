// server.js

//init credital vars
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var clientID = "365916812102-kj8a8ppqb5jd0ch1p5qttosiogqo8koe.apps.googleusercontent.com";
var clientSecret = "TR5dcDT17yEeqIte3YHeh_Ks";
var clientInfo = {id: -1, name: "0", image: ""};

// init project
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var session = require('express-session');
var compression = require('compression');
var browserify = require('browserify-middleware');
var app = express();


//App uses and setup
app.use(favicon('831da1ea-1e50-4148-9a1d-b5e53a712f89%2Ffavicon.ico?v=1568599722423.1'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret:'google secret', resave:false, saveUninitialized:true}));
app.use(passport.initialize());
app.use(express.static('public'));
app.use(passport.session());
app.use(cors());
app.use(compression());
app.use('/js', browserify(__dirname + '/public/scripts'));


app.get('/cors-entry', function (req, res, next) {
  console.log('CORS Accessed');
  res.json({msg: 'Odd Blog is CORS-enabled for all origins!'})
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "https://a4-dandaman2.glitch.me/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
         // return done(err, user);
       // });
    console.log('user coming in...');
    return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  clientInfo = extractProfile(user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  clientInfo = extractProfile(user);
  done(null, user);
});




// init sqlite db ////////////////////////////////////////////////////////////////////////////
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Webdata (title TEXT, date TEXT, body TEXT, user TEXT, id TEXT, userId TEXT)');
    console.log('New table Webdata created!');
    
    // insert default dreams
    db.serialize(function() {
      db.run('INSERT INTO Webdata (title, date, body, user, id, userId) VALUES ("First Post!", "Before Time Began", "This is an example body! Feel free to log in and create your own posts!", "Danny Duff", "_5", "555")');
    });
  }
  else {
    console.log('Database "Webdata" ready to go!');
    //db.run('DROP TABLE Webdata');
    
    db.each('SELECT * from Webdata', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  }
});


//APP.GETS////////////////////////////////////////////////////////////////////////////
app.get('/', function(request, response) {
  //console.log(clientInfo, 'request', request.user);
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/getPosts', function(request, response) {
  console.log('requested user:', request.user);
  clientInfo = extractProfile(request.user);
  
  db.all('SELECT * from Webdata', function(err, rows) {
    response.send(JSON.stringify({"rows":rows, "userData": clientInfo}));
  });
});


//APP.POSTS/////////////////////////////////////////////////////////////////////////
app.post('/addToDb', function (req, res) {
  let ri = req.body;
  let runString = 'INSERT INTO Webdata (title, date, body, user, id, userId) VALUES ';
  runString += '( "' + ri.title + '" , "' + ri.date + '", "' + ri.body + '", "' + ri.user + '", "' + ri.id + '", "' + ri.userId+'")';
  db.run(runString);
  let returnedValue = 'Got it: ' + ri.title;
  res.json({respVal: returnedValue});
});

app.post('/removeFromDb', function (req, res) {
  console.log(req.body.id, 'deleting');
  let runString = "DELETE FROM Webdata WHERE id = '" + req.body.id + "'";
  db.run(runString);
  res.json({respVal: "deleted: " + req.body.id});
});

app.post('/logout', function(req, res){
  req.session.destroy();
  res.json({respVal: "logged out " + req.user.id});
});




//port listeners and functions//////////////////////////////////////////////////////////////////

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

function extractProfile(profile) {
  if(!profile){
    return {
      id: -1,
      name: "0",
      image: ""
    }
  }
  
  let imageUrl = '';
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value;
  }
  return {
    id: profile.id,
    name: profile.displayName,
    image: imageUrl,
  };
}
