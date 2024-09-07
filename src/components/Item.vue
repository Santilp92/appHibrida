<template>
  <ion-card class="item-card">
    <ion-card-content>
      <ion-grid>
        <ion-row>
          <!-- Imagen del producto -->
          <ion-col size="3">
            <ion-avatar>
              <img :src="item.foto" alt="Imagen del producto" />
            </ion-avatar>
          </ion-col>

          <!-- Detalles del producto -->
          <ion-col size="9">
            <ion-label>
              <h2>{{ item.marca }} {{ item.modelo }}</h2>
              <p>Precio: {{ item.precio | currency }}</p>
            </ion-label>

            <!-- Botón de ver más -->
            <ion-button fill="clear" color="primary"> Ver más </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCardContent,
  IonGrid,
  IonCol,
  IonButton,
  IonAvatar,
  IonLabel,
  IonRow,
  IonCard,
} from "@ionic/vue";

export default {
  components: {
    IonCardContent,
    IonGrid,
    IonCol,
    IonButton,
    IonAvatar,
    IonLabel,
    IonRow,
    IonCard
  },
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  
};
</script>

<style scoped>
.item-card {
  margin-bottom: 10px;
}
</style>
