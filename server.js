//import?
//import * as THREE from 'three';

const express       = require( 'express' ),
      app           = express(),
     // session       = require( 'express-session' ),
      helmet        = require('helmet'),
      compression   = require('compression')
      //THREE         = require('three')
//       babelify = require("babelify");
// browserify().transform(babelify, {presets: ["@babel/preset-env", "@babel/preset-react"]});
app.use(express.static('./'))
app.use(helmet())
app.use(compression())


//for three.js
//app.use(express.static('THREE'))
//var scene = new THREE.Scene() -- i think i dont need to do this here 

//this was after passport
app.use( require('express-session')({ secret:'cats cats cats', resave:false, saveUninitialized:false }));

//routes 
app.get('/',
    function(req, res){  
    console.log('this was called before the error')
        res.render('index', )
    });

app.post('/index',
    function(req, res){
        res.render('index')
    });

//hey listen 
app.listen(process.env.PORT || 3000)