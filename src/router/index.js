import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProjectDetailsSimple from '../views/ProjectDetailsSimple.vue'
import Login from '../views/Login.vue'
// import ProjectDetailsAdvanced from '../views/ProjectDetailsAdvanced.vue';
import axios from 'axios'

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
  //   beforeEnter: (to, from, next) => {
  //     if (to.query.advancedMode === "true") {
  //       next({
  //         path: "/projects/:id/advanced",
  //         query: { advancedMode: to.query.advancedMode },
  //         params: {id: to.params.id},
  //       })
  //     } else {
  //       next()
  //     }
  //   }
  // },
  // {
  //   path: '/projects/:id/advanced',
  //   name: 'Project Details Advanced',
  //   meta: { requiresAuth: true },
  //   component: ProjectDetailsAdvanced,
  //   beforeEnter: (to, from, next) => {
  //     console.log("To: ", to)
  //     console.log("From: ", from)
  //     if (to.query.advancedMode === "true") {
  //       next()
  //     } else {
  //       next({
  //         path: "/projects/:id",
  //         query: { advancedMode: to.query.advancedMode },
  //         params: {id: to.params.id},
  //       })
  //     }
  //   }
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
    axios.get('/projects')
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
    .catch(err => {
      if (err.response.status === 401) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    });
  } else {
    next()
  }
})

export default router
