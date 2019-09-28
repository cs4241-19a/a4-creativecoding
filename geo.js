const fs = require("fs");

function getGeoData(req, res) {
    var data = JSON.parse(fs.readFileSync("./data/geo.json", "utf8"));
    return res.send(data);
}

export {getGeoData};