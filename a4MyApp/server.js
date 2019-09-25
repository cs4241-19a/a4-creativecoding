// server.js
// where your node app starts

// init project
const express = require( 'express' );
const app = express();
var compression = require( 'compression' );
app.use( compression() );

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use( express.static( 'public' ) );

// http://expressjs.com/en/starter/basic-routing.html
app.get( '/', function ( request, response ) {
   response.sendFile( __dirname + '/views/index.html' );
} );

// server-sent event stream - from and for compression
app.get( '/events', function ( req, res ) {
   res.setHeader( 'Content-Type', 'text/event-stream' );
   res.setHeader( 'Cache-Control', 'no-cache' );

   // send a ping approx every 2 seconds
   var timer = setInterval( function () {
      res.write( 'data: ping\n\n' );

      // !!! this is the important part
      res.flush();
   }, 2000 );

   res.on( 'close', function () {
      clearInterval( timer );
   } );
} );

// listen for requests :)
const listener = app.listen( process.env.PORT, function () {
   console.log( 'Your app is listening on port ' + listener.address()
      .port );
} );
