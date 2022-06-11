import request from '@/utils/request'
import {getToken} from '@/utils/auth'
// 设置banner
export  function setBanner(bannerInfo) {
     
  return  request({
    url: '/api/banner',
    method: 'post',
    data:bannerInfo,
    headers:{
        'Content-Type':'application/json',
        'Authorization':getToken()

}
  })


}

//  获取banner
export  function getBanner() {
     
    return  request({
      url: '/api/banner',
      method: 'get',
    })
  
  
  }