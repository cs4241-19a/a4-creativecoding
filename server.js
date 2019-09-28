const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const dir = 'public/';
const port = 3000;

app.use(express.static(dir));
app.use(helmet());
app.use(compression());

app.listen(process.env.PORT || port);