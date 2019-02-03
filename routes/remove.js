let express = require('express');
let url = require('url');
let remove = express.Router();
let db = require('./db');

remove.get('/remove', function (req, res) {
    let newUrl = url.parse(req.url, true);
    let id = newUrl.query.id.replace(/\"/g, '');
    db.deleteOne({ _id: id }, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('删除成功');
        }
    })


})

module.exports = remove;