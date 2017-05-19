/**
 * Created by Administrator on 2016/8/18.
 */
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//var mysql = require('mysql');
var jsonfile = require('jsonfile');
var cookiePraser = require('cookie-parser');

const homeController = require('./public/controller/HomeController');
const Crawler = require('./public/controller/Crawler');
var config = require('./config.js');
//var mongo = require('mongodb');  //使用mongodb

//var conn = mysql.createConnection(config.connectionMySQL);


app.set('view engine', 'xtpl');  //因为 node_modules 中 express 是 view engin 而不是 views
app.set('views', __dirname + '/views');

app.use(cookiePraser());            // 引入cookiePraser 可以在ajax的时候通过 req.cookies 来读取cookies，可以加参数做加密，读取通过signCookies
app.use(express.static(__dirname + '/public'));  //设置最初一级访问目录
app.use(homeController.router); //引导对应的视图文件到controller里面去解决
app.use(Crawler.router); //引导对应的视图文件到controller里面去解决

/*conn.query('select * from eat', function(err, rows, fields){
  console.log(rows)
});*/

console.log('listen on 4000');
app.listen(4000);
//todo