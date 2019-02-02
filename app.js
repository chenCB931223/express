var express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var route = require('./routes/route');
var like = require('./routes/like');
var getIndex = require('./routes/getIndex');
var app = express();

var url = 'mongodb://localhost:27017/chen';
mongoose.connect(url, { useNewUrlParser: true }, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('连接成功');
    }
})
app.engine('html', require('express-art-template'));
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/publish', function (req, res) {
    res.render('publish.html');
})
app.get('/', function (req, res) {
    res.redirect('/impress');
})

app.use(route);
//app.use(getIndex);
app.use(like);

app.listen(8080, function () {
    console.log(new Date() + 'running');
})