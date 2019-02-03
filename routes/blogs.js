let express = require('express');
let url = require('url');
let db = require('./db');
let blog = express.Router();

blog.get(/\/acticle/, function (req, res) {
    var newUrl = url.parse(req.url, true);
    var id = newUrl.query.id;

    db.findOne({ _id: id }).then((doc) => {

        var data = {
            list: doc
        }

        res.render('blog.html', data);
        return doc;
    }).catch((err) => {
        console.error(err);
    })
})

module.exports = blog;