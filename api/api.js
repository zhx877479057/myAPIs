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

//查询个人全部信息
router.get('/personinfo', urlencodedParser, function (req, res) {
    var id = req.query.id
    console.log(id);
    var sql = `select * from personmanage where 手机号码=${id}`;
    connection.query(sql, function (err, result) {
        // console.log(result)
        if (err || result.length == 0) {
            res.status(200)
                res.json({'msg':'error'})
        } else {
        var data={'msg':'成功','arr':result}
            res.status(200)
                res.json(data)
        }
    });
})

//查询
router.get('/query', function (req, res) {
    console.log('query');

        var sql = 'select * from 产品';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('err:', err.message);
            }
            // console.log(result);
            var data = { 'err': 0, 'msg': '成功', 'arr': result };
            console.log(data);
            res.status(200)
                res.json(data);
        });
    // connection.end();
})

//添加
router.get('/add', function (req, res) {

    var name = req.query.name
    console.log(name);
    
     //构建添加语句，Id属性为auto_increment
      var sql="INSERT into user(name) VALUES("+connection.escape(name)+")";
    //  console.log(sql);
    //  console.log(sql);

     connection.query(sql, function (err, result) {
            if (err) {
                console.log('err:', err.message);
            }
            console.log(result);
            res.status(200)
                res.json(result)
        });
})

//修改
router.get('/change', function (req, res) {
    var SNAME = req.query.SNAME;
    var sql = `update user set name = '${SNAME}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200)
            res.json("修改成功")
    });
})

//删除
router.get('/delete', function (req, res) {
    console.log(req.query)
    var SNO = req.query.SNO;
    var sql = `delete from student where SNO='${SNO}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200)
            res.json("删除成功")
    });
})

module.exports=router;