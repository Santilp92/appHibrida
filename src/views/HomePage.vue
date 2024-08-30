<style scoped>
.example-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>

<template>
  <!-- Contenido principal -->
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        Logo de Tienda Online
        <ion-buttons slot="primary">
          <ion-button fill="solid">
            Ingresar
            <ion-icon slot="end" :icon="personCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar placeholder="Buscar en Tienda Online"></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <!-- Puede servir para realizar un listado general de producto -->
    <!-- <ion-content>
      <ion-list>
        <RecycleScroller class="scroller no-scrollbar" :items="list" :item-size="56">
          <template #default="{ item }">
            <ion-item>
              <ion-avatar slot="start">
                <img src="https://picsum.photos/seed/picsum/40/40" />
              </ion-avatar>
              <ion-label>{{ item }}</ion-label>
            </ion-item>
          </template>
        </RecycleScroller>
      </ion-list>
    </ion-content> -->

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-title> Bienvenido a la tienda online </ion-title>
            <p>
              Esta es la pagina de venta de productos online más grande de
              colombia, con los mayoes descuentos.
            </p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
<script>
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
  },
  data() {
    const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return {
      personCircle,
      list,
    };
  },
};
</script>
