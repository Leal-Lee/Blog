var express = require('express');
var router = express.Router();

const {addBlog,getBlogs,getOneBlog,deleteBlog,putBlog} =require('./api/blog')
/**
 * 设置博客
 */
router.post('/',addBlog);
// 分页获取博客
router.get('/',getBlogs);

// 获取某一类博客 
router.get('/:id',getOneBlog);

// 删除某一类博客
router.delete('/:id',deleteBlog);

// 修改某一类博客
router.put('/:id',putBlog);

module.exports = router;
