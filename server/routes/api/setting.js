const {setSettingService,getSettingService} = require('../../service/settingService');


// 获取Setting
exports.getSetting=async function(req, res, next) {
   

 const data= await getSettingService()
  
res.send(data) 
  }

  //设置Setting
exports.setSetting=async function(req, res, next) {
    
    const data= await setSettingService(req.body)

     res.send(data)
     
   }


