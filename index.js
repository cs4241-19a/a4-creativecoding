const express   = require( 'express' ),
      mime      = require('mime'),
      app       = express(),
      morgan    = require( 'morgan' ),
      // session   = require( 'express-session' ),
      // passport  = require( 'passport' ),
      // GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
      bodyParser= require( 'body-parser' ),
      favicon   = require( 'serve-favicon' ),
      path      = require( 'path' ),
      helmet = require('helmet'),
      compression = require('compression'),
      fs = require('fs'),
      ytdl = require('ytdl-core'),
      // socketIO = require('socket.io'),
      // server = http.Server(app),
      // io = socketIO(server),
      port      = 3000;


app.use(helmet())
app.use(compression())
app.use( express.static('public'))
app.use( bodyParser.json())
app.use(favicon(path.join('public','res','favicon.ico')))
// app.use( session({ secret:'fromage', name:'a3-cookie', resave:false, saveUninitialized:true }) )
// app.use(babel)
app.use(morgan('dev'))

const sendFile = function( response, filename ) {
  const type = mime.getType( filename );
  fs.readFile( filename, function( err, content ) {
    if ( err === null ) {
      response.writeHeader( 200, {'Content-Type': type});
      response.end( content );
    } else {
      response.writeHeader( 404 );
      response.end( '404 Error: File Not Found' );
    }
  });
};

app.get(('/' || '/index.html'), (req, res) => res.sendFile('public/index.html'))

app.get('/bundle.js', function(req, res){
  sendFile(res, "./bundle.js");
})

app.post('/stream/:videoId', (request, response) => {
  console.log("received video process request")
  const videoId = request.params.videoId
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  if (!ytdl.validateURL(videoUrl)) {
    response.send({ success: false })
  } else {
    ytdl(videoUrl, { filter: format => format.container === 'mp4' }).pipe(response)
  }
})

app.use((request, response) => {
  response.redirect('/')
})


app.listen(port, () => console.log(`a3-hcaouette listening on port ${port}!`))
