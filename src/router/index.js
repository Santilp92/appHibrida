import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import IntroPage from '../views/IntroPage.vue';
import LoginPage from '../views/LoginPage.vue';
import Menu from '../components/Menu.vue';

const routes= [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/intro',
    name: 'Intro',
    component: IntroPage
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/',
    component: Menu,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: 'home',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'categories',
        component: () => import('../views/CategoriesPage.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/CartPage.vue'),
      },
      {
        path: 'account',
        component: () => import('../views/LoginPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
