import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/createProject',
    name: 'Create Project',
    component: () => import('../views/CreateProject.vue')
  },
  {
    path: '/projectDetailsSimple',
    name: 'Project Details Simple',
    component: () => import('../views/ProjectDetailsSimple.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
