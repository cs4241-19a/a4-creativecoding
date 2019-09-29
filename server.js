const express = require("express"),
  app = express(),
  compression = require("compression"),
  helmet = require("helmet");
//THREE = require("three");
const port = 3000;

app.use(express.static("public/"));
//app.get("/", (req, res) => res.send("Hello World!"));

app.use(compression());
app.use(helmet());

app.listen(port, () => console.log("Example app listening on port 3000!"));
