/**
 * Created by shaun.katona on 7/7/2014.
 */
(function () {
    var stylus = require('stylus');
    var express = require('express');
    var nib = require('nib');
    var bodyParser = require('body-parser');
    var mongojs = require('mongojs');
    var async = require('async');
    var app = express();
    var uri = "mongodb://nodejitsu:471dcfb59e0a68ffbadeb9a39ee694bf@troup.mongohq.com:10048/nodejitsudb6749814886",
        db = mongojs.connect(uri, ["lists"]);
    var currentID = "";

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
    app.use("/stylesheets", express.static(__dirname + '/public/stylesheets/'));

    app.get('/', function (req, res) {
        db.lists.find({}, function (error, lists) {
            if (error || !lists) {
                console.log(error);

                lists = [];
            } else {
            }

            res.render("index.jade", {'myLists': lists});
        });
    });

    app.get('/lists/:id', function (req, res) {
        currentID = req.params.id;

        async.parallel({lists: GetMyLists, prosCons: GetProsCons}, function (error, results) {
            if (error) {
                console.log(error);
            } else {
                res.render("index.jade", {'myLists': results.lists, 'title': resuts.prosCons.title, 'pros': results.prosCons.pros, 'cons': results.prosCons.cons});
            }
        });
    });

    app.get('/about', function (req, res) {
        res.render("about.jade");
    });

    app.get('/contact', function (req, res) {
        res.render("contact.jade");
    });

    app.post('/save', function (req, res) {
        db.lists.save({
            title: req.body.title,
            pros: req.body.pros,
            cons: req.body.cons
        }, function (error, value) {
            if (error) {
                console.log(error);
            } else {
            }
        });
    });

    /*
     app.get("/delete/:id", function (req, res) {
     db.lists.remove({
     _id: req.params.id
     }, function (error, value) {
     if (error) {
     console.log(error);
     } else {

     }
     });
     });

     app.get("/deleteall", function (req, res) {
     db.lists.remove({}, function (error, value) {
     if (error) {
     console.log(error);
     } else {

     }
     });
     });*/

    app.listen(process.argv[2] || 80);

    function GetProsCons(callback) {
        db.lists.find({"_id": mongojs.ObjectId(currentID)}, function (error, list) {
            if (error || !list) {
                console.log(error);

                list = {
                    title: "",
                    pros: [],
                    cons: []
                };
            } else {
            }

            callback(null, {title: list.title, pros: list.pros, cons: list.cons});
        });
    }

    function GetMyLists(callback) {
        db.lists.find({}, function (error, lists) {
            if (error || !lists) {
                console.log(error);

                lists = [];
            } else {
            }

            callback(null, lists);
        });
    }
})();