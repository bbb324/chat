'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const http = require('http');
const URL = 'https://cnodejs.org/';
const async = require('async');

class Crawler {
	constructor() {
		this.router = express.Router();
    //this.router.use(bodyParser.urlencoded());
    //this.router.use(bodyParser.json());
		this.router.get('/eventproxy', this.agent);
	}
	agent(req, res, next) {
    let cnodeUrl = URL;
    let items = [], str = '';
    let option = '';
    superagent.get(cnodeUrl)
      .end(function (err, sres) {
        if (err) {
          return res.send();
        }
        let $ = cheerio.load(sres.text);
        let items = [];
        let option = $('.topic_title_wrapper .topic_title');
        option.each(function (idx, element) {
          let $element = $(element);
          items.push({
            title: $element.attr('title'),
            href: $element.attr('href')
          });
        });
        res.render('eventproxy', {msg: items});
      });
  }
}

module.exports = new Crawler();