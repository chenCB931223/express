var mongoose = require('mongoose');
var schema = mongoose.Schema;

var user = new schema({
    title: String,
    content: String,
    date: String,
    like: {
        type: Number,
        default: 0
    },
    /*  comment: {
         type: Array,
         default: []
     }, */

}, { versionKey: false })

module.exports = mongoose.model('users', user);