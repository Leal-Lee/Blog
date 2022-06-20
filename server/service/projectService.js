const {addProjectDao,getProjectsDao,getOneProjectDao,deleteProjectDao,putProjectDao} = require('../dao/projectDao')

const {formatResqonse}= require('../utils/tool')
const {projectValidate} =require('../utils/validate')
const {ValidationError} =require('../utils/error')
const {handleToc}= require('../utils/handleToc')



// 获取Project
exports.getProjectsService=async function(){
  
  const  data= await  getProjectsDao()
  
    return formatResqonse(0,'',data)
}

// 添加Project
exports.addProjectService=async function(projectInfo,next){
// 处理描述
projectInfo.description=JSON.stringify(projectInfo.description)
// 验证
 const results= projectValidate(projectInfo,next)
 if (results) return

// 验证通过， 添加
  const  data= await addProjectDao(projectInfo)
 

  return formatResqonse(0,'',data)

}





//删除
exports.deleteProject =async function(id){

  try{
    const  data = await  deleteProjectDao(id)
      if(data !==0)return formatResqonse(0,'',true)
  }catch(err){
    console.log(err)
  }

    
}

//修改
exports.putProject =async function(id,updateInfo){


 await putProjectDao(id,updateInfo)

  const data =await getOneProjectDao(id)
  
    return formatResqonse(0,'',data)
}