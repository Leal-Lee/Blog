import { loginApi, logoutApi, whoamiApi } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {user:null}
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USER:(state,user) => {state.user = user}
}

const actions = {
  // 用户登录
async login({ commit }, userInfo) {
  
     const data =await loginApi( userInfo)
     commit('SET_USER',data)
    return state.user
  },

  // 我是谁
 async whoami({ commit, state }) {
 
     
      const data = await whoamiApi(getToken())
      commit('SET_USER',data)


      return state.user 

   
   
   



    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })

  },



  // 退出登录
  logout({ commit, state }) {

    removeToken() // must remove  token  first
    resetRouter()
    commit('RESET_STATE')

  },

  // remove token
  resetToken({ commit }) {

      removeToken() // must remove  token  first
      commit('RESET_STATE')


  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

