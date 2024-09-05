<template>
  <!-- Contenido principal -->
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <log-in />
        <searchbar />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <img src="../assets/logo.png" alt="Logo" />
        <ion-card-header>
          <ion-card-title>Bienvenidos a la tienda online</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Esta es la pagina de venta de productos online más grande de colombia,
          con los mayoes descuentos.
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-list-header>
          <ion-label>PRODUCTOS DESTACADOS</ion-label>
        </ion-list-header>

        <RecycleScroller
          class="scroller no-scrollbar"
          :items="list"
          :item-size="160"
          direction="horizontal"
        >
          <template #default="{ item }">
            <ion-card class="item-card">
              <ion-img
                class="card-img"
                :src="`https://picsum.photos/seed/picsum/100/150?random=${item}`"
                alt="Producto"
              />
              <ion-card-header>
                <ion-card-title class="title">Título {{ item }}</ion-card-title>
                <ion-card-subtitle class="subtitle"
                  >Subtítulo {{ item }}</ion-card-subtitle
                >
              </ion-card-header>
              <ion-card-content class="description">
                Descripción larga de producto {{ item }}. Esta descripción es un
                ejemplo para mostrar cómo se verá cuando sea más larga de lo
                esperado.
              </ion-card-content>
            </ion-card>
          </template>
        </RecycleScroller>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import LogIn from "../components/LogIn.vue";
import Searchbar from "../components/Searchbar.vue";
import { RecycleScroller } from "vue-virtual-scroller";

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonListHeader
} from "@ionic/vue";

import { personCircle, list } from "ionicons/icons";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    Searchbar,
    LogIn,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    RecycleScroller,
    IonList,
    IonListHeader
  },
  data() {
    const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return {
      personCircle,
      list,
    };
  },
  mounted() {
    console.log("Component mounted!"); // Mensaje en la consola al montar el componente
    console.log(this.list); // Verifica que la lista esté correctamente inicializada
  },
};
</script>

<style scoped>
.scroller {
  display: flex;
  flex-direction: row; /* Asegura que los elementos se alineen horizontalmente */
  overflow-x: auto; /* Habilita el desplazamiento horizontal */
  overflow-y: hidden; /* Deshabilita el desplazamiento vertical */
  height: 250px; /* Establece la altura para hacer las cards más grandes */
  margin-right: 10px;
}

.no-scrollbar {
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none; /* Para Internet Explorer y Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari y Opera */
}

.item-card {
  width: 150px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}

.card-img {
  height: 120px; /* Tamaño de la imagen */
  object-fit: cover;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.subtitle {
  font-size: 14px;
  color: gray;
}

.description {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Muestra puntos suspensivos cuando el texto es muy largo */
}
</style>
