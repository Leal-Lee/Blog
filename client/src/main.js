import Vue from 'vue'
import App from './App.vue'
// import './assets/style/common.less'
import router from './router'
import  showMessage   from '../../utils/showMessage.js'
import  '../../mock'
import vLoading from '@/directives/vLoading.js'
import vLazy from '@/directives/vLazy.js'
import './eventBus.js'
import Vuex from 'vuex';
import stroeOptions from '@/store'

Vue.use(Vuex)
const store = new Vuex.Store(stroeOptions)
store.dispatch('setting/fetchSettings')
Vue.prototype.$showMessage = showMessage
Vue.directive('loading',vLoading)
Vue.directive('lazy',vLazy)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
