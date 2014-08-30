module.exports = function(app, passport) {
    var List = require('../models/list');
    var mongoose = require('mongoose');

    app.get('/api/list/:id', function(req, res) {

        List.findByIdAndUpdate(req.params.id, {lastReadDate: Date.now}, function(err, list) {

            // if there are any errors, return the error before anything else
            if (err || !list) {
                console.log(err);

                list = [];
            } else {
                // if it's not an authenticated list, anyone can view it
                if (list.userID == "__public__") {
                    // no op
                } else { // if it's an authenticated list
                    // if it's a private list
                    if (list.isPrivate) {
                        if (req.isAuthenticated()) {
                            // then only the authenticated creator can view it
                            if (list.userID == req.user._id) {
                                // no op
                            } else {
                                list = [];
                                res.json(401, {error: true});
                                return;
                            }
                        } else {
                            list = [];
                            res.json(401, {error: true});
                            return;
                        }
                    } else { // if it's a public list then anyone can view it
                        // no op
                    }
                }
            }

            res.json(list);

        });

    });

    app.get('/api/lists', function(req, res) {
        if (req.isAuthenticated()) {
            List.find({userID: req.user._id}, function (err, lists) {
                if (err || !lists) {
                    console.log(err);

                    lists = [];
                }

                res.json(lists);
            });
        }
    });

    app.post('/api/delete', function (req, res) {
        var canDelete = false;

        // first we have to get the current list's information from the db
        List.find({_id: req.body._id}, function (err, list) {
            // only the list author can delete a list.  guest lists can never be deleted
            if (req.isAuthenticated()){
                if (req.user._id == list[0].userID) {
                    canDelete = true;
                }
            }

            if (canDelete) {
                list[0].remove(
                    function (err, list) {
                        if (err) {
                            console.log(err);
                        }
                    }
                );
            }

            // after deleting a list go back to the home page
            res.redirect('/');
        });
    });

    app.post('/api/save', function (req, res) {
        var newList = new List();
        newList.title = req.body.title;
        newList.pros = req.body.pros;
        newList.cons = req.body.cons;
        newList.insertDate = Date.now();
        newList.isPrivate = req.body.isPrivate;

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
        var canUpdate = false;

        // first we have to get the current list's information from the db
        List.find({_id: req.body._id}, function (err, list) {
            // if we're authenticated
            if (req.isAuthenticated()) {
                // make sure only the list author can update the list
                if (req.user._id == list.userID) {
                    canUpdate = true;
                } else if (list.userID == "__public__") { // or if the list is a guest list, anyone can update that too
                    canUpdate = true;
                }
            } else { // if we aren't authenticated, then you can only update a guest list
                if (list.userID == "__public__") {
                    canUpdate = true;
                }
            }

            if (canUpdate) {
                List.update(
                    {_id: req.body._id},
                    {
                        title: req.body.title,
                        pros: req.body.pros,
                        cons: req.body.cons,
                        isPrivate: req.body.isPrivate
                    },
                    function (err, list) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.json(list);
                        }
                    }
                );
            }
        });
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

    // frontend routes =========================================================
    app.get('/', function(req, res) {
        res.render('layout', {userID: (req.user && req.user._id) || "__public__", isLoggedIn: req.isAuthenticated(), loginMessage: req.flash('loginMessage'), signupMessage: req.flash('signupMessage')});
    });

    app.get('/partials/:name', function (req, res) {
        res.render('partials/'+ req.params.name, {userID: (req.user && req.user._id) || "__public__", isLoggedIn: req.isAuthenticated(), loginMessage: req.flash('loginMessage'), signupMessage: req.flash('signupMessage')});
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
