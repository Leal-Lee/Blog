const  Schema= require('validate')
const BlogType = require('../dao/model/BlogTypeModel')
const {ValidationError} =require('./error')
 // 服务端验证，验证传入的数据类型是否正确



exports.blogTypeValidate=function(obj,next){
      
    const schema = new Schema({
        name:{
          type: String,
          required: true,
        },
        order:{
          type: Number,
          required: true,
        },
        id:{
          type: Number,
          
        },
        articleCount:{
          type: Number,
          
        },
      })
  const errors=schema.validate(obj)
  if(errors[0]){
    // 有错误

    next( new ValidationError(errors[0].message)) 
  
   }
  
 return errors[0]
 
}



exports.blogValidate= function(obj,next){

  const schema = new Schema({
    title:{
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      htmlContent:{
        type: String,
        required: true,
      },
      thumb:{
        type: String,
       
      },
      toc:{
        type: String,
        required: true,
      },

      scanNumber:{
        type: Number,
        required: true,
      },    
      isDraft:{
        type: Boolean,
        required: true,
      },   
      commentNumber:{
        type: Number,
        required: true,
      },
      categoryId:{
        type: Number,
        required: true,
      
      },
    })
const errors=schema.validate(obj)
if(errors[0]){
  // 有错误

  next( new ValidationError(errors[0].message)) 

 }


 
return errors[0]

}


exports.projectValidate= function(obj,next){

  const schema = new Schema({
    name:{
        type: String,
        required: true,
      },
      description:{
        type: String,
        required: true,
      },
      url:{
        type: String,
        required: true,
      },
      thumb:{
        type: String,
        
      },
      github:{
        type: String,
        required: true,
      },

     order:{
        type: Number,
        required: true,
      }  

    })
const errors=schema.validate(obj)
if(errors[0]){
  // 有错误

  next( new ValidationError(errors[0].message)) 

 }


 
return errors[0]

}


exports.messageValidate= function(obj,next){

  const schema = new Schema({
    nickname:{
        type: String,
        required: true,
      },
      content:{
        type: String,
        required: true,
      },
      blogId:{
        type: Number,
        required: false,
      },
      avatar:{
        type: String,
        required: true,
      }

    })
const errors=schema.validate(obj)
if(errors[0]){
  // 有错误

  next( new ValidationError(errors[0].message)) 

 }


 
return errors[0]

}