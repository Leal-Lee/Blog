import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
import {setRouterTitle} from '../../../utils/setTtile.js'
Vue.use(VueRouter)
 const router = new VueRouter({
    mode: 'history',
    routes,
})

router.afterEach((to) => {
    if(to.meta.title){
        setRouterTitle(to.meta.title)
    }
})
export default router