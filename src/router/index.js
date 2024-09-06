import { createRouter, createWebHistory } from "@ionic/vue-router";
import Menu from "../components/Menu.vue";


const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    component: Menu,
    children: [
      {
        path: "home",
        component: () => import("../views/HomePage.vue"),
      },
      {
        path: "categories",
        component: () => import("../views/CategoriesPage.vue"),
        children:[
          {
            path: ":category",
            name: "products",
            component: () => import ("../views/ProductsPage.vue"),
          },
        ]
      },
      {
        path: "cart",
        component: () => import("../views/CartPage.vue"),
      },
      {
        path: "account",
        component: () => import("../views/AccountPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
