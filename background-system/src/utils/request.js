import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { setToken,getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  timeout: 5000 
})







// request interceptor
service.interceptors.request.use(

  req=> {
    console.log('请求拦截')
  
    // if(req.headers.authentication){
    //   // 获取token
    //   console.log(response.data.data,'获取token')
    //   getToken(response.headers.authentication)
    // }
    return req

  }
)

// // response interceptor
service.interceptors.response.use(

  response => {
      //  登录的时候会附带authentication响应头
      console.log('响应拦截')
    if(response.headers.authentication){
      // 设置token
      console.log(response.data.data,'设置token')
      setToken(response.headers.authentication)
    }
    console.log('拦截',response.data)
  return response.data.data

    // // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
