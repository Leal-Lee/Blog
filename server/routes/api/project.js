const {addProjectService,getProjectsService,getOneProjectService,deleteProject,putProject} = require('../../service/projectService');
var {ValidationError} =require('../../utils/error')
var {ProjectValidate} =require('../../utils/validate')
// 获取Project
exports.getProjects=async function(req, res, next) {

  
 const data= await getProjectsService()
  
    res.send(data) 
  }

  //添加Project
exports.addProject=async function(req, res, next) {
   
    try{
        const data= await addProjectService(req.body,next)
       
        res.send(data)
    }catch(err){
       res.send(new ValidationError(err).toResponseJSON())
    }

     
   }



//删除
   exports.deleteProject=async function(req, res, next) {
try{
   const data= await deleteProject(req.params.id)
   res.send(data)
}catch(err){
   throw new ValidationError(err)
}

     
   }

   //修改
   exports.putProject=async function(req, res, next) {

  try{
   const data= await putProject(req.params.id,req.body)

   res.send(data)
  }catch(err){
   next(err)
  }

     
   }