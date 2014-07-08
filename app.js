/**
 * Created by shaun.katona on 7/7/2014.
 */
var stylus = require('stylus');
var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(stylus.middleware(
    {
        src: __dirname + '/public/',
        dest: __dirname + '/public/stylesheets',
        linenos: true
    }
));
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

app.listen(8080);
