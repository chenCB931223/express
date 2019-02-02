
var db = require('./db');
var url = require('url');

module.exports = function (req, res) {
    if (/\/like/.test(req.url)) {
        var newUrl = url.parse(req.url, true);
        var id = newUrl.query.id.replace(/\"/g, '');

        db.findById({ _id: id }).then((doc) => {
            doc.like++;

            return doc.save();
        }).then((data) => {
            res.send(data);
        }).catch((err) => {
            console.error(err);
        })
    }
}