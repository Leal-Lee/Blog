import request from '@/utils/request'
import {getToken} from '@/utils/auth'

// 设置about
export  function setAbout(data) {

  return  request({
    url: `/api/about`,
    method: 'put',
    data,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}



//  获取about
export  function getAbout() {
     
    return  request({
      url: '/api/about',
      method: 'get',
    })
  
  
  }




  