const md5 = require('md5')
const jwt = require('jsonwebtoken');


/**
 * 颁发token
 * @param {*} res   响应对象
 * @param {*} data  需要传递的数据
 * @param {*} maxAge token保存时间 （天）
 * @returns 
 */

exports.publishToken=function(res, data={},maxAge=1){
        // 生成token
        
    const token = jwt.sign(data, md5(process.env.JWT_SECRET),{
        expiresIn:maxAge*3600*24
    })
        // 设置消息头，并发送token
      res.set('authentication', token)

    return token
}



// 验证token
exports.verifyToken= function(req){
  let token=''
  if(req.headers.authorization){
    token =req.headers.authorization.split(' ')[1]
  }
   
    try {
        const decoded = jwt.verify(token,md5(process.env.JWT_SECRET))
        return decoded
      } catch(err){
          console.log(err)
        return null
      }
  
   
}