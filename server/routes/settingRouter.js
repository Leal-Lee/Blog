var express = require('express');
var router = express.Router();

const {setSetting,getSetting} =require('./api/setting')
/**
 * 设置全局设置
 */
router.post('/',setSetting);

// 获取全局设置
router.get('/',getSetting);




module.exports = router;
