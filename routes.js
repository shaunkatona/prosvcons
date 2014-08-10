module.exports = function(app) {
    var mongojs = require('mongojs');
    var databaseUrl = "prosvcons",
        db = mongojs.connect(databaseUrl, ["lists"]);

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    app.get('/api/list/:id', function(req, res) {
        db.lists.find({_id: mongojs.ObjectId(req.params.id)}, function (error, lists) {
            if (error || !lists) {
                console.log(error);

                lists = [];
            } else {
            }

            res.json(lists);
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
            cons: req.body.cons
        }, function (error, value) {
            var success = {success: true};

            if (error) {
                console.log(error);
                success.success = false;
            } else {

            }

            res.json(success);
        });
    });

    // route to handle creating (app.post)
    // route to handle delete (app.delete)

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
};
