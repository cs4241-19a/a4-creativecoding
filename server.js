const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

app.use(express.static('public'));
app.use(helmet());
app.use(compression());


app.get('/', function (request, response) {
    response.sendFile(__dirname + '/public/views/index.html');
});

app.get('/public/js/main.js', function (request, response) {
    response.sendFile(__dirname + '/public/js/main.js');
});

const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});