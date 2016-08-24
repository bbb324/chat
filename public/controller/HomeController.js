/**
 * Created by Administrator on 2016/8/19.
 */
'use strict';
const express = require('express');
const co = require('co');
var mysql = require('mysql');
var config = require('../../config.js');
var bodyParser = require('body-parser');
class HomeController{
  constructor(){
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded());
    this.router.use(bodyParser.json());
    this.router.all('/', this.index);
    this.router.post('/searchdata', this.search);

  }
  index(req, res){
    return res.render('index', {name: 'ww'});
  }

  search(req, res) {
    var arr = [];
    var conn = mysql.createConnection(config.connection);
    conn.query('select * from str where strs like "%' + req.body.name + '%"', function (err, rows, fields) {

      for (var i = 0; i < rows.length; i++) {
        arr[i] = rows[i].strs;
      }
      res.json(arr);
    });
  }
}


module.exports = new HomeController();