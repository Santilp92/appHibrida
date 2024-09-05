<template>
  <!-- Logo -->
  <!-- <img :src="logo" alt="Logo" class="logo" /> -->
  <ion-buttons slot="primary">
    <ion-button fill="solid"
      >Ingresar
      <ion-icon slot="end" :icon="personCircle"></ion-icon>
    </ion-button>
  </ion-buttons>
</template>

<script>
import { IonButton, IonIcon, IonButtons } from "@ionic/vue";

import { personCircle } from "ionicons/icons";

export default {
  components: {
    IonButton,
    IonButtons,
    IonIcon,
  },
  data() {
    return {
      personCircle,
    };
  },
};
</script>
