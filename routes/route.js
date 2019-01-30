var db = require('./db');
var express = require('express');
var router = express.Router();

router.post('/api/publish', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;

})

module.exports = router;