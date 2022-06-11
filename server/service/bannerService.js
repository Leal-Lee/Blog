const {setBannerDao,getBannerDao} = require('../dao/bannerDao')
const {formatResqonse}= require('../utils/tool')
// 获取标语
exports.getBannerService=async function(){
 
  const  data= await  getBannerDao()
  
    return formatResqonse(0,'',data)
}

// 设置标语
/**
 * 
 * @param {*} updateInfo 需要修改的数据，但必须包含ID，ID不可修改
 * @returns 
 */

exports.setBannerService=async function(updateInfo){
    const lastData={
      midImg: updateInfo.midImg,
      bigImg: updateInfo.bigImg,
      title: updateInfo.title,
      description:updateInfo.description
    }
    await  setBannerDao(updateInfo.id,lastData)
    let  data= await  getBannerDao()
   data= data.find((item)=>{
     
      return  item.id==updateInfo.id
    })
    return formatResqonse(0,'',data)
}