const {addMessageDao,getMessagesDao,getOneMessageDao,deleteMessageDao,putMessageDao} = require('../dao/messageDao')
const {putBlogDao,getOneBlogDao} = require('../dao/blogDao')
const {formatResqonse,randomNumber}= require('../utils/tool')
const {messageValidate} =require('../utils/validate')
const {ValidationError} =require('../utils/error')
const fs=require('fs').promises
const path=require('path')


// 获取Message
exports.getMessagesService=async function(query){
 
  let  data= await  getMessagesDao(query)
  
   if(data.count==0){
      data='该用户不存在，或者没有留言'
   }
   
    return formatResqonse(0,'',data)
}



// 添加Message



exports.addMessageService=async function(messageInfo,next){
 
// 随机选一个头像
const filename=path.resolve(__dirname,'../public/static/avatar')

 const   files=await fs.readdir(filename)
 const num=randomNumber(0,files.length)
  messageInfo.avatar=`/static/avatar/${files[num]}`

// 查看昵称是否存在
const  result= await  getOneMessageDao(0,messageInfo.nickname)  

if( result )throw new ValidationError('昵称已存在，请更换')


// 验证

 const results= messageValidate(messageInfo,next)
 if (results) return

if(messageInfo.blogId){
  //有blogId，泽添加的是文章评论， 文章评论数增加
const result =await getOneBlogDao(messageInfo.blogId)
result.commentNumber++
await putBlogDao(messageInfo.blogId,result)
}
// 验证通过， 添加

// messageInfo.blogId为null则表示添加的是留言，不为null怎添加的是文章评论
  const  data= await addMessageDao(messageInfo)
 

  return formatResqonse(0,'',data)

}





//删除
exports.deleteMessage =async function(id){

  try{
    const  msg= await  getOneMessageDao(id,'')  
    
    const  data = await  deleteMessageDao(id)
    // 博客评论数减少
      const result =await getOneBlogDao(msg.blogId)
      result.commentNumber--
      await putBlogDao(msg.blogId,result)
      if(data !==0)return formatResqonse(0,'',true)
  }catch(err){
    console.log(err)
  }

    
}

