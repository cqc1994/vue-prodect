import { createRouter, createWebHistory } from 'vue-router'
import Demo from '../views/demo'

const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/hello',
    name: 'Hello',
    component: () => import(/* webpackChunkName: "hello" */ '../components/HelloWorld')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
