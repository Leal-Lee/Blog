const {setAboutService,getAboutService} = require('../../service/aboutService');


// 获取About
exports.getAbout=async function(req, res, next) {
   
  
 const data= await getAboutService()

res.send(data) 
  }

  //设置About
exports.setAbout=async function(req, res, next) {
   
    const data= await setAboutService(req.body)
     res.send(data)
     
   }


