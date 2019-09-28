const express = require('express'),
	app = express(),
	compression = require('compression'),
	helmet = require('helmet'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	port = 3000

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(helmet())
app.use(morgan('tiny'))
app.use(compression())

app.listen(process.env.PORT || port, function () {
	console.log('Server running on port ' + port)
	console.log('Press Ctrl + C to stop')
})
