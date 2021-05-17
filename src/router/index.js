import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/home/Home.vue'
import Blogs from '../views/blogs/Blogs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs',    
    component: Blogs,
    children: [
      {
        path: '',
        name: 'all',
        component: () => import('../components/blogs-component/blogs-all/BlogsAll.vue')
      },
      {
        path: 'v/:title',
        // name: 'ViewBlog',
        component: () => import('../components/blogs-component/blog-view/BlogView.vue')
      },
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
