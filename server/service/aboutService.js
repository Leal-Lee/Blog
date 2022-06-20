const {setAboutDao,getAboutDao} = require('../dao/aboutDao')
const {formatResqonse}= require('../utils/tool')
// 获取标语
exports.getAboutService=async function(){
 
  const  data= await  getAboutDao()
    
    return formatResqonse(0,'',data.url)
}

// 设置标语
/**
 * 
 * @param {*} updateInfo 需要修改的数据，但必须包含ID，ID不可修改
 * @returns 
 */

exports.setAboutService=async function(updateInfo){

    await  setAboutDao(updateInfo)
    const  data= await  getAboutDao()

    return formatResqonse(0,'',data)
}