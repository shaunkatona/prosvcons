(function () {
    var stylus = require('stylus');
    var express = require('express');
    var nib = require('nib');
    var bodyParser = require('body-parser');
    var async = require('async');
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var localStrategy = require('passport-local').Strategy;
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
    app.use(cookieParser());
    //app.use(bodyParser());
    app.use(session({secret: "SECRET"}));
    app.use(passport.initialize());
    app.use(passport.session());

    require('./routes.js')(app);

    app.listen(process.argv[2] || 80);

    exports = module.exports = app;
})();