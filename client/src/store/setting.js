import getSetting from '@/api/setting'
import {setSiteTitle} from '../../../utils/setTtile.js'
export default {
  namespaced: true,
  state:()=>( {
    isLoading:false,
    data:null
   }),
    mutations: {
      setSetting(state, payload) {
          state.data = payload
        
      },
      setLoading(state, payload){
      state.isLoading = payload
      }
    },
    
    actions: {
     async fetchSettings(cxt){
  
      cxt.commit('setLoading',true)
      const resp = await getSetting()
      cxt.commit('setLoading',false)
      cxt.commit('setSetting',resp)
      const link = document.querySelector('link[rel="shortcut icon"]')
     if(!link){
      // <link rel="shortcut icon" type="image/x-icon" href="images/logo.png"></link>
  
     const  link = document.createElement('link')
      
      link.rel="shortcut icon",
      link.type="image/x-icon",
      link.href=resp.favicon,
      document.querySelector('head').appendChild(link)

     }
     const title = document.querySelector('title')
     if(title){
       console.log( title)
        setSiteTitle('我的个人博客')
     }
      }
    }
}