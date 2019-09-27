// Set up constants
const express    = require('express');
const favicon    = require('serve-favicon');
const bodyParser = require('body-parser');
const fs         = require('fs');
const low        = require('lowdb');
const FileSync   = require('lowdb/adapters/FileSync');
const nodeMailer = require('nodemailer');
const transport  = nodeMailer.createTransport({
    servivce: 'yahoo',
    host: 'smtp.mail.yahoo.com',
    secure: true,
    auth: {
        user: "gogoatsrb@yahoo.com",
        pass: "J1a2c3k4!"
    }
});
const adapter    = new FileSync(__dirname + '/public/stickersInfo.json');
const db         = low(adapter);
const app        = express();
const port       = 3000;
const baseURL    = __dirname + '/public/'

// Set up middleware
app.use(express.static('/public'));
app.use(favicon(baseURL + "assets/favicon.ico"))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Configure JSON DB
db.defaults({ stickers: []}).write()

app.get("/", (req, res) => {
    res.sendFile(baseURL + 'index.html');
})

app.get("/script.js", (req, res) => {
    res.sendFile(baseURL + 'script.js');
})

app.get("/style.css", (req, res) => {
    res.sendFile(baseURL + 'style.css');
})

app.get("/assets/goat.png", (req, res) => {
    res.sendFile(baseURL + 'assets/goat.png')
})

app.post("/submit", (req, res) => {
    data = req.body;
    const path = "testImg.png";
    const imgData = data.imageBase64.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile(baseURL + "images/" + path, imgData, 'base64', function(err) {
        if (err) console.log(err);
        else {
            const msg = {
                from: 'gogoatsrb@yahoo.com',
                to: req.body.stickerInfo.email,
                subject: 'Sticker (`' + req.body.stickerInfo.text + '`)',
                html: 'Hey There!<br><br>Thanks for making a sticker!<br><br><img src="cid:unique@sticker.order"/>',
                attachments: [{
                    filename: path,
                    path: baseURL + 'images/' + path,
                    cid: 'unique@sticker.order' //same cid value as in the html img src
                }]
            }
            transport.sendMail(msg, function(error, inof) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email Sent!')
                }
            });
        }
    });
    console.log(req.body.stickerInfo);
    db.get('stickers').push(req.body.stickerInfo).write();
    res.send();
})



app.listen(port);
