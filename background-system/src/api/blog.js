import request from '@/utils/request'
import {getToken} from '@/utils/auth'
// 编辑blog
export  function editBlog(blogInfo) {
     
  return  request({
    url: '/api/blog',
    method: 'post',
    data:blogInfo,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}
// 删除blog
export  function deleteBlog(id) {
     
  return  request({
    url: `/api/blog/${id}`,
    method: 'delete',
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}

//  获取blog
export  function getBlog(params) {
     
    return  request({
      url: '/api/blog',
      method: 'get',
      params
    })
  
  }
//  获取草稿箱blog
export  function getDraftBlog(params) {
     
  return  request({
    url: '/api/blog/draft',
    method: 'get',
    params,
    headers:{
      'Content-Type':'application/json',
      'Authorization':getToken()

}
  })

}
//  获取单个blog
export  function getOneBlog(id) {
     
  return  request({
    url:`/api/blog/${id}`,
    method: 'get',
    headers:{
      'Content-Type':'application/json',
      'Authorization':getToken()

}
  })

}


  //  修改blog
export  function putBlog(id,blogInfo) {
     
  return  request({
    url:`/api/blog/${id}`,
    method: 'put',
    data:blogInfo,
    headers:{
      'Content-Type':'application/json',
      'Authorization':getToken()

}
  })

}