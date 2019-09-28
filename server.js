const express = require("express");
const path = require("path");
const app = express();

require("@babel/register")({
  presets: ["@babel/preset-env"]
});
import {getGeoData} from "./geo.js";
import {getPopulation} from "./population.js";


app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/",function(req,res) {
  res.sendFile(path.join(__dirname+"/views/index.html"));
});

app.get("/getGeoData", getGeoData);
app.get("/getPopulation", getPopulation);

app.listen(process.env.PORT || 8000, () => console.log(`Listening on port ${process.env.PORT || 8000}!`));