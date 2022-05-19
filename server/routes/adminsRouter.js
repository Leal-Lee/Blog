var express = require('express');
var router = express.Router();

const {login,whoami,updateAdmin} =require('./api/admin')
/**
 * 登录
 */
router.post('/login',login);

// 修改管理员

router.put('/',updateAdmin);


/**
 * 恢复登录
 */ 
router.get('/whoami',whoami)
module.exports = router;
