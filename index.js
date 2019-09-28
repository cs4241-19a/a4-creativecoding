const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

app.use(helmet())
app.use(compression())
app.use(express.static('dist'))

app.listen(process.env.PORT || 3000, () => console.log(`We are listening`));