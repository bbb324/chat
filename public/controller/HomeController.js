/**
 * Created by Administrator on 2016/8/19.
 */
const express = require('express');

class HomeContrlller{
  constructor(){
    this.router = express.Router();
    this.router.all('/', this.index);
  }
  index(req, res){
    return res.redirect('index')
  }
}
modules.exports = new HomeContrlller();