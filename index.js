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
// app.use(babel)

app.get(('/' || '/index.html'), (req, res) => res.sendFile(public/index.html))


export function activate() {
  // Fill something here, optional
}

export function deactivate() {
  // Fill something here, optional
}

export function provideLinter() {
  return {
    name: 'Example',
    scope: 'file', // or 'project'
    lintsOnChange: false, // or true
    grammarScopes: ['source.js'],
    lint(textEditor) {
      const editorPath = textEditor.getPath()

      // Do something sync
      return [{
        severity: 'info',
        location: {
          file: editorPath,
          position: [[0, 0], [0, 1]],
        },
        excerpt: `A random value is ${Math.random()}`,
        description: `### What is this?\nThis is a randomly generated value`
      }]

      // Do something async
      return new Promise(function(resolve) {
        resolve([{
          severity: 'info',
          location: {
            file: editorPath,
            position: [[0, 0], [0, 1]],
          },
          excerpt: `A random value is ${Math.random()}`,
          description: `### What is this?\nThis is a randomly generated value`
        }])
      })
    }
  }
}


app.listen(port, () => console.log(`a3-hcaouette listening on port ${port}!`))
