var express = require('express');
var url = require('url');
var getIndex = express.Router();

var db = require('./db');

getIndex.get(/^\/api\/impress/, function (req, res) {
    let newUrl = url.parse(req.url, true);
    let page_num = newUrl.query.page_num || 1;


    db.find().sort({ _id: -1 }).then((docs) => {
        let limit = 3;
        let pages = Math.ceil(docs.length / limit);
        let list = docs.slice(limit * (page_num - 1), limit * page_num);

        let data = {
            limit: limit,
            pages: pages,
            page_num: page_num,
            list: list
        }

        res.send(data);

        return docs
    }).catch((err) => {
        console.error(err);

    })
})

module.exports = getIndex;