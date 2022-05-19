var express = require('express');
var router = express.Router();

const {setBanner,getBanner} =require('./api/banner')
/**
 * 设置标语
 */
router.post('/',setBanner);

// 获取标语
router.get('/',getBanner);


/**
 * 恢复登录
 */ 

module.exports = router;
