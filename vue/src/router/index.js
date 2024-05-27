import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignIn from "../views/auth/SignIn.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'login',
      component: SignIn
    },
  ]
})

export default router
