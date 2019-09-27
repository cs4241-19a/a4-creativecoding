/* eslint-env es6 */
/* eslint-enable */

const fs = require('fs');
const mime = require('mime');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const browserify = require('browserify');
const babelify = require('babelify');
const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
const db = low(new FileSync('db.json'));
const app = express();
const port = 3000;

browserify({debug: true})
    .transform(babelify)
    .require('./scripts/app.js', {entry: true})
    .bundle()
    .on('error', function(err) {
      console.log('Error: ' + err.message);
    })
    .pipe(fs.createWriteStream('scripts/bundle.js'));

app.use(compression());
app.use(helmet());

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

app.get('/', function(request, response) {
  sendFile( response, 'index.html' );
});

app.get('/style.css', function(request, response) {
  sendFile( response, 'styles/style.css' );
});

app.get('/app.js', function(request, response) {
  sendFile( response, 'scripts/app.js' );
});

app.get('/bundle.js', function(request, response) {
  sendFile( response, 'bundle.js' );
});

app.listen( process.env.PORT || port );
