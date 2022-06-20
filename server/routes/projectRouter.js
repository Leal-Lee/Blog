var express = require('express');
var router = express.Router();

const {addProject,getProjects,deleteProject,putProject} =require('./api/project')
/**
 * 设置Project
 */
router.post('/',addProject);
// 获取Project
router.get('/',getProjects);



// 删除某一Project
router.delete('/:id',deleteProject);

// 修改某一Project
router.put('/:id',putProject);

module.exports = router;
