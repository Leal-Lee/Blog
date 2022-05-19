const {publishToken,verifyToken} = require('../routes/jwt')
const {adminDao,updateAdminDao} = require('../dao/adminDao')
const md5 = require('md5');
const {ValidationError} =require('../utils/error')
const {formatResqonse}= require('../utils/tool')
// 登录验证
exports.adminService = async function (res,next,loginInfo) {
    //对密码进行加密
  
    loginInfo.loginPwd = md5(loginInfo.loginPwd)

    //获得数据库查询结果
    try{
      let data = await adminDao(loginInfo)
      // data有值，登录成功，设置登录时间，生成token，将token和数据返回给路由
         if (data) {
         //    重置data数据
             data = {
                 id: data.id,
                 loginId: data.loginId,
                 name: data.name
             }
             //生成token
          const token =   publishToken(res,data, +loginInfo.remember)
             
        
             return formatResqonse(0,'',data)
             
         }else{
             // 如果没查询到，登录失败，抛出错误
             next( new ValidationError('账号或密码错误,请重新输入')) 
         }
    }catch(err){
      console.log(err)
    }

     


}



/**
 * 修改密码
 * @param {*} res 
 * @param {*} updateAdminInfo  需要修改的信息，包含旧密码
 */
exports.updateAdminService= async function(next,updateAdminInfo){
 
//   旧账号和密码
  const oldAdmin={
    loginId:updateAdminInfo.loginId,
    loginPwd:md5(updateAdminInfo.oldLoginPwd)
  }

  //要修改的信息
  const updateInfo={
    name:updateAdminInfo.name,
    loginPwd:md5(updateAdminInfo.loginPwd)
  }
//   查询,验证账号密码
  const admin= await adminDao(oldAdmin)

  if(admin){
    //   验证通过后修改数据
   await updateAdminDao(updateInfo,admin)
  //  获取管理员最新的信息
  const lastInfo= {
    loginId:updateAdminInfo.loginId,
    loginPwd:md5(updateAdminInfo.loginPwd)
  }
  const lastAdmin = await adminDao(lastInfo)
  const data={
    name:lastAdmin.name,
    id: lastAdmin.id,

  }
  return formatResqonse(0,'',data)

  }else{   
    // 这里注意：由于查询结果是异步的，直接抛出错误，express捕获不到，需调用next函数手动传递给错误处理中间件
  
    next( new ValidationError('账号或旧密码错误,请重新输入')) 

  }
}