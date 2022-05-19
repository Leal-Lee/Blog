const {setBannerService,getBannerService} = require('../../service/bannerService');

const {formatResqonse}= require('../../utils/tool')
// 获取Banner
exports.getBanner=async function(req, res, next) {
   
  
 const data= await getBannerService()
  
res.send(data) 
  }

  //设置Banner
exports.setBanner=async function(req, res, next) {
    const data= await setBannerService(req.body)
   
     res.send(data)
     
   }


