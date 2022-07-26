import request from '@/utils/request'
import {getToken} from '@/utils/auth'
// 添加blogType
export  function addBlogType(blogInfo) {
     
  return  request({
    url: '/api/blogType',
    method: 'post',
    data:blogInfo,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}
// 修改blogType
export  function putBlogType(blogInfo) {

  return  request({
    url: `/api/blogType/${blogInfo.id}`,
    method: 'put',
    data:blogInfo,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}

// 删除blogType
export  function deleteBlogType(id) {
     
  return  request({
    url: `/api/blogType/${id}`,
    method: 'delete',
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}


//  获取blogType
export  function getBlogType() {
     
    return  request({
      url: '/api/blogType',
      method: 'get',
    })
  
  
  }




  