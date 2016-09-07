/**
 * Created by Administrator on 2016/8/19.
 */
'use strict';
const express = require('express');
const co = require('co');
var mysql = require('mysql');
var config = require('../../config.js');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
class HomeController{
  constructor(){
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded());
    this.router.use(bodyParser.json());
    this.router.all('/', this.index, this.con, this.fob);  //可以调用多个callback
    this.router.post('/searchdata', this.search);
    this.router.get('/student', this.mongo);
    this.router.post('/uploadstud', this.upload);
    this.router.get('/eventproxy', this.eventproxy);
  }

  index(req, res, next) {
    console.log(req.cookies);  //无签名的cookie
    console.log(req.signedCookies); //包含签名的cookie
    res.render('index', {name: 'ww'});
    next();
  }

  mongo(req, res, next) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/local';
    MongoClient.connect(url, function (err, db) {
      if (err) {
        console.log('unable to connect to the server', err);
      } else {
        console.log('Connection Established');
        var collection = db.collection('students');
        collection.find({}).toArray(function (err, result) {
          if (err) {
            res.send(err);
          } else if (result.length) {
            res.render('student', {"list": result})
          } else {
            res.send('no document found');
          }
          db.close();
        })
      }
    })
  }
  con(req, res, next) {
    console.log('from con');
    next();
  }
  fob(req, res) {
    console.log('from fob');
  }

  upload(req, res) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017/local';
    MongoClient.connect(url, function (err, db) {
      if (err)console.log('unable to connect to server', err);
      console.log('connected');
      var student = {};
      var collection = db.collection('students');
      student.student = req.body.student;
      student.street = req.body.street;
      student.city = req.body.city;
      student.state = req.body.state;
      collection.insert([student], function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('insert success');
          res.redirect('student')
        }
        db.close();
      })
    })
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

  eventproxy(req, res) {
    res.send('eventproxy')
  }
}


module.exports = new HomeController();