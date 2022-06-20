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

        resp.forEach((item) => {
          item.midImg = process.env.VUE_APP_SERVERPATH + item.midImg;
          item.bigImg = process.env.VUE_APP_SERVERPATH + item.bigImg;
        });
        cxt.commit('setLoading',false)
        cxt.commit('setBanner',resp)
        }
      }
}