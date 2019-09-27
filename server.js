/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path');
const helment = require('helmet');
const compression = require('compression');

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(helment());
app.use(compression());


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
