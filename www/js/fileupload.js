var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
})


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var ext = require('path').extname(file.originalname);
        ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
        require('crypto').pseudoRandomBytes(16, function (err, raw) {
            cb(null, (err ? undefined : raw.toString('hex') ) + ext);
        });
    }
});

var upload = multer({ storage: storage });

app.post('/file_upload', upload.any(), function (req, res, next) {
    res.send(req.files);
})