const Blog = require('./model/BlogModel.js')
const BlogType = require('./model/BlogTypeModel.js')
const {addBlogTypeDao}=require('./blogTypeDao')
const {
    Op
} = require("sequelize");


// 添加博客
exports.addBlogDao = async function (blogInfo) {

 const  data =  await Blog.create(blogInfo)
 return data.toJSON()
}

// 分页获取博客

exports.getBlogsDao = async function ({page=1,limit=10,keyword='',categoryId=-1}) {

    try{
        // 如果带了categoryId参数，则按照文章分类查询
        if(categoryId!=-1&&categoryId){
            const result = await Blog.findAndCountAll({ 
                where:{
                    categoryId,
                },
                attributes: { exclude: ['deletedAt'] },
                order:[['createDate', 'DESC']],
                offset:(page-1)*+limit, 
                limit:+limit,
                include: [
                    {
                         model: BlogType,
                         as:'category',
                         attributes: ['id',"name"] 
    
                   }]
            })

            return result ? result:null
        }
        // 没带categoryId参数，则如果有关键字则按照关键字查询，没有关键字则查询全部
        const result = await Blog.findAndCountAll({ 
            attributes: { exclude: ['deletedAt'] },
            order:[['createDate', 'DESC']],
            offset:(page-1)*(+limit), 
            limit:+limit,
            include: [
                {
                     model: BlogType,
                     as:'category',
                     attributes: ['id',"name"] ,
                     where: {name:{[Op.like]:`%${keyword}%`} },
    
               }]
        })
  
        return result ? result:null
    }catch(err){
        
        throw new Error(err)
    }


}
// 获取某一个博客

exports.getOneBlogDao =async function (id) {
   
    const result = await Blog.findOne({

        where:{
            id
        },
        attributes: { exclude: ['deletedAt','categoryId'] },
        include: [
            {
                 model: BlogType,
                 as:'category',
                 attributes: ['id',"name"] 

           }]
    })

    return result? result.toJSON():result
 }

 //删除博客
 exports.deleteBlogDao =async function (id) {
 
    const result = await Blog.destroy({
        raw: true ,
        where:{
            id,
        },
    })
    
    return result 
 }
  //修改博客
  exports.putBlogDao =async function (id,updateInfo) {
      

 const result= await Blog.update(updateInfo,{
        where:{
            id,
        },
    })

return result
 }
