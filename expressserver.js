const express   = require( 'express' ),
      app       = express(),
      bodyParser= require( 'body-parser' ),
      helmet = require('helmet'),
      compression = require('compression')

// automatically deliver all files in the public folder
// with the correct headers / MIME type.
app.use( express.static( 'public' ) )

// get json when appropriate - middleware
app.use( bodyParser.json() )

// helmet - middleware
app.use(helmet())

// compression - middleware
app.use(compression())

// domain views index.html
app.get('/', function(request, response) {
  response.sendFile( __dirname + '/views/index.html' )
  response.send('hello, world!')
})

console.log("Express Launched")

app.listen( process.env.PORT || 3000 )