var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var db = require('./routes/db');
var route = require('./routes/route');
var app = express();

var mongodbUrl = 'mongodb://localhost:27017/chen';
mongoose.connect(mongodbUrl, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('连接成功');
    }
})

app.engine('html', require('express-art-template'));
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//发布页面
app.get('/publish', function (req, res) {
    res.render('publish.html');
})
//重定向
app.get('/', function (req, res) {
    res.redirect('/impress');
})

app.use(route);

app.listen(8080, function () {
    console.log(new Date() + 'running');
})