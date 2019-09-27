var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Natalie Bloniarz Webware A4" });
});

router.get("/a4CubeAnim2.gltf", function (req, res, next) {
	res.send("./a4CubeAnim2.gltf");
});

module.exports = router;
