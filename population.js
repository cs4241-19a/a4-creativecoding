const fs = require("fs");

function getPopulation(req, res) {
    var full = JSON.parse(fs.readFileSync("./data/population.json", "utf8"));
    var year = req.query.year;
    var data = full[year];

    data["total"] = {
        "population": 0,
        "area": 0
    };
    for(const key in data) {
        data["total"]["population"] += data[key]["population"];
        data["total"]["area"] += data[key]["area"];
    }


    return res.send(data);
}

export {getPopulation};