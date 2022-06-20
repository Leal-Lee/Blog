const {setSettingDao,getSettingDao} = require('../dao/settingDao')
const {formatResqonse}= require('../utils/tool')
// 获取标语
exports.getSettingService=async function(){
 
  const  data= await  getSettingDao()
  
    return formatResqonse(0,'',data)
}

// 设置标语
/**
 * 
 * @param {*} updateInfo 需要修改的数据，但必须包含ID，ID不可修改
 * @returns 
 */

exports.setSettingService=async function(updateInfo){

    await  setSettingDao(updateInfo)
    const  data= await  getSettingDao()

    return formatResqonse(0,'',data)
}