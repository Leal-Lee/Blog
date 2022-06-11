const sequelize = require('./dbConnect.js') 

const Admin= require('./model/adminModel.js')
const Banner= require('./model/bannerModel.js')
const BlogType= require('./model/blogTypeModel.js')

const md5 = require('md5');



(async function (){

    // 创建表
   await sequelize.sync({alter: true });
  //  初始化 《未分类》 博客分类
   await BlogType.create({
     name:'未分类',
     order:1,
     articleCount:0
   })
//    初始化管理员
   const adminCount= await Admin.count()
    if(!adminCount){
        
        await Admin.create({
            name:'superAdmin',
            loginId:'admin',
            loginPwd:md5('admin'),
            isSpuerAdmin:true
        })
    }
//    初始化首页标语
const bannerCount= await Banner.count()
if(!bannerCount){
        
    await  Banner.bulkCreate([
        {
          midImg: "/static/images/1.webp",
          bigImg: "/static/images/2.webp",
          title: "凛冬将至",
          description: "人唯有恐惧的时候方能勇敢",

        },
        {
          midImg: "/static/images/1.webp",
          bigImg: "/static/images/2.webp",
          title: "血火同源",
          description: "如果我回头，一切都完了",
        
        },
        {
          midImg: "/static/images/1.webp",
          bigImg: "/static/images/2.webp",
          title: "听我怒吼",
          description: "兰尼斯特有债必偿",
    
        }
      ])
}
})()

