/**
 * Created by Administrator on 2016/8/19.
 */
'use strict';
const express = require('express');
//const co = require('co');
//const mysql = require('mysql');
const config = require('../../config.js');
const bodyParser = require('body-parser');
//const mongodb = require('mongodb');
const eventproxy = require('eventproxy');
const async = require('async');
class HomeController{
  constructor(){
    this.router = express.Router();
    this.router.use(bodyParser.urlencoded());
    this.router.use(bodyParser.json());
    this.router.all('/', this.index);
  }

  index(req, res, next) {
    res.render('index', {name: 'wsw'});
   
  }

  /*mongo(req, res, next) {
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
  }*/
 /* agent(req, res, next) {
    var cnodeUrl = '';
    var ss = req.body.class;
    var items = [], str = '';
    var option = '';
    superagent.get(cnodeUrl)
      .end(function (err, rese) {
        if (err) {
          console.log(err)
        }
        var $ = cheerio.load(rese.text);
        option = $('clientList1');
        document.getElementsByClassName('clientList1');
        option.each(function (idx, element) {
          var $element = $(element);
          items.push({
            title: $element.attr('title'),
            href: $element.attr('href')
          });
        });

        res.send('eventproxy', {'msg': items});
      });
    console.log(req.item);
    next();
  }*/


  /*eventproxy(req, res) {
    res.render('eventproxy', {'msg': items});
  }*/
}


module.exports = new HomeController();