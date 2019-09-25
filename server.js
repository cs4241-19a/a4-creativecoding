// server.js
// where your node app starts

// init project

const express = require('express');
const bodyParser = require('body-parser');
const mime = require( 'mime' );
const path  = require('path');
const helmet = require('helmet');
const compression = require('compression');

const app = express();


app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use(express.static(__dirname + '/'));

app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

app.use('/submit', function(request, response) {

    let rollList = [];
    let result = +0;
    let mod = "";

    console.log(request.body);

    for(let i = 0; i < request.body.numDice; i++){
        let roll = rollDice(request.body.typeDice);
        result += evalMod(roll, request.body.flatDice, request.body.addsub);
        rollList.push(roll);
    }
    if(request.body.addsub === "state1"){mod = "+"}
    else if(request.body.addsub === "state2"){mod = "-"}
    else{mod = ""}
    const json = {
        'diceType': request.body.typeDice,
        'diceNum': request.body.numDice,
        'addsub': mod,
        'diceMod': request.body.flatDice,
        'result': result,
        'rolls': rollList
    };
    response.json(json);
});

const rollDice = function( diceType ){
    switch(diceType){
        case "d1":
            return +Math.floor(Math.random() * Math.floor(2));
        case "d4":
            return +Math.floor(Math.random() * Math.floor(4)) + 1;
        case "d6":
            return +Math.floor(Math.random() * Math.floor(6)) + 1;
        case "d8":
            return +Math.floor(Math.random() * Math.floor(8)) + 1;
        case "d10":
            return +Math.floor(Math.random() * Math.floor(10)) + 1;
        case "d12":
            return +Math.floor(Math.random() * Math.floor(12)) + 1;
        case "d20":
            return +Math.floor(Math.random() * Math.floor(20)) + 1;
        case "d100":
            return +Math.floor(Math.random() * Math.floor(100)) + 1
    }
};



const evalMod = function( num, flatMod, state){
    if(state === "state1"){
        return +num + +flatMod
    } else if(state === "state2") {
        return +num - +flatMod
    } else {
        return 0
    }
};

// listen for requests :)
let listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});