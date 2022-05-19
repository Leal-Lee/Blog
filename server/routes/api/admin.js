const {adminService,updateAdminService} = require('../../service/adminService');
const {verifyToken} = require('../../routes/jwt')
const {formatResqonse}= require('../../utils/tool')
// 登录接口
exports.login=async function(req, res, next) {
    //  处理验证码
  console.log('发送了登录请求',req.body)
    // 验证账号密码
      try{
         
        const result = await adminService(res,next,req.body)
        res.send(result)
      }catch(err){
        
        return next(err)
      }


  }

  //更新管理员接口
exports.updateAdmin=async function(req, res, next) {
    const result = await updateAdminService(next,req.body)
   
     res.send(result)
     
   }


exports.whoami=async function(req, res, next){

    const decoded = verifyToken(req)
     res.send(formatResqonse(0,'',decoded))
  
  
   }