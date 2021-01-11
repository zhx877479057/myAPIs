const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config/config.json');

//链接数据库
const connection = mysql.createConnection(config);
connection.connect();

const bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析(post方法)
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.insertup=function (name,path) {
    console.log(name,path);
}

