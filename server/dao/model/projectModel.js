const { DataTypes } = require('sequelize');
const sequelize  =  require('../dbConnect')

const Project = sequelize.define('Project',{
   name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    thumb:{
        type:DataTypes.STRING,
        
    },
    github:{
        type:DataTypes.STRING,
        allowNull:false
    },
    order:{
        type:DataTypes.INTEGER,
        allowNull:false
    }


},{
    freezeTableName:true,
})


  
module.exports = Project