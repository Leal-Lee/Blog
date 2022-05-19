/**
 * 统一返回的数据格式
 */

module.exports.formatResqonse= function(code,msg,data){

    return {
        code,
        msg,
        data
      }
}

module.exports.handleError=function(){
  
}

/**
 * 
 * @param {  } fn  一个异步函数，返回模型查询
 * @returns 
 */


// content如下
  // async function fn(){
  //    return 
  //     await Admin.findOne({
  //       where: {
  //           [Op.and]: [{
  //                   loginId: login.loginId
  //               },
  //               {
  //                   loginPwd: login.loginPwd
  //               }
  //           ]
  //       }
  //     })
  //  }




// module.exports.tryCatchHandle =async function( fn){
  
//   try {
//     const result =await fn()

//     return result ? result.toJSON() : null
// } catch (err) {

//     throw new Error(err)
// }
// }