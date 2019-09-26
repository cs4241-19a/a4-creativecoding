const express = require('express'),
    helmet = require('helmet'),
    compression = require('compression'),
    server = express(),
    dir = '/public/',
    port = 3000;

server.set('port', process.env.PORT || port);

server.use(helmet());
server.use(compression());
server.use(express.static(__dirname + '/dist'));

server.get('/', function (req, res) {
    res.sendFile(__dirname + dir + 'index.html');
});

server.listen(port, function () {
    console.log(`Bookmarker app listening on port ${port}!`);
});