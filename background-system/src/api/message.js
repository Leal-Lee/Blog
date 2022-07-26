import request from '@/utils/request'
import {getToken} from '@/utils/auth'



// 删除message
export  function deleteMessage(id) {
     
  return  request({
    url: `/api/message/${id}`,
    method: 'delete',
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}


//  获取message
export  function getMessages(params) {
    
    return  request({
      url: '/api/message',
      method: 'get',
      params
    })
  
  
  }




  