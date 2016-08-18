/**
 * Created by Administrator on 2016/8/18.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'jade');  //因为 node_modules 中 express 是 view engin 而不是 views
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index')
});

app.listen(4000);
