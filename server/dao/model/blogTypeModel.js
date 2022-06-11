const { DataTypes } = require('sequelize');
const sequelize  =  require('../dbConnect')

const BlogType = sequelize.define('BlogType',{
    name:{
        type:DataTypes.STRING,
        defaultValue:'未分类'
    },
    articleCount:{
        type:DataTypes.STRING,
        allowNull:false
    },
    order:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    freezeTableName:true,
    updatedAt:false,
    createdAt:false,
    paranoid: true

})



module.exports = BlogType