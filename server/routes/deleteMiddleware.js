var express = require('express');
var router = express.Router();
const {formatResqonse}= require('../utils/tool')
const fs=require('fs')
const path  = require('path')


//删除图片
// 必须在请求中传递filename和token，filename值为路径，返回之前图片路径
router.delete('/img',(req,res,next)=>{
    const filename = path.resolve(__dirname,'../public',`./${req.body.filename}`)
    fs.unlink(filename, (err)=>{
        console.log(err)
        if(err){

          if (err) throw err;
        
        }
        res.send(formatResqonse(0,'','删除成功'))
        
    })
});
module.exports = router;