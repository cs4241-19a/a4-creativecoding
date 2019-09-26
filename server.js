const express = require("express"),
  app = express(),
  port = 3000,
  path = require("path"),
  passport = require("passport"),
  Local = require("passport-local").Strategy,
  bodyParser = require("body-parser"),
  low = require('lowdb'),
  FileSync = require('lowdb/adapters/FileSync'),
  session = require("express-session"),
  compression = require('compression'),
  helmet = require('helmet');

const ps4Adapter = new FileSync('./public/data/PS4Sales.json')
const ps4db = low(ps4Adapter)
const xboxAdapter = new FileSync('./public/data/XboxOneSales.json')
const xboxdb = low(xboxAdapter)

// Set some defaults (required if your JSON file is empty)
ps4db.defaults({ games: [] })
  .write()

// Set some defaults (required if your JSON file is empty)
xboxdb.defaults({ games: [] })
  .write()


passport.serializeUser((user, done) => {
  done(null, user.username);
});

// Uses the css and javascript files
app.use(express.static(__dirname + '/public'))
app.use(compression())
app.use(helmet())

// "name" below refers to whatever piece of info is serialized in seralizeUser,
// in this example we're using the username
passport.deserializeUser((username, done) => {
  const user = userdb.find(u => u.username === username).value();
  credential = username;

  if (user !== undefined) {
    done(null, user);
  } else {
    done(null, false, { message: "user not found; session not restored" });
  }
});

app.use(express.static("./"));
app.use(bodyParser.json());
app.use(
  session({
    secret: "cats cats cats",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Uses the css and javascript files
app.use(express.static(__dirname + '/public'))

  // all authentication requests in passwords assume that your client
// is submitting a field named "username" and field named "password".
// these are both passed as arugments to the authentication strategy.
const myLocalStrategy = function( username, password, done ) {
    // find the first item in our users array where the username
    // matches what was sent by the client. nicer to read/write than a for loop!
    const user = userdb.get( 'users' )
                       .find({ username: username})
                       .value()
    
    // if user is undefined, then there was no match for the submitted username
    if( user === undefined ) {
      /* arguments to done():
       - an error object (usually returned from database requests )
       - authentication status
       - a message / other data to send to client
      */
     console.log('user not found')
      return done( null, false, { message:'user not found' })
    }else if( user.password === password ) {
      // we found the user and the password matches!
      // go ahead and send the userdata... this will appear as request.user
      // in all express middleware functions.
      console.log('user found')
      return done( null, { username, password })
    }else{
      // we found the user but the password didn't match...
      console.log('password not found')
      return done( null, false, { message: 'incorrect password' })
    }
}
passport.use(new Local(myLocalStrategy))

// Main page get
app.get('/', (req, res) => res.sendFile(__dirname + '/public/html/main.html'))

// PS4 data get
app.get('/ps4data', function (req, res) { 
  res.send(JSON.stringify(ps4db.get('games')
  .filter((v => v.Year !== 'N/A')) // filter out any data entries with no year attached
  .values()))
})

// Xbox data get
app.get('/xboxdata', (req, res) => res.send(JSON.stringify(xboxdb.get('games').values())))

// Listen on port 3000
app.listen (port, function () {
    console.log('Express Server running on port:3000, use localhost:3000 to connect')
})