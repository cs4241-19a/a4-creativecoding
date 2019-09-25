const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library used in the following line of code
      mime = require( 'mime' ),
      dir  = 'public/',
      port = 3000,
      Express = require('express'),
      express = Express(),
      bodyParser = require('body-parser'),
      serveStatic = require('serve-static'),
      serveFavicon = require('serve-favicon'),
      session = require('express-session'),
      db = require('./public/db'),
       path = require('path');


express.use(bodyParser.urlencoded());
express.use(bodyParser.json());
express.use(session({
    secret: 'eggnog',
    resave: true,
    saveUninitialized: true
}));
express.use(serveStatic(path.join(__dirname, 'public')));
express.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));


express.get("/", function (request, response) {
   sendFile( response, '/index.html' );
});

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ); 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type });
       response.end( content );

     }else{

       // file not found, error code 404
       response.writeHeader( 404 );
       response.end( '404 Error: File Not Found' );

     }
   });
};

function saveUsers(){
  var json = JSON.stringify(db.users.getUsers());
  console.log(json);
  
  fs.writeFile("./object.json", json, (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
}


var listener = express.listen(port, function () {
  console.log('Listening to port ' + port);
});

