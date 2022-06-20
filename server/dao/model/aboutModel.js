const { DataTypes } = require('sequelize');
const sequelize  =  require('../dbConnect')

const About = sequelize.define('About',{
    url:{
        type:DataTypes.STRING,
        allowNull:false
    },



},{
    freezeTableName:true,
    updatedAt:false,
    createdAt:false

})

module.exports = About