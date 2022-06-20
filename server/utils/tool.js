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


module.exports.randomNumber=function(min,max){
  return Math.floor(Math.random()*(max-min)+min) 
}





