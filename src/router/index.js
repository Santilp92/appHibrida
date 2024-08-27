import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import IntroPage from '../views/IntroPage.vue';

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
