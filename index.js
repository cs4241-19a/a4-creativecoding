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
      fs = require('fs'),
      ytdl = require('ytdl-core'),
      // socketIO = require('socket.io'),
      // server = http.Server(app),
      // io = socketIO(server),
      port      = 3000


app.use(helmet())
app.use(compression())
app.use( express.static('public'))
app.use( bodyParser.json())
app.use(favicon(path.join('public','res','favicon.ico')))
app.use( session({ secret:'fromage', name:'a3-cookie', resave:false, saveUninitialized:true }) )
// app.use(babel)
app.use(morgan('dev'))

app.get(('/' || '/index.html'), (req, res) => res.sendFile(public/index.html))


app.post('/stream/:videoId', (request, response) => {
  const videoId = request.params.videoId
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  if (!ytdl.validateURL(videoUrl)) {
    response.send({ success: false })
  } else {
    ytdl(videoUrl, { filter: format => format.container === 'mp4' })
      .pipe(response)
  }
})

app.use((request, response) => {
  response.redirect('/')
})


app.listen(port, () => console.log(`a3-hcaouette listening on port ${port}!`))
