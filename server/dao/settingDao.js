const Setting = require('./model/settingModel.js')

const {
    Op
} = require("sequelize");


// 设置
exports.setSettingDao = async function (updateInfo) {

   await Setting.update(updateInfo,{
       where:{
           id:1
       }
   })
     
}

// 获取

exports.getSettingDao = async function () {
    
    try{
    
        const result= await Setting.findOne({ raw: true })
        
        return result 
    }catch(err){
    
        throw new Error(err)
    }


}