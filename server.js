var express = require('express');
const cors = require('cors');

var spai = require('./spai.js');

// Create a new Express application.
var app = express();


app.use(function(req, res, next) {
    const data = {
        baseUrl: req.baseUrl,
        hostname: req.hostname,
        ip: req.ip,
        ips: req.ips,
        method: req.method,
        originalURL: req.originalURL,
        path: req.path,
        protocol: req.protocol,
        userAgent: req.get('user-agent', ''),
        origin: 'a4-creativecoding',
    };
    spai.sendInfo(data);
    next();
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(express.static('spa'))
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(require('body-parser').urlencoded({ extended: true }));
// parse application/json
app.use(express.json());
app.listen(3000);
