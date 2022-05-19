const { Sequelize } = require('sequelize');
require('dotenv').config() //把.env中代码注入环境变量中
// 创建数据库连接


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:'mysql',
    logging: false, 
  });
  
// 导出连接好的数据库实例
  module.exports= sequelize