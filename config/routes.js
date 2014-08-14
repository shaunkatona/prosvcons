module.exports = function(app, passport) {
    var mongojs = require('mongojs');
    var databaseUrl = "prosvcons",
        db = mongojs.connect(databaseUrl, ["lists"]);

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/list/:id', function(req, res) {
        db.lists.find({_id: mongojs.ObjectId(req.params.id)}, function (error, list) {
            if (error || !list) {
                console.log(error);

                list = [];
            } else {
            }

            res.json(list);
        });
    });

    app.get('/api/lists', function(req, res) {
        db.lists.find({}, function (error, lists) {
            if (error || !lists) {
                console.log(error);

                lists = [];
            } else {
            }

            res.json(lists);
        });
    });

    app.post('/api/save', function (req, res) {
        db.lists.save({
            title: req.body.title,
            pros: req.body.pros,
            cons: req.body.cons,
            insertDate: new Date()
        }, function (error, list) {
            if (error) {
                console.log(error);
            } else {
                res.json(list);
            }
        });
    });

    app.post('/api/update', function (req, res) {
        db.lists.update({
            _id: mongojs.ObjectId(req.body._id)
        },
        {
            title: req.body.title,
            pros: req.body.pros,
            cons: req.body.cons,
            insertDate: new Date()
        }, function (error, list) {
            if (error) {
                console.log(error);
            } else {
                res.json(list);
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

    // TODO route to handle list delete (app.delete)

    // frontend routes =========================================================
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/partials/:name', function (req, res) {
        res.render('partials/'+ req.params.name);
    });

    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.render('index');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
