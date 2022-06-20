const Project = require('./model/projectModel.js')


const {
    Op
} = require("sequelize");


// 添加Project
exports.addProjectDao = async function (ProjectInfo) {

 const  data =  await Project.create(ProjectInfo)
 return data.toJSON()
}

// 获取Project

exports.getProjectsDao = async function () {

 return   await  Project.findAll({
    raw: true ,
    attributes: { exclude: ['deletedAt','createDate'] },
 })

}
// 获某一个Project

exports.getOneProjectDao = async function (id) {
   
    return   await  Project.findOne({
        where:{
            id
        },
       raw: true ,
       attributes: { exclude: ['deletedAt','createDate'] },
    })
   
   }
 //删除Project
 exports.deleteProjectDao =async function (id) {
 
    const result = await Project.destroy({
        raw: true ,
        where:{
            id,
        },
    })
    
    return result 
 }
  //修改Project
  exports.putProjectDao =async function (id,updateInfo) {
      

 const result= await Project.update(updateInfo,{
        where:{
            id,
        },
    })

return result
 }
