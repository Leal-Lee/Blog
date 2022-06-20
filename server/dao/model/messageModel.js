const { DataTypes } = require('sequelize');
const sequelize  =  require('../dbConnect')
const Blog  =  require('./blogModel')
const Message = sequelize.define('Message',{
    nickname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    updatedAt:false,
    createdAt:'createDate',
})

Blog.hasMany(Message,{
    foreignKey: 'blogId',

});

Message.belongsTo(Blog,{
    as:'blog'
  });
  
module.exports = Message