<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <searchbar />
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding centrar-contenido">
      <ion-grid>
        <!-- Fila 1 -->
        <ion-row>
          <ion-col v-for="category in categories.slice(0, 2)" :key="category.name" size="6">
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
          <ion-col v-for="category in categories.slice(2, 4)" :key="category.name" size="6">
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
          <ion-col v-for="category in categories.slice(4, 6)" :key="category.name" size="6">
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
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonAvatar, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/vue';
import Searchbar from '../components/Searchbar.vue';

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
  },
  data() {
    return {
      categories: [
        { name: 'PC y Laptops', image: '../assets/pc_laptops.png' },
        { name: 'Electrodomésticos', image: '../assets/electrodomesticos.png' },
        { name: 'Celulares', image: '../assets/celulares.png' },
        { name: 'Gaming', image: '../assets/gaming.png' },
        { name: 'IoT', image: '../assets/iot.png' },
        { name: 'Accesorios', image: '../assets/accesorios.png' }
      ]
    };
  },
  methods: {
    selectCategory(category) {
      console.log(`Categoría seleccionada: ${category.name}`);
      // Aquí puedes agregar la lógica para obtener el listado de productos
      // según la categoría seleccionada
    }
  }
};
</script>

<style scoped>
/* Clase para centrar el contenido horizontal y verticalmente */
.centrar-contenido {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center;     /* Centra verticalmente */
  height: 100vh;           /* Ocupa toda la altura de la pantalla */
}

/* Estilos para las tarjetas */
ion-card {
  text-align: center;
}

ion-label {
  margin-top: 8px;
  display: block;
}
</style>
