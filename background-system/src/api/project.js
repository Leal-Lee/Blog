import request from '@/utils/request'
import {getToken} from '@/utils/auth'
// 添加Project
export  function addProject(data) {
     
  return  request({
    url: '/api/project',
    method: 'post',
    data,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}
// 修改Project
export  function putProject(data) {

  return  request({
    url: `/api/project/${data.id}`,
    method: 'put',
    data,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}

// 删除Project
export  function deleteProject(id) {
     
  return  request({
    url: `/api/project/${id}`,
    method: 'delete',
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}


//  获取Project
export  function getProjects() {
     
    return  request({
      url: '/api/project',
      method: 'get',
    })
  
  
  }




  