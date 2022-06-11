const {addBlogDao,getBlogsDao,getOneBlogDao,deleteBlogDao,putBlogDao} = require('../dao/blogDao')
const {putBlogTypeDao,getOneBlogTypeDao}=require('../dao/blogTypeDao')
const {formatResqonse}= require('../utils/tool')
const {blogValidate} =require('../utils/validate')
const {ValidationError} =require('../utils/error')

// 分页获取博客
exports.getBlogsService=async function(query){
  
  const  data= await  getBlogsDao(query)
  
    return formatResqonse(0,'',data)
}

// 添加博客
exports.addBlogService=async function(blogInfo,next){
// 处理TOC
 
blogInfo.scanNumber=0
blogInfo.commentNumber=0
blogInfo.toc='[]'
 // 修改分类中的文章数量
 let result =await  getOneBlogTypeDao(blogInfo.categoryId)
 
 if(!result){
 // 如果没有找到对应分类，则归纳到未分类 中
 result =await getOneBlogTypeDao(0,'未分类')
 blogInfo.categoryId = 1
 }

 result.articleCount++


 await putBlogTypeDao(result.id,result)
// 验证
 const results= blogValidate(blogInfo,next)
 if (results) return

// 验证通过， 添加
  const  data= await addBlogDao(blogInfo)

  return formatResqonse(0,'',data)

}

// 获取某一篇博客
exports.getOneBlogService=async function(id,authorization){

try{

  const   data= await  getOneBlogDao(id)
  if(!authorization){
    // 如果不存在，则表明是前台在获取数据，浏览数增加
    data.scanNumber++
    await putBlogDao(id,{scanNumber:data.scanNumber++})
  }
   data.toc=JSON.parse(data.toc)
   return formatResqonse(0,'',data)
}catch(err){
console.log(err)
}

}



//删除
exports.deleteBlog =async function(id){
  try{
    const oldAtc= await getOneBlogDao(id) //删除前的文章
    if(!oldAtc){
      return formatResqonse(0,'','文章不存在')
    }
    const oldType =await getOneBlogTypeDao(oldAtc.category.id)//删除前的分类
    oldType.articleCount--
   //修改分类，文章数量减少
    await putBlogTypeDao(oldType.id,oldType)
   //修改评论，评论数量减少
    const  data = await  deleteBlogDao(id)
  
      if(data !==0)return formatResqonse(0,'',true)
  }catch(err){
    console.log(err)
  }

    
}

//修改
exports.putBlog =async function(id,updateInfo){

 const oldAtc= await getOneBlogDao(id)  //修改前的文章
 const result = await putBlogDao(id,updateInfo)
 console.log(result)
  // 修改成功，如果修改了，分类，则新分类文章加一，老文章分类减一
  if(result[0]!=0 ){

      const oldType =await getOneBlogTypeDao(oldAtc.category.id) //修改前的分类
      const newType= await getOneBlogTypeDao(updateInfo.categoryId)  //修改后的分类
  
      oldType.articleCount--
      newType.articleCount++

  
     await putBlogTypeDao(oldAtc.category.id,oldType)
     await putBlogTypeDao(updateInfo.categoryId,newType)



}   
  const data =await getOneBlogDao(id)
    return formatResqonse(0,'',data)
}