import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomePage from '../pages/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../pages/HomePage')
  },
  {
    path: '/todo-list-page',
    name: 'todoListPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/todoListPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
