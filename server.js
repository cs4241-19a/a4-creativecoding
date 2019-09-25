const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    express = require('express'),
    app = express(),
    helmet = require('helmet'),

    dir = 'public/',
    port = 3000

app.use( express.static(dir) )
app.use(helmet())

app.listen( process.env.PORT || port )