var express = require('express');
var router = express.Router();

const {setAbout,getAbout} =require('./api/about')
/**
 * 设置全局设置
 */
router.put('/',setAbout);

// 获取全局设置
router.get('/',getAbout);




module.exports = router;
