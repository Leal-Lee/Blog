const Message = require('./model/messageModel.js')
const Blog = require('./model/blogModel.js')

const {
    Op
} = require("sequelize");


// 添加Message
exports.addMessageDao = async function (MessageInfo) {

 const  data =  await Message.create(MessageInfo)
 return data.toJSON()
}

// 获某一个Message
exports.getOneMessageDao = async function (id=0,nickname='') {
    return   await  Message.findOne({
        where:{
            [Op.or]:[
                {id},
                {nickname}]
        },
       raw: true ,
       include: [
        {
             model: Blog,
             as:'blog',
             attributes: ['id',"title"] 

       }]
    })
   }
 //删除Message
 exports.deleteMessageDao =async function (id) {
 
    const result = await Message.destroy({
        raw: true ,
        where:{
            id,
        },
    })
    
    return result 
 }
 


// 分页获取
 exports.getMessagesDao = async function ({page=1,limit=10,keyword='',blogId=null}) {
  
    try{
        // 如果带了blogId参数，则查询的是文章评论，按照文章id查询
        
        if(keyword!=''){
            
            const result = await Message.findAndCountAll({ 
                where:{
                    nickname:keyword
                },
                attributes: { exclude: ['deletedAt','bolgId'] },
                order:[['createDate', 'DESC']],
                offset:(page-1)*+limit, 
                limit:+limit,
                include: [
                    {
                         model: Blog,
                         as:'blog',
                         attributes: ['id',"title"] 
    
                   }]
            })

            return result ? result:null
        }
        // 没带blogId参数，则如果有关键字则按照关键字查询
        const result = await Message.findAndCountAll({ 
            attributes: { exclude: ['deletedAt','bolgId'] },
            order:[['createDate', 'DESC']],
            offset:(page-1)*(+limit), 
            limit:+limit,
            where:{
                   
                    blogId
            },
            include: [
                {
                     model: Blog,
                     as:'blog',
                     attributes: ['id',"title"] ,
                    //  where: {title:{[Op.like]:`%${keyword}%`} },
    
               }]
        })
  
        return result ? result:null


    }catch(err){
        
        throw new Error(err)
    }


}



