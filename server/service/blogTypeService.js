const {addBlogTypeDao,getBlogTypesDao,getOneBlogTypeDao,deleteBlogTypeDao,putBlogTypeDao} = require('../dao/blogTypeDao')
const {formatResqonse}= require('../utils/tool')
const {ValidationError} =require('../utils/error')
var {blogTypeValidate} =require('../utils/validate')
// 获取博客分类
exports.getBlogTypesService=async function(){
 
  const  data= await  getBlogTypesDao()
  
    return formatResqonse(0,'',data)
}

// 添加博客分类
exports.addBlogTypeService=async function(blogTypeInfo,next){

   // 验证
   const results= blogTypeValidate(blogTypeInfo,next)
   
   if (results) return
 

  // 设置前先查看分类名是否存在
  const  result= await  getOneBlogTypeDao(0,blogTypeInfo.name)  
    
  if( result )throw new ValidationError('分类已存在')
  
     blogTypeInfo.articleCount=0 
    const  data= await addBlogTypeDao(blogTypeInfo)

    return formatResqonse(0,'',data)
}

// 获取某一类博客分类
exports.getOneBlogTypeService=async function(id){



  let  data= await getOneBlogTypeDao(id)

    return formatResqonse(0,'',data)
}



//删除分类
exports.deleteBlogType =async function(id){

  const  data= await  deleteBlogTypeDao(id)
  
    return formatResqonse(0,'',data)
}


//修改分类
exports.putBlogType =async function(id,updateInfo,next){

          // 验证
          const results= blogTypeValidate(updateInfo,next)
          if (results) return
  // 设置前先查看分类名是否存在
  const  result = await getOneBlogTypeDao(0,updateInfo.name)
  
  if(result && result.order== updateInfo.order) throw new ValidationError('order与之前相同');
  await putBlogTypeDao(id,updateInfo)
  const data =await getOneBlogTypeDao(id)

    return formatResqonse(0,'',data)
}