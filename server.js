const path = './public'

const express = require('express')
const app = express()
const compression = require('compression')
const helmet = require('helmet')

/* Using variables */
app.use(express.static('public'))
app.use(compression())
app.use(helmet())

/*
 * Function to resolve homepage.
 */
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(process.env.PORT || 3000)
