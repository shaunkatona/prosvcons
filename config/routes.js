module.exports = function(app, passport) {
    var List = require('../models/list');
    var mongoose = require('mongoose');

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/list/:id', function(req, res) {
        List.findByIdAndUpdate(req.params.id, {lastReadDate: Date.now}, function(err, list) {
            // if there are any errors, return the error before anything else
            if (err || !list) {
                console.log(err);

                list = [];
            }

            res.json(list);
        });
    });

    app.get('/api/lists', function(req, res) {
        if (req.isAuthenticated()) {
            List.find({_id: req.user._id}, function (err, lists) {
                if (err || !lists) {
                    console.log(err);

                    lists = [];
                }

                res.json(lists);
            });
        } else {

            List.find(function (err, lists) {
                if (err || !lists) {
                    console.log(err);

                    lists = [];
                }

                res.json(lists);
            });
        }
    });

    app.post('/api/save', function (req, res) {
        var newList = new List();
        newList.title = req.body.title;
        newList.pros = req.body.pros;
        newList.cons = req.body.cons;
        newList.insertDate = Date.now();

        if (req.isAuthenticated()) {
            newList.userID = req.user._id;
        }

        newList.save(function (err, list) {
            if (err) {
                console.log(err);
            } else {
                res.json(list);
            }
        });
    });

    app.post('/api/update', function (req, res) {
        List.update(
            {_id: req.body._id},
            {
                title: req.body.title,
                pros: req.body.pros,
                cons: req.body.cons
            },
            function (err, list) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(list);
                }
            }
        );
    });


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the home page
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // TODO route to handle list delete (app.delete)


    // frontend routes =========================================================
    app.get('/', function(req, res) {
        res.render('layout', {isLoggedIn: req.isAuthenticated()});
    });

    app.get('/partials/:name', function (req, res) {
        res.render('partials/'+ req.params.name);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.render('layout');
    });
};
