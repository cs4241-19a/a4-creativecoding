const http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    express = require('express'),
    app = express(),
    helmet = require('helmet'),
    compression = require('compression')

    dir = 'public/',
    port = 3000

app.use( express.static(dir) )
app.use(helmet())
app.use(compression())

app.listen( process.env.PORT || port )