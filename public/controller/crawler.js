'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const eventproxy = require('eventproxy');
const superagent = require('superagent');
const cheerio = require('cheerio');
const URL = 'https://cnodejs.org/';
const async = require('async');

class Crawler {
	constructor() {
		this.router = express.Router();
    //this.router.use(bodyParser.urlencoded());
    //this.router.use(bodyParser.json());
		this.router.get('/eventproxy', this.index, this.agent);
	}
	index(req, res, next) {
		//res.render('eventproxy', {name: 'wsw'});
		console.log(123);
		next();
	}
	agent(req, res, next) {
    let cnodeUrl = URL;
    let items = [], str = '';
    let option = '';
    superagent.get(cnodeUrl)
      .end(function (err, sres) {
        if (err) {
          console.log(23);
          return res.send();
        }
        let $ = cheerio.load(sres.text);
        let items = [];
        let option = $('.topic_title_wrapper');
        option.each(function (idx, element) {
          let $element = $(element);
          items.push({
            title: $element.attr('title'),
            href: $element.attr('href')
          });
        });
        res.render('eventproxy', {msg: items});
        //res.json({'msg': items});
      });
    //next();
  }
}

module.exports = new Crawler();