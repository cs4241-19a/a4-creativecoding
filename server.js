const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    compression = require('compression'),
    game = require('./gameoflife.js');

    app.use(helmet());
    app.use(compression());

    //Safety precautions from helmet
    app.use(helmet.xssFilter());
    app.use(helmet.frameguard());

    app.use(bodyParser.json());
    app.use(express.static('./'));

    app.post('/submit', function(req, res){
        console.log(req.body);
        res.status(200).send('haha lmoa');
    });


    console.log(game.charCheck("{(1,2,3)}"));
    console.log(game.generate([1,2,0,1], [[0,0,0], [1,1,1]]));

app.listen(3000);
