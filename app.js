const express = require('express'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    compression = require('compression');


app = express();
app.use(helmet()); // protects server
app.use(compression()); //will compress all responses


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



app.listen(3000, () => console.log('Listening on port 3000'));