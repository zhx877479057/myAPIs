//引入模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//引入页面文件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置views路径和模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//使用dev日志输出
app.use(logger('dev'));

////body解析
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置静态资源文件目录
app.use(express.static(path.join(__dirname, 'public')));

//页面路由处理，这段处理代码表示，路由/ 也就是首页的时候执行index
app.use('/', indexRouter);
app.use('/users', usersRouter);

//接口路由处理
//上传接口
// const uplo=require('./routes/upload');
// app.use('/upload',uplo);

const personinfo=require('./api/api');
app.use('/',personinfo);

// 报错处理404页面
app.use(function(req, res, next) {
  next(createError(404));
});

// 报错处理程序
app.use(function(err, req, res, next) {
  // 设置局部变量，只在开发过程中提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 呈现错误页面
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
