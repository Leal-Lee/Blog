const Banner = require('./model/bannerModel.js')

const {
    Op
} = require("sequelize");


// 设置
exports.setBannerDao = async function (id,updateInfo) {

   await Banner.update(updateInfo,{
       where:{
           id
       }
   })
     
}

// 获取

exports.getBannerDao = async function () {
    
    try{
    
        const result= await Banner.findAll({ raw: true })
        
        return result 
    }catch(err){
        console.log(err)
        throw new Error(err)
    }


}