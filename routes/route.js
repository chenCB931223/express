var db = require('./db');
var express = require('express');
var router = express.Router();
var url = require('url');

router.post('/api/publish', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    var newDate = new Date();
    var date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' '
        + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();

    db.find({ title: title }).then(() => {
        var blog = new db({
            title: title,
            content: content,
            date: date,
        })

        return blog.save();
    }).then((doc) => {
        res.json(doc);
        return doc;
    }).catch((err) => {
        console.error(err);
    })
})

router.get(/\/acticle/, function (req, res) {
    var newUrl = url.parse(req.url, true);
    var id = newUrl.query.id;
    console.log(id);
    db.findById({ _id: id }).then((doc) => {
        var data = {
            list: doc
        }
        console.log(data)
        res.render('blog.html', data);


        return doc;
    }).catch((err) => {
        console.error(err);
    })
})

router.get('/impress', function (req, res) {
    res.render('index.html');
})
router.get(/^\/api\/impress/, function (req, res) {
    var newUrl = url.parse(req.url, true);
    var page_num = newUrl.query.page_num || 1;

    db.find().sort({ _id: -1 }).then((docs) => {
        var limit = 3;
        var pages = Math.ceil(docs.length / limit);
        var list = docs.slice(limit * (page_num - 1), limit * page_num);

        var data = {
            limit: limit,
            pages: pages,
            list: list,
            page_num: page_num
        }

        res.send(data);

        return docs
    }).catch((err) => {
        console.error(err);
    })
})
router.post('/comment', function (req, res) {
    var newDate = new Date();
    var date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' '
        + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    var id = req.body.id.replace(/\"/g, ''),
        comment_text = req.body.text;

    db.findOne({ _id: id }).then((doc) => {
        var comment_info = {
            text: comment_text,
            date: date
        }

        doc.comment.unshift(comment_info);


        return doc.save();
    }).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        console.error(err);
    })
})
module.exports = router;