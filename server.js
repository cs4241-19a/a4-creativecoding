const express       = require( 'express' ),
      app           = express(),
      session       = require( 'express-session' ),
      helmet        = require('helmet'),
      compression   = require('compression')
app.use(express.static('./'))
app.use(helmet())
app.use(compression())

//this was after passport
app.use( require('express-session')({ secret:'cats cats cats', resave:false, saveUninitialized:false }));

//calls
app.post('/index',
    function(req, res){
        res.redirect('/index')
    });

//hey listen 
app.listen(process.env.PORT || 3000)