const express = require('express'),
      app     = express(),
      helmet = require('helmet'),
      compression = require('compression')

app.use(express.static('src'));
app.use(helmet())
app.use(compression())

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
})

// app.get('js/dat', function(req, res) {
//     console.log('req')
//     res.sendFile(__dirname + 'src/js/dat.js')
// })

// app.get('/life.xml', function (req, res) {
//     res.sendFile(__dirname + '/src/data/life.xml');
// })

app.listen(process.env.PORT || 3000)