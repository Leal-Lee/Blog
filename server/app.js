var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');

var logger = require('morgan');
var md5=require('md5')

// var uploadMiddleware = require('./utils/upload') //自定义的multer中间件

var { expressjwt: jwt } = require("express-jwt");
var {ForbiddenError} =require('./utils/error')
// 引入路由
var adminsRouter = require('./routes/adminsRouter'); 
var bannerRouter = require('./routes/bannerRouter'); 
var settingRouter = require('./routes/settingRouter'); 
var aboutRouter = require('./routes/aboutRouter'); 
var blogTypeRouter = require('./routes/blogTypeRouter'); 
var blogRouter = require('./routes/blogRouter'); 
var messageRouter = require('./routes/messageRouter'); 
var projectRouter = require('./routes/projectRouter'); 
var uploadMiddleware = require('./routes/uploadMiddleware'); 
var deleteMiddleware = require('./routes/deleteMiddleware'); 
require('express-async-errors');//处理异步错误
require('dotenv').config() //把.env中代码注入环境变量中
require('./dao/db') //导入初始化数据库

// 创建服务器实例
var app = express();

//使用中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// 使用express-jwt中间件,验证token
app.use(jwt({
  secret: md5(process.env.JWT_SECRET),
  algorithms: ["HS256"],
}).unless({ path: [
  {url:"/api/admin/login",method:'POST'},
  {url:"/api/banner",method:'GET'},
  {url:"/api/setting",method:'GET'},
  {url:"/api/about",method:'GET'},
  {url:"/api/project",method:'GET'},
  {url:"/api/blogtype",method:'GET'},
  {url:"/api/message",method:['GET','POST']},
  {url:"/api/comment",method:['GET','POST']},
  {url:/^\/api\/blog(\/(\d+)?)?$/,method:'GET'},
  {url:/^\/api\/blog[?][\w]+=[\w\W]+$/,method:'GET'},
  
] }))
// 使用路由中间件



app.post('/api/upload', uploadMiddleware)
app.use('/api/admin', adminsRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/setting', settingRouter);
app.use('/api/about', aboutRouter);
app.use('/api/delete',deleteMiddleware)
app.use('/api/blogtype', blogTypeRouter);
app.use('/api/blog', blogRouter);
app.use('/api/project', projectRouter);
app.use('/api/message', messageRouter);
app.use('/api/comment', messageRouter);

// 404页面
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误处理
app.use(require('./routes/errorMiddleware'));

module.exports = app;
