import { createRouter, createWebHistory } from 'vue-router'
import Demo from '../views/demo'

const routes = [
  {
    path: '/',
    name: 'demo',
    component: Demo
  },
  {
    path: '/hello',
    name: 'Hello',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "hello" */ '../components/HelloWorld')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
