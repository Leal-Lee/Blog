const {addMessageService,getMessagesService,deleteMessage} = require('../../service/messageService');
var {ValidationError} =require('../../utils/error')
var {MessageValidate} =require('../../utils/validate')
// 获取Message
exports.getMessages=async function(req, res, next) {

 
 const data= await getMessagesService(req.query)
   
    res.send(data) 
  }

  //添加Message
exports.addMessage=async function(req, res, next) {

    try{
        const data= await addMessageService(req.body,next)
       
        res.send(data)
    }catch(err){
  
       res.send(new ValidationError(err).toResponseJSON())
    }

     
   }



//删除
   exports.deleteMessage=async function(req, res, next) {
try{
   
   const data= await deleteMessage(req.params.id)
  
   res.send(data)
}catch(err){
   throw new ValidationError(err)
}

     
   }

