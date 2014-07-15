/**
 * Created by shaun.katona on 7/7/2014.
 */
var stylus = require('stylus');
var express = require('express');
var nib = require('nib');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'jade');
app.use(stylus.middleware(
    {
        src: __dirname + '/stylus/',
        dest: __dirname + '/public/',
        linenos: true,
        compile: function (str, path) {
            return stylus(str)
                .set('filename', path)
                .use(nib());
        }
    }
));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
    res.render("index.jade");
});

app.get('/about', function (req, res) {
    res.render("about.jade");
});

app.get('/contact', function (req, res) {
    res.render("contact.jade");
});

app.post('/save', function (req, res) {
    console.log(req.body);
});

app.listen(8080);
