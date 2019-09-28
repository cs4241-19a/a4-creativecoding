const express       = require( 'express' ),
      app           = express(),
      helmet        = require('helmet'),
      compression   = require('compression')

app.use(express.static('./'))
app.use(helmet())
app.use(compression())

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