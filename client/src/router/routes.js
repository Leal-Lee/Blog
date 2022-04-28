
 import {start,done,configure} from 'nprogress'
 import  'nprogress/nprogress.css'
 import NotFound from '@/components/NotFound.vue'

 configure({
    minimum: 0.1 ,
    trickleSpeed:20,
    showSpinner:false
});
function getComponent(asyncComponent){
return async ()=>{
  start()
  const comp =await asyncComponent()
  done()
  return comp
}
   
}

const routes = [{
    name: 'Home',
    path: '/',
    component: getComponent(() => import('../views/Home')),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'About',
    path: '/about',
    component: getComponent(() => import('../views/About')),
    meta: {
      title: '关于我'
    }
  },
  {
    name: 'Blog',
    path: '/blog',
    component: getComponent(() => import('../views/Blog')),
    meta: {
      title: '博客'
    }
  },
  {
    name: 'BlogDetails',
    path: '/blog/:blogId',
    component:getComponent(() => import('../views/Blog/BlogDetails'))
  },
  {
    name: 'CategorBlog',
    path: '/blog/cate/:categoryid',
    component: getComponent(() => import('../views/Blog'))
  },
  {
    name: 'Message',
    path: '/message',
    component: getComponent(() => import('../views/Message')),
    meta: {
      title: '留言'
    }
  },
  {
    name: 'Project',
    path: '/project',
    component: getComponent(() => import('../views/Project')),
    meta: {
      title: '项目'
    }
  },
  {
  name: 'NotFound',
  path: '*',
  component: NotFound,

},

]

export default routes