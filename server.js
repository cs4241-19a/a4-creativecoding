
const express = require("express");
const app = express();
const helmet = require('helmet')
const compression = require('compression') 
app.use(helmet())
app.use(compression())

app.use(express.static(__dirname + "/public"));
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/js/three.js", function(request, response) {
  response.sendFile(__dirname + "/js/three.js");
});
app.get("/js/three.min.js", function(request, response) {
  response.sendFile(__dirname + "/js/three.min.js");
});
app.get("/js/physi.js", function(request, response) {
  response.sendFile(__dirname + "/js/physi.js");
});
app.get("/js/physijs_worker.js", function(request, response) {
  response.sendFile(__dirname + "/js/physijs_worker.js");
});
app.get("/js/ammo.js", function(request, response) {
  response.sendFile(__dirname + "/js/ammo.js");
});
app.get("/js/client.js", function(request, response) {
  response.sendFile(__dirname + "/js/client.js");
});
app.get("/scripts/audio.js", function(request, response) {
  response.sendFile(__dirname + "/scripts/audio.js");
});
app.get("/scripts/main.js", function(request, response) {
  response.sendFile(__dirname + "/scripts/main.js");
});
app.get("/scripts/geometry.js", function(request, response) {
  response.sendFile(__dirname + "/scripts/geometry.js");
});
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});