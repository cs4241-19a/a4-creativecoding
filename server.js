/**
 * CS4241 - a3 
 * Express server
 * 
 * Author: Rui Huang
 */

// PACKAGES
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon')

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(favicon(__dirname + '/public/img/favicon.png'));

// LISTENING PORT
app.listen(process.env.PORT || 3000, function () {
    console.log('The app is listening on port ' + this.address().port);
    console.log('Served at http://localhost:3000');
    console.log('Ctrl-c to quit');
})