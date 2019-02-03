var db = require('./db');
var express = require('express');
var fs = require('fs');
var url = require('url');
var template = require('art-template');
var router = express.Router();

//首页
router.get('/impress', function (req, res) {
    fs.readFile('./views/index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8;' });
        res.write(data);
        res.end();

    })
})

//数据库渲染页面
router.get(/^\/api\/impress/, function (req, res) {
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

//发布的内容存到数据库
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
        res.json(doc)
        return doc;
    }).catch((err) => {
        console.error(err);
    })
})

//渲染内容页面
router.get(/\/acticle/, function (req, res) {
    var newUrl = url.parse(req.url, true);
    var id = newUrl.query.id;

    db.findOne({ _id: id }).then((doc) => {
        var html = template(__dirname + '/template/blogs', doc);
        res.send(html);
        return doc;
    }).catch((err) => {
        console.error(err);
    })
})

//点赞
router.get(/\/like/, function (req, res) {
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

//评论
router.post('/comment', function (req, res) {
    let id = req.body.id.replace(/\"/g, ''),
        text = req.body.text;
    var newDate = new Date();
    var date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' '
        + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
    let comment_info = {
        text: text,
        date: date
    }

    db.findOne({ _id: id }).then((doc) => {
        doc.comment.unshift(comment_info);
        return doc.save();
    }).then((doc) => {
        res.send(doc.comment[0]);
        return doc;
    }).catch((err) => {
        console.error(err);
    })


})

//删除
router.get('/remove', function (req, res) {
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

module.exports = router;