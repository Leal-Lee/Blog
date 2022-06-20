const About = require('./model/aboutModel.js')

const {
    Op
} = require("sequelize");


// 设置
exports.setAboutDao = async function (updateInfo) {

   await About.update(updateInfo,{
       where:{
           id:1
       }
   })
     
}

// 获取

exports.getAboutDao = async function () {
    
    try{
    
        const result= await About.findOne({ raw: true })
        
        return result 
    }catch(err){
    
        throw new Error(err)
    }


}