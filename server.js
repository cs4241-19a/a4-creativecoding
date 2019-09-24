const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(express.static("public"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(request, response) {
  "use strict";
  response.sendFile(__dirname + "/views/index.html");
});

app.listen(3000, function() {
  "use strict";
  console.log("Your app is listening on port " + 3000);
});