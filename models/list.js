var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
    title: String,
    pros: [
        {description: String, weight: Number}
    ],
    cons: [
        {description: String, weight: Number}
    ],
    insertDate: Date,
    userID: {type: String, default: "__public__"},
    isPrivate: {type: Boolean, default: true}
});

// create the model for users and expose it to our app
module.exports = mongoose.model('List', listSchema);