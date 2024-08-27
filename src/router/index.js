import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import IntroPage from '../views/IntroPage.vue';
import LoginPage from '../views/LoginPage.vue';

const routes= [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/intro',
    name: 'Intro',
    component: IntroPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },

  {
    path: '/home',
    name: 'Home',
    component: HomePage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
