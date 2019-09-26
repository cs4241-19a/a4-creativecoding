const express   = require( 'express' ),
      app       = express(),
      // morgan    = require( 'morgan' )
      session   = require( 'express-session' ),           //1
      // passport  = require( 'passport' ),                  //2
      // GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
      bodyParser= require( 'body-parser' ),               //3
      favicon   = require( 'serve-favicon' ),             //4
      path      = require( 'path' ),
      // low       = require('lowdb'),                       //5
      // FileSync  = require('lowdb/adapters/FileSync'),
      // adapter   = new FileSync('db.json'),
      // db        = low(adapter),
      helmet = require('helmet'),
      compression = require('compression'),
      port      = 3000


app.use(helmet())
app.use(compression())
app.use( express.static('public'))
app.use( bodyParser.json())
app.use(favicon(path.join('public','res','favicon.ico')))
app.use( session({ secret:'fromage', name:'a3-cookie', resave:false, saveUninitialized:true }) )
// app.use( passport.initialize() )
// app.use( passport.session() )
// passport.use(new GoogleStrategy({
//     clientID: '443479129403-kgnq88arlnldecfi9qp87queha2fhl7r.apps.googleusercontent.com',
//     clientSecret: 'RIPOr3cA2Vwyd00UiMNoxNfK',
//     callbackURL: "https://a3-hcaouette.glitch.me/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//    return done(null, profile);
//   }
// ));
// passport.initialize()


//redirects
app.get(('/' || '/index.html'), (req, res) => res.sendFile(public/index.html))



app.listen(port, () => console.log(`a3-hcaouette listening on port ${port}!`))
