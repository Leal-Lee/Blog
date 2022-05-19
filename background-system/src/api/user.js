import request from '@/utils/request'

// 登录
export  function loginApi(loginInfo) {
     
  return  request({
    url: '/api/admin/login',
    method: 'post',
    data:loginInfo,
    headers:{'Content-Type':'application/json'}
  })


}



// 恢复登录验证
export function whoamiApi(token) {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
    headers: { 'authorization':token }
  })
}
// 退出
export function logoutApi() {
  return request({
    url: '/api/admin/logout',
    method: 'post'
  })
}
