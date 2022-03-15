import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import axios from 'axios'
import store from '../store'
import ProjectDetailsSimple from '../views/ProjectDetailsSimple.vue'
import ProjectDetailsAdvanced from '../views/ProjectDetailsAdvanced.vue';

const routes = [
  {
    path: '/', 
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/createProject',
    name: 'Create Project',
    meta: { requiresAuth: true },
    component: () => import('../views/CreateProject.vue')
  },
  {
    path: '/editProject/:id',
    name: 'Edit Project',
    meta: { requiresAuth: true },
    component: () => import('../views/CreateProject.vue')
  },
  {
    path: '/projects/:id',
    name: 'Project Details Simple',
    meta: { requiresAuth: true },
    component: ProjectDetailsSimple,
    beforeEnter: (to, from, next) => {
      if (store.state.toggleValue === true) {
        next("/projects/"+to.params.id+"/advanced")
      } else {
        next()
      }
    }
  },
  {
    path: '/projects/:id/advanced',
    name: 'Project Details Advanced',
    meta: { requiresAuth: true },
    component: ProjectDetailsAdvanced,
    beforeEnter: (to, from, next) => {
      if (store.state.toggleValue === true) {
        next()
      } else {
        next("/projects/"+to.params.id)
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.post('/auth/login', {email: store.state.username, password: store.state.password})
    .then((req) => {
      if (req.config.headers.Authorization){
        next()
      }else{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    })
    .catch(() => {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
    });
  } else {
    next()
  }
})

export default router
