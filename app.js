/**
 * Created by Administrator on 2016/8/18.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '111111',
  database: 'test',
  port: 3306
})
conn.connect();
conn.query('select * from eat', function(err, rows, fields){
  if(err) throw err;
  console.log(rows);
})

app.set('view engine', 'jade');  //因为 node_modules 中 express 是 view engin 而不是 views
app.set('views', __dirname + '/views');


app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index')
});

app.listen(4000);
