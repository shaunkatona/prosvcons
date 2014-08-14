(function () {
    var stylus = require('stylus');
    var express = require('express');
    var nib = require('nib');
    var bodyParser = require('body-parser');
    var async = require('async');
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var flash = require('connect-flash');
    var LocalStrategy = require('passport-local').Strategy;
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
    app.use(flash());

    require('./routes.js')(app);

    app.listen(process.argv[2] || 80);

    exports = module.exports = app;

    passport.use(new LocalStrategy(function(username, password, done){
        Users.findOne({ username : username},function(err,user){
            if(err) { return done(err); }
            if(!user){
                return done(null, false, { message: 'Incorrect username.' });
            }

            hash( password, user.salt, function (err, hash) {
                if (err) { return done(err); }
                if (hash == user.hash) return done(null, user);
                done(null, false, { message: 'Incorrect password.' });
            });
        });
    }));
})();