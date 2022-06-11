import request from '@/utils/request'
import {getToken} from '@/utils/auth'
//  删除图片
export  function deleteImg(filename) {
     
    return  request({
      url: '/api/delete/img',
      method: 'delete',
      headers: { 
      'Authorization':getToken() ,
      'Content-Type':'application/json',},
      data:{filename}
    })
  
  
  }