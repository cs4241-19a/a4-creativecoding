const express = require('express'),
    compression = require('compression'),
    helmet = require('helmet'),
    app = express();

// Use required middleware
app.use(compression());
app.use(helmet());

// Serve static files
app.use(express.static('public'));

// Map base url to index.html
app.use('/', express.static('public/index.html'));

// Start server
app.listen(process.env.PORT || 3000);
