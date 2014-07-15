/**
 * Created by shaun.katona on 7/7/2014.
 */
var stylus = require('stylus');
var express = require('express');
var nib = require('nib');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
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
app.use(bodyParser.json()); // required to run req.body in app.post()
app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
    var uri = "mongodb://nodejitsu:471dcfb59e0a68ffbadeb9a39ee694bf@troup.mongohq.com:10048/nodejitsudb6749814886",
        db = mongojs.connect(uri, ["lists"]);

    db.lists.find({}, function (error, lists) {
        if (error || !lists) {
            console.log(error);

            lists = [];
        } else {
        }

        res.render("index.jade", {'myLists': lists});
    });
});

app.get('/about', function (req, res) {
    res.render("about.jade");
});

app.get('/contact', function (req, res) {
    res.render("contact.jade");
});

app.post('/save', function (req, res) {
    console.log(req.body);

    var uri = "mongodb://nodejitsu:471dcfb59e0a68ffbadeb9a39ee694bf@troup.mongohq.com:10048/nodejitsudb6749814886",
        db = mongojs.connect(uri, ["lists"]);

    db.lists.save({
        title: req.body.title
    }, function (error, value) {
        if (error) {
            console.log(error);
        } else {
            console.log(value);
        }
    });
});

app.listen(8080);
