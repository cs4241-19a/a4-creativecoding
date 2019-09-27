/* eslint-disable no-unused-vars */
var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/javascripts/main", function (req, res, next) {
	res.send("./javascripts/main.js");
});

module.exports = router;
