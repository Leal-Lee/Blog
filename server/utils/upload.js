// 配置multer
const multer = require('multer')
const fs=require('fs')
const path  = require('path')
// 文件夹不存在新建文件夹
const filename=path.resolve(__dirname,'../public/static','./upload')
fs.stat(filename, (err,stats)=>{
  if(!stats){
    fs.mkdir(filename,{recursive: true},err=>{
      if (err) throw err;
    })
  }
})

// 存储引擎
const storage = multer.diskStorage({

  //配置储存的位置
  destination: function (req, file, cb) {
    
    cb(null, filename)
  },
  // 配置储存的文件名
  filename: function (req, file, cb) {

    const timestamp =Date.now()
    const  randomStr = Math.random().toString(32).slice(-6)
    const  ext=path.extname(file.originalname)
    const filename=timestamp+randomStr+ext

    cb(null, filename)
  }
})


const upload = multer({ 
  storage,
  limits:{
    fileSize:1024*1024*2
  }
 }).single('banner')


module.exports= upload