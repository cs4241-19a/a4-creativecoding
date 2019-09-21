const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
app.use(compression);
app.use(helmet);

