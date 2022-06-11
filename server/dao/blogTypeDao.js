const BlogType = require('./model/BlogTypeModel.js')

const {
    Op
} = require("sequelize");


// 设置博客分类
exports.addBlogTypeDao = async function (blogTypeInfo) {

 const  data=  await BlogType.create(blogTypeInfo)
  
 return data.toJSON()
}

// 获取所有博客分类

exports.getBlogTypesDao = async function () {
    
    try{
        
        const result = await BlogType.findAll({ 
            raw: true ,
            attributes: { exclude: ['deletedAt'] },
            order:[['order', 'DESC']]
        })
        
        return result 
    }catch(err){
        
        throw new Error(err)
    }


}
// 获取某一个博客分类

exports.getOneBlogTypeDao =async function (id=0,name='') {
    
    const result = await BlogType.findOne({
        raw: true ,
        where:{
            [Op.or]:[
                {id},
                {name}]
        },
        attributes: { exclude: ['deletedAt'] }

    })

    return result 
 }

 //删除博客分类
 exports.deleteBlogTypeDao =async function (id) {
    
    const result = await BlogType.destroy({
        raw: true ,
        where:{
            id,
        },
        

    })

    return result 
 }
  //修改博客分类
  exports.putBlogTypeDao =async function (id,updateInfo) {
    
    const result = await BlogType.update(updateInfo,{
        raw: true ,
        where:{
            id,
        },
        
   

    })

    return result 
 }