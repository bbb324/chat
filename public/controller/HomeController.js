/**
 * Created by Administrator on 2016/8/19.
 */
'use strict';
const express = require('express');
const co = require('co');
class HomeController{
  constructor(){
    this.router = express.Router();
    this.router.all('/', this.index);
  }
  index(req, res){
    return res.render('index', {name: 'ww'});
  }
}


module.exports = new HomeController();