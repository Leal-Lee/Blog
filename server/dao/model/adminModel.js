const { DataTypes } = require('sequelize');
const sequelize  =  require('../dbConnect')

const Admin = sequelize.define('Admin',{
    loginId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    loginPwd:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isSpuerAdmin:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:false
    }
},{
    freezeTableName:true,
    updatedAt:false,
    createdAt:false

})

module.exports = Admin