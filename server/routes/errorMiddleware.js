var {ForbiddenError,ServiceError,UnknownError} =require('../utils/error')
const multer = require('multer')
 module.exports = async function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
      res.send(  new ForbiddenError('未登录或者登录已过期，请重新登录'). toResponseJSON())
 
    }else if(err instanceof ServiceError){
     
      res.send( err.toResponseJSON())
  
    } else if(err instanceof multer.MulterError){
      
      res.send( err.toResponseJSON())

    }
    else {
      res.send( new UnknownError('未知错误').toResponseJSON())
 
    }
  
  }
