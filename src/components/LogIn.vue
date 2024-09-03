<!-- LogIn.vue -->
<template>
    <ion-toolbar>
      <div class="login-container">
        <!-- Logo -->
        <img :src="logo" alt="Logo" class="logo"  />
  
        <!-- Botones o Saludo -->
        <div v-if="!user">
          <ion-button @click="register">Registrar</ion-button>
          <ion-button @click="login">Ingresar</ion-button>
        </div>
        <div v-else>
          <ion-label>Hola, {{ user.displayName }}</ion-label>
        </div>
      </div>
    </ion-toolbar>
  </template>
  
  <script>
  import { IonButton, IonLabel, IonToolbar } from '@ionic/vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  
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
      register() {
        // Lógica para registrarse
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    height: 50px;
    /* Ajusta según el tamaño de tu logo */
  }
  </style>
  