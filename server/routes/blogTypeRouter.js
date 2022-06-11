var express = require('express');
var router = express.Router();

const {addBlogType,getBlogTypes,getOneBlogType,deleteBlogType,putBlogType} =require('./api/blogType')
/**
 * 设置博客分类
 */
router.post('/',addBlogType);
// 获取所有博客分类
router.get('/',getBlogTypes);

// 获取某一类博客分类
router.get('/:id',getOneBlogType);

// 删除某一类博客分类
router.delete('/:id',deleteBlogType);

// 修改某一类博客分类
router.put('/:id',putBlogType);

module.exports = router;
