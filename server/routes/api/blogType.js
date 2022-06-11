const {addBlogTypeService,getBlogTypesService,getOneBlogTypeService,deleteBlogType,putBlogType} = require('../../service/blogTypeService');
var {ValidationError} =require('../../utils/error')

// 获取BlogType
exports.getBlogTypes=async function(req, res, next) {
   
  
 const data= await getBlogTypesService()
  
    res.send(data) 
  }

  //添加BlogType
exports.addBlogType=async function(req, res, next) {


    try{
        const data= await addBlogTypeService(req.body,next)
        res.send(data)
    }catch(err){
      next(err)
    }

     
   }

//设置某要一个博客分类
   exports.getOneBlogType=async function(req, res, next) {
        // 验证

    const data= await getOneBlogTypeService(req.params.id)

     res.send(data)
     
   }

//删除分类
   exports.deleteBlogType=async function(req, res, next) {

    const data= await deleteBlogType(req.params.id)

     res.send(data)
     
   }

   //修改分类
   exports.putBlogType=async function(req, res, next) {

// 验证通过
try{
   const data= await putBlogType(req.params.id,req.body,next)

   res.send(data)
}catch(err){
   next(err)
}

     
   }