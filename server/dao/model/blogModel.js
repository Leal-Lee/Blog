const { DataTypes } = require('sequelize');
const sequelize  =  require('../dbConnect')
const BlogType  =  require('./blogTypeModel')

const Blog = sequelize.define('Blog',{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    htmlContent:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    thumb:{
        type:DataTypes.STRING,
        allowNull:true
    },
    toc:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    scanNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    isDraft:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    commentNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

},{
    freezeTableName:true,
    updatedAt:false,
    createdAt:'createDate',
    // paranoid: true

})

BlogType.hasMany(Blog,{
    foreignKey: 'categoryId'
  });

Blog.belongsTo(BlogType,{
    as:'category'
  });

  

  
module.exports = Blog