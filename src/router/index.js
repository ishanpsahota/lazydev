import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/home/Home.vue'
import Blogs from '../views/blogs/Blogs.vue'
import Test from '../views/test/TestView.vue'
import Search from '../views/search/SearchView.vue'
import AdminView from '../views/admin/AdminView.vue'
import DashboardView from '../views/admin/dashboard/DashboardView.vue'
import AdminLogin from '../views/admin/login/Login.vue'
import NotFound  from '../views/404/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
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
      {
        path: 'create',        
        component: () => import('../components/admin/blogs/BlogNew.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: AdminView,
    children: [
      {
        path: 'login',
        name: 'AdminHome',
        component: AdminLogin
      },
      {
        path: 'dashboard',
        component: DashboardView,
        children: [
          {
            path: '',
            component: () => import('../components/admin/Dashboard/DashboardHome/DashboardHome.vue')
          },          
        ]
      }
    ]
  },
  {
    path: '/test',
    name: 'TestingComponents',
    component: Test
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
