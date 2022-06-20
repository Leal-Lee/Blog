var express = require('express');
var router = express.Router();

const {addMessage,getMessages,deleteMessage} =require('./api/message')
/**
 * 设置Message
 */
router.post('/',addMessage);
// 获取Message
router.get('/',getMessages);

// 删除某一Message
router.delete('/:id',deleteMessage);



module.exports = router;
