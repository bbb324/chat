'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const http = require('http');
const URL = 'https://movie.douban.com/';
const async = require('async');

class Crawler {
  constructor() {
    this.router = express.Router();
    //this.router.use(bodyParser.urlencoded());
    //this.router.use(bodyParser.json());
    this.router.get('/eventproxy', this.agent.bind(this), this.sig.bind(this));
    //this.router.get('/eventproxy', this.spe.bind(this));
    this.items = [];
    this.ep = new eventproxy();
    this.count = 1;
  }

  spe(req, res) {
    superagent.get('https://cnodejs.org/topic/59449c34ff5813233faad94d')
      .end(function(err, sres) {
        let arr = [];
        let $ = cheerio.load(sres.text);
        let user = $('.user_name a').attr('href');
        arr.push({
          title: 1,
          href: user
        });
        res.render('eventproxy', {
          msg: arr
        });
      })
  }

  agent(req, res, next) {
    let self = this;
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
        //self.sig(self.items);
        res.render('eventproxy', {
          msg: self.items,
          count: self.count
        });
        //next();
      });
  }
  sig(req, res) {
    let self = this;
    let re = [];
    let url = 'https://cnodejs.org';
    this.items.forEach((item) => {
      superagent.get(url + item.href)
        .end((err, sres) => {
          if(err) {
            return res.send();
          }
          console.log(url + item.href);
          let $ = cheerio.load(sres.text);
          let option = $('.user_name')[0];
          //console.log(sres.text);
          console.log(option);
          re.push({
            title: 1,
            href: option
          });
        })
    })
    res.render('eventproxy', {
      msg: re
    });
  }
}

module.exports = new Crawler();

