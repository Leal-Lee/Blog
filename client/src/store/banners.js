import getBanners from '@/api/banner'
export default {
    namespaced: true,
    state:()=>( {
      isLoading:false,
      data:[]
     }),
      mutations: {
        setBanner(state, payload) {
            state.data = payload
        },
        setLoading(state, payload){
        state.isLoading = payload
        }
      },
      
      actions: {
       async getBanner(cxt){
        if(cxt.state.data.length){
          return
        }
        cxt.commit('setLoading',true)
    
        const resp = await getBanners()
        cxt.commit('setLoading',false)
        cxt.commit('setBanner',resp)
        }
      }
}