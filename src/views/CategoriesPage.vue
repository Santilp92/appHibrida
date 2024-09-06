<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <searchbar />
      </ion-toolbar>
    </ion-header>

    <ion-router-outlet />

    <ion-content class="ion-padding centrar-contenido">
      <ion-grid>
        <!-- Fila 1 -->
        <ion-row>
          <ion-col
            v-for="category in categories.slice(0, 2)"
            :key="category.name"
            size="6"
          >
            <ion-card button @click="selectCategory(category)">
              <ion-card-content>
                <ion-avatar>
                  <img :src="category.image" alt="category.name" />
                </ion-avatar>
                <ion-label>{{ category.name }}</ion-label>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- Fila 2 -->
        <ion-row>
          <ion-col
            v-for="category in categories.slice(2, 4)"
            :key="category.name"
            size="6"
          >
            <ion-card button @click="selectCategory(category)">
              <ion-card-content>
                <ion-avatar>
                  <img :src="category.image" alt="category.name" />
                </ion-avatar>
                <ion-label>{{ category.name }}</ion-label>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <!-- Fila 3 -->
        <ion-row>
          <ion-col
            v-for="category in categories.slice(4, 6)"
            :key="category.name"
            size="6"
          >
            <ion-card button @click="selectCategory(category)">
              <ion-card-content>
                <ion-avatar>
                  <img :src="category.image" alt="category.name" />
                </ion-avatar>
                <ion-label>{{ category.name }}</ion-label>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import Searchbar from "../components/Searchbar.vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "../store/categoryStore";
import { ref } from "vue";
import { IonRouterOutlet } from '@ionic/vue';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    Searchbar,
    IonRouterOutlet
  },
  setup() {
    const categoryStore = useCategoryStore();
    const router = useRouter();
    const categories = ref([
      { name: "PCyLaptops", image: "../assets/pc_laptops.png" },
      { name: "Electrodomésticos", image: "../assets/electrodomesticos.png" },
      { name: "Celulares", image: "../assets/celulares.png" },
      { name: "Gaming", image: "../assets/gaming.png" },
      { name: "IoT", image: "../assets/iot.png" },
      { name: "Accesorios", image: "../assets/accesorios.png" },
    ]);

    const selectCategory = (category) => {
      console.log("selectCategory called with:", category.name); // Agrega este log
      categoryStore.setCategory(category.name);
      router.push({ name: "products", params: { category: category.name } });
      console.log(`Categoría seleccionada: ${category.name}`);
    };

    return {
      categories,
      selectCategory,
    };
  },
};
</script>
