<!-- LogIn.vue -->
<template>
  
      <!-- Logo -->
      <!-- <img :src="logo" alt="Logo" class="logo" /> -->

      
      <ion-buttons slot="primary" v-if="!user">
        <ion-button fill="solid" @click="login">Ingresar
          <ion-icon slot="end" :icon="personCircle"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title v-else>
        <ion-label>Hola, {{ user.displayName }}</ion-label>
      </ion-title>
    
</template>

<script>
import { IonButton, IonLabel, IonToolbar } from "@ionic/vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    IonButton,
    IonLabel,
    IonToolbar,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    login() {
      // Lógica para iniciar sesión
    },
  },
};
</script>

