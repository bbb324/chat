/**
 * Created by Administrator on 2016/8/18.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var jsonfile = require('jsonfile');

var file = 'public/data/data.json';


var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'test',
  port: 3306
})

app.set('view engine', 'xtpl');  //因为 node_modules 中 express 是 view engin 而不是 views
app.set('views', __dirname + '/public/views');


app.use(express.static('/public'));


conn.query('select * from eat', function(err, rows, fields){
  jsonfile.writeFile(file, rows, function(err, obj){
    console.error(err)
  })
})

app.get('/', function(req, res){

  conn.query('select * from eat', function(err, rows, fields){
    if(err) throw err;

    res.render('index', {name: rows[0].name})
  })

  //res.render('index')
});

app.listen(4000);
