var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
var md5=require('md5')
var { expressjwt: jwt } = require("express-jwt");
var {ForbiddenError} =require('./utils/error')
// 引入路由
var adminsRouter = require('./routes/adminsRouter'); 
var bannerRouter = require('./routes/bannerRouter'); 
require('express-async-errors');//处理异步错误
require('dotenv').config() //把.env中代码注入环境变量中
require('./dao/db') //导入初始化数据库

// 创建服务器实例
var app = express();

//使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// 使用express-jwt中间件,验证token
app.use(jwt({
  secret: md5(process.env.JWT_SECRET),
  algorithms: ["HS256"],
}).unless({ path: [
  {url:"/api/admin/login",method:'POST'},
  {url:"/api/banner",method:'GET'}
] }))
// 使用路由中间件

app.use('/api/admin', adminsRouter);
app.use('/api/banner', bannerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(require('./routes/errorMiddleware'));

module.exports = app;
