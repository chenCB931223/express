var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema({
    title: String,
    content: String,
    date: String,
});

module.exports = mongoose.model('users', user);