import { createRouter, createWebHistory } from "@ionic/vue-router";
import Menu from "../components/Menu.vue";
import { useCategoryStore } from "../store/categoryStore"; // Ajusta la ruta si es necesario



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

// Guard para limpiar la categoría en la navegación
router.beforeEach((to, from, next) => {
  const categoryStore = useCategoryStore();

  // Si la ruta no es 'products', limpiamos la categoría
  if (to.name !== "products") {
    categoryStore.clearCategory();
  }

  next(); // Continuar con la navegación
});

export default router;
