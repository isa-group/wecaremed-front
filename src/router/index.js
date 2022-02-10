import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDetailsSimple from '../views/ProjectDetailsSimple.vue'
import Login from '../views/Login.vue'
import ProjectDetailsAdvanced from '../views/ProjectDetailsAdvanced.vue';
import axios from 'axios'
import store from '../store'

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
      if (to.query.advancedMode === "true") {
        console.log("Ha entrado desde el modo simple y lo manda al avanzado ahora");
        console.log("To completo: ", to);
        let projectId = to.params.id;
        next({
          path: '/projects/' + projectId + '/advanced',
          query: { advancedMode: to.query.advancedMode },
          params: {id: to.params.id},
        })
      } else {
        console.log("Ha entrado en el modo simple y va a redirigir al project details simple")
        console.log("To complete: ", to);
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
      console.log("To complete: ", to);
      console.log("To: ", to.query)
      console.log("From: ", from.query)
      if (to.query.advancedMode === "true") {
        console.log("Ha entrado desde el modo avanzado")
        next()
      } else {
        console.log("Ha entrado desde el modo avanzado y va hacia el modo simple")
        next({
          path: "/projects/:id",
          query: { advancedMode: to.query.advancedMode },
          params: {id: to.params.id},
        })
      }
    }
  },
  // {
  //   path: '/projects/:id/projectDetailsAdvanced',
  //   name: 'Project Details Advanced',
  //   meta: { requiresAuth: true },
  //   component: ProjectDetailsAdvanced,
  // },
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
