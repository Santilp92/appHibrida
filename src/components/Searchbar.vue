<!-- Searchbar.vue -->
<template>
  <ion-header>
    <ion-toolbar>
      <ion-searchbar placeholder="Buscar en Tienda Online"></ion-searchbar>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonSearchbar, IonToolbar, IonHeader } from "@ionic/vue";

export default {
  components: {
    IonSearchbar,
    IonToolbar,
    IonHeader
  },
};
</script>
