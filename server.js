/**
 * Created by shaun.katona on 7/7/2014.
 */
(function () {
    var stylus = require('stylus');
    var express = require('express');
    var nib = require('nib');
    var bodyParser = require('body-parser');
    var async = require('async');
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
    app.use("/stylesheets", express.static(__dirname + '/public/stylesheets/'));

    require('./routes.js')(app);

    app.listen(process.argv[2] || 80);

    exports = module.exports = app;

    /*
    app.get('/about', function (req, res) {
        res.render("about.jade");
    });

    app.get('/contact', function (req, res) {
        res.render("contact.jade");
    });

    app.get("/delete/:id", function (req, res) {
         db.lists.remove({
             _id: req.params.id
         }, function (error, value) {
             if (error) {
                console.log(error);
             } else {
             }
         });
     });*/
})();