const sequelize = require('./dbConnect.js') 
const Admin= require('./model/adminModel.js')
const Banner= require('./model/bannerModel.js')
const md5 = require('md5');



// 对数据库进行初始化

(async function (){
   await sequelize.sync({alter: true });
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
          midImg: "/public/images/1.webp",
          bigImg: "/public/images/2.webp",
          title: "凛冬将至",
          description: "人唯有恐惧的时候方能勇敢",
  
        },
        {
          midImg: "/public/images/1.webp",
          bigImg: "/public/images/2.webp",
          title: "血火同源",
          description: "如果我回头，一切都完了",
        
        },
        {
          midImg: "/public/images/1.webp",
          bigImg: "/public/images/2.webp",
          title: "听我怒吼",
          description: "兰尼斯特有债必偿",
    
        }
      ])
}
})()

