import request from '@/utils/request'
import {getToken} from '@/utils/auth'



// 删除comment
export  function deleteComment(id) {
     
  return  request({
    url: `/api/comment/${id}`,
    method: 'delete',
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}


//  获取comment
export  function getComments(params) {
    
    return  request({
      url: '/api/comment',
      method: 'get',
      params
    })
  
  
  }




  