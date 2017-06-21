'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const http = require('http');
const mongoose = require('mongoose');
const URL = 'https://movie.douban.com/';
const async = require('async');
const config = require('../../config.js');
const Appslf = require('../db/Appslf');

class Crawler {
  constructor() {
    this.router = express.Router();
    this.router.get('/eventproxy', this.initDB.bind(this), this.agent.bind(this), this.toDB.bind(this));
    this.items = [];
    this.ep = new eventproxy();
    this.count = 1;
    this.data = [{title: 1, name:'a'}, {title: 2, name: 'b'}]

  }
  agent(req, res, next) {

    Appslf.Query("edf").then((res)=>{
      console.log(res);
    }).catch(function(err) {
      console.log(err);
    })
    /*let self = this;
    superagent.get(URL)
      .end(function(err, sres) {
        if(err) {
          return res.send();
        }
        let $ = cheerio.load(sres.text);
        let option = $('.ui-slide-item .poster');
        option.each(function(idx, ele) {
          let $ele = $(ele);
          let rating = $ele.next().next().text();
          let ticket = $ele.parent().find('.ticket_btn').find('a').attr('href');
          self.count++;
          if(rating > 7) {
            self.items.push({
              'title': $ele.find('img').attr('alt'),
              'href': $ele.find('a').attr('href'),
              'rating': $ele.next().next().text(),
              'ticket': ticket
            });
          }
        });
        res.render('eventproxy', {
          msg: self.items,
          count: self.count
        });
        next();
      });*/
  }
  toDB() {
    //console.log(this.items);
    let Schema = mongoose.Schema;
  }
  initDB(req, res, next) {
    console.log(123);
    var name = 'abc';
    var title = 'edf';
    Appslf.Insert(name, title).then(function(cloudId) {
      console.log(cloudId);
    }).catch(function(err) {
      console.log(err);
    });
    next();
  }
}

module.exports = new Crawler();

