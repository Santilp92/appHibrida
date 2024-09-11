<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="home" />
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <!-- Modifica el botón de categorías -->
        <ion-tab-button tab="grid" @click="goToCategories" href="/categories">
          <ion-icon :icon="grid" />
          <ion-label>Categories</ion-label>
        </ion-tab-button>

        <ion-tab-button v-if="isAdmin" tab="registerProduct" href="/registerProduct">
          <ion-icon :icon="addCircle"></ion-icon>
          <ion-label>New Product</ion-label>
        </ion-tab-button>

        <ion-tab-button v-else tab="cart" href="/cart">
          <ion-icon :icon="cart" />
          <ion-label>Shopping Cart</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="person" href="/account">
          <ion-icon :icon="person" />
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { useCategoryStore } from "../store/categoryStore"; // Importa la tienda de categoría
import { useRouter } from "vue-router"; // Importa el router
import {
  IonPage,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from "@ionic/vue";

import { home, person, grid, cart, addCircle} from "ionicons/icons";

export default {
  components: {
    IonPage,
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
  },
  data() {
    return {
      home,
      person,
      grid,
      cart,
      addCircle,
      isAdmin:true
    };
  },

  // mounted() {
  //   // Verifica si el usuario autenticado es admin
  //   const user = auth.currentUser;
  //   if (user && user.email === "admin@hotmail.com") {
  //     this.isAdmin = true;
  //   }
  // },

  setup() {
    const categoryStore = useCategoryStore(); // Accede a la tienda de categoría
    const router = useRouter();

    const goToCategories = () => {
      categoryStore.clearCategory(); // Limpia la categoría seleccionada
      router.push("/categories"); // Redirige a la ruta de categorías
    };

    

    return {
      goToCategories,
    };
  },
};
</script>
