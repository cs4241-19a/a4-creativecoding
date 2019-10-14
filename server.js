const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const serveStatic = require("serve-static");
const port = 3000;

app.use(serveStatic("public"));
app.use(compression());
app.use(helmet());



app.get('/',
    function(req, res){  
    console.log('this was called before the error')
        res.render('index', )
    });

app.post('/index',
    function(req, res){
        res.render('index')
    });

app.listen(port);
