var express = require('express');
var like = express.Router();
var db = require('./db');
var url = require('url');

like.get(/\/like/, function (req, res) {
    var newUrl = url.parse(req.url, true);
    var id = newUrl.query.id.replace(/\"/g, '');

    db.findById({ _id: id }).then((doc) => {
        doc.like++;

        return doc.save();
    }).then((data) => {
        res.json(data);
    }).catch((err) => {
        console.error(err);
    })
})

module.exports = like;