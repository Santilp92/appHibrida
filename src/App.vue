<template>
  <ion-app>
    <searchbar />
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import Menu from './components/Menu.vue';
import Searchbar from './components/Searchbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu,
    Searchbar
  },
})

</script>
