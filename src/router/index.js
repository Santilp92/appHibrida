import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useCategoryStore } from "../store/categoryStore";
import Menu from "../components/Menu.vue";
import RegisterPage from "../views/RegisterPage.vue";
import SignUp from "../views/SignUp.vue";
import LogIn from "../views/LogIn.vue";

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
        children: [
          {
            path: ":category",
            name: "products",
            component: () => import("../views/ProductsPage.vue"),
          },
        ],
      },
      {
        path: "cart",
        component: () => import("../views/CartPage.vue"),
      },
      {
        path: "/registerProduct",
        name: "registerProduct",
        component: RegisterPage,
      },
      {
        path: "account",
        component: () => import("../views/AccountPage.vue"),
        children: [
          {
            path: "logIn",
            name: "login",
            component: LogIn,
          },
          { 
            path: "signUp",
            name: "signup",
            component: SignUp,
          },
        ],
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
