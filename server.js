const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

app.use(express.static("public"));
app.use(helmet());
app.use(compression());

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/views/graph.html");
});

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
