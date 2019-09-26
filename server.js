const express = require( 'express' ),
    app = express(),
    bodyParser = require( 'body-parser' ),
    favicon = require('serve-favicon'),
    path = require('path'),
    helmet = require('helmet'),
    compression = require('compression'),
    port = 3000;

app.use( express.static(__dirname + '/public' ) );
app.use( bodyParser.json() );
app.use(favicon(path.join(__dirname, '/public', 'panda.jpg')));
app.use(helmet());
app.use(compression());

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/items.html');
});

app.post( '/submit', function( request, response ) {
    json = request.body;
    response.writeHead( 200, { 'Content-Type': 'application/json'})
    response.end( JSON.stringify( request.body ) )
})

app.listen( process.env.PORT || port )