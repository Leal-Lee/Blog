import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar进度条
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar 启动进度条
 
  NProgress.start()

  // set page title 设置网页标题
  document.title = getPageTitle(to.meta.title)
     // 查看是否有用户信息
     const hasGetUserInfo =store.getters.user
  if(to.meta.isNotAuth){
    // 不需要鉴权的直接通过
    // console.log('不需要鉴权',hasGetUserInfo)
    if(to.path=='/login'&& hasGetUserInfo){
    //  进入表上已经登录，要去登录页面，直接跳转到首页
    // console.log('已登录，直接跳转')
    next()
    setTimeout(()=>{
      next('/')

    },800)

    }else{
      next()
    }
    NProgress.done()
  }else{
    // 需要鉴权

    // console.log('需要鉴权')
    if(hasGetUserInfo){
      //有用户信息，登录成功，直接通过
      // console.log('有用户信息',hasGetUserInfo)
      // next(to.path)
      next()
    }
    else{
    // 查看token

    const hasToken = getToken()
    // console.log('没有用户信息,查看有没有token',hasToken)
    if(hasToken){
      // 有token
      // 验证token
       const data= await store.dispatch('user/whoami')
      // console.log(33333,data)
      if(data){
        // 验证通过
        // console.log('token验证通过')
        next()
      }else{
        // 验证失败
     
        Message.error({message:'登录已过期，重新登录'})  
       await store.dispatch('user/resetToken')
        next(`/login?redirect=${to.path}`)
      }
      

    }else{
        // 没有token,返回到登录页
        next(`/login?redirect=${to.path}`)
        // NProgress.done()
    }
    }

  }



  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }


})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
