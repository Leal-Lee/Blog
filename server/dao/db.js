const sequelize = require('./dbConnect.js') 

const Admin= require('./model/adminModel.js')
const Banner= require('./model/bannerModel.js')
const Setting= require('./model/settingModel.js')
const About= require('./model/aboutModel.js')
const BlogType= require('./model/blogTypeModel.js')

const md5 = require('md5');



(async function (){

    // 创建表
    try{
      await sequelize.sync({alter: true });
    }catch(err){
      console.log(err)
    }
  
  //  初始化 《未分类》 博客分类
  const BlogTypeCount= await BlogType.count()
  if(!BlogTypeCount){
   await BlogType.create({
     name:'未分类',
     order:1,
     articleCount:0
   })}
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
//    初始化全局设置
const settingCount= await Setting.count()
if(!settingCount){
   
    await  Setting.create(
        {
          avatar: "http://www.duyiedu.com/source/img/logo.png", // 博主照片
          siteTitle: "leal的空间", // 网站标题
          github: "https://github.com/DuYi-Edu", // 博主github主页
          qq: "27304938", // 博主 qq
          qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png", // 博主qq二维码
          weixin: "yh777bao", // 博主微信号
          weixinQrCode: "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png", // 博主微信二维码
          mail: "3263023350@qq.com", // 博主邮箱
          icp: "黑ICP备17001719号", // 网站备案号
          githubName: "DuYi-Edu", // 博主github名称
          favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f", // 网站图标
        }
   )
}
const aboutCount= await About.count()
if(!aboutCount){
   
    await  About.create(
        {

          url: "https://yapi.duyiedu.com/project/76/interface/api/180", // 网站图标
        }
   )
}


})()

