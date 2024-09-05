import { createRouter, createWebHistory } from '@ionic/vue-router';
import Menu from '../components/Menu.vue';


const routes= [
  {
    path: '/',
    redirect: '/home'
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
        component: () => import('../views/prueba.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
