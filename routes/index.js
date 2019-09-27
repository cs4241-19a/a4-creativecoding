var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Natalie Bloniarz Webware A4" });
});

router.get("/helpIcon", function (req, res, next) {
	res.send("./helpIcon.png");
});

router.get("/rainbowRoad", function (req, res, next) {
	res.send("./rainbowRoad.mp3");
});

module.exports = router;
