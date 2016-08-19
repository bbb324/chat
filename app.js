/**
 * Created by Administrator on 2016/8/18.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var jsonfile = require('jsonfile');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var file = 'public/data/data.json';

const homeController = require('HomeController');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'test',
  port: 3306
})

app.set('view engine', 'xtpl');  //因为 node_modules 中 express 是 view engin 而不是 views
app.set('views', __dirname + '/views');


app.use(express.static('/chat'));  //设置最初一级访问目录
app.use('/', homeController.router);


//app.get('/', function(req, res){
//  res.render('index', {name: 'ww'});
//})

conn.query('select * from eat', function(err, rows, fields){
  jsonfile.writeFile(file, rows, function(err, obj){
    console.error(err)
  })
})

app.post('/add_more',upload.any(), function(req, res){
  console.log(req)
})


app.listen(4000);
