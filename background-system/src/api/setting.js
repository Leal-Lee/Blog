import request from '@/utils/request'
import {getToken} from '@/utils/auth'

// 设置setting
export  function setSetting(data) {

  return  request({
    url: `/api/setting`,
    method: 'put',
    data,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}



//  获取setting
export  function getSetting() {
     
    return  request({
      url: '/api/setting',
      method: 'get',
    })
  
  
  }




  