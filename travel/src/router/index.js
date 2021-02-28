import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: () => import('../views/admin/AdminLogin.vue')
  },
  {
    path: '/admin/user',
    name: 'AdminUser',
    component: () => import('../views/admin/AdminUser.vue')
  },
  {
    path: '/admin/blog/:user_id',
    name: 'AdminBlog',
    component: () => import('../views/admin/AdminBlog.vue')
  },
  {
    path: '/admin/comments/:blog_id',
    name: 'AdminComments',
    component: () => import('../views/admin/AdminComments.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/address/:address_id',
    name: 'Address',
    component: () => import('../views/Address.vue')
  },
  {
    path: '/blog/:user_id',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/home/:user_id',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/Publish.vue')
  },
  {
    path: '/followblog',
    name: 'Followblog',
    component: () => import('../views/FollowBlog.vue')
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('../views/Record.vue')
  },
  {
    path: '/article/:blog_id',
    name: 'Article',
    component: () => import('../views/Article.vue')
  },
  {
    path: '/collect/:user_id',
    name: 'Collect',
    component: () => import('../views/Collect.vue')
  },
  {
    path: '/followuser/:user_id',
    name: 'Followuser',
    component: () => import('../views/FollowUser.vue')
  },
  {
    path: '/rank/:rank_id',
    name: 'Rank',
    component: () => import('../views/Rank.vue')
  },
  {
    path: '/search/:search_content',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/charts/:charts_id',
    name: 'Charts',
    component: () => import('../views/Charts.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router