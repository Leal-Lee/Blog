const {addBlogService,getBlogsService,getOneBlogService,deleteBlogService,putBlogService,getDraftBlogsService} = require('../../service/blogService');
var {ValidationError} =require('../../utils/error')
var {blogValidate} =require('../../utils/validate')
// 分页获取Blog
exports.getBlogs=async function(req, res, next) {

  
 const data= await getBlogsService(req.query)
  
    res.send(data) 
  }

// 分页获取草稿箱Blog
exports.getDraftBlogs=async function(req, res, next) {

   
   const data= await getDraftBlogsService(req.query)
    
      res.send(data) 
    }


  //添加Blog
exports.addBlog=async function(req, res, next) {



    try{
        const data= await addBlogService(req.body,next)
       
        res.send(data)
    }catch(err){
       res.send(new ValidationError(err).toResponseJSON())
    }

     
   }

//获取某一个博客
   exports.getOneBlog=async function(req, res, next) {
  
      
    const data= await getOneBlogService(req.params.id,req.headers.authorization)

     res.send(data)
     
   }

//删除
   exports.deleteBlog=async function(req, res, next) {
try{
   const data= await deleteBlogService(req.params.id)
   res.send(data)
}catch(err){
   throw new ValidationError(err)
}

     
   }

   //修改
   exports.putBlog=async function(req, res, next) {
        // 验证
//   const result= blogValidate(req.body,next)
//   if (!result) return

  try{
   const data= await putBlogService(req.params.id,req.body)

   res.send(data)
  }catch(err){
   next(err)
  }

     
   }