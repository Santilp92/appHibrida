<template>
  <ion-page>
    <ion-content class="products-container">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Productos de {{ category }}</ion-card-title>
        </ion-card-header>
      </ion-card>

      <!-- Aquí agregarás la lógica para mostrar los productos filtrados -->
    </ion-content>
  </ion-page>
</template>

<script>
import Searchbar from "../components/Searchbar.vue";
import { useCategoryStore } from "../store/categoryStore";
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
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { computed } from 'vue';

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
    IonCardHeader,
    IonCardTitle,
  },
  setup() {
    const categoryStore = useCategoryStore();
    const category = computed(() => categoryStore.selectedCategory);
    console.log('Category from store in Product:', category.value);
    
    return {
      category,
    };
  },
};
</script>

<style scoped>
.products-container {
  padding: 10px;
}
</style>
