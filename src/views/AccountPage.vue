<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user">
      <h2>Bienvenido, {{ user.displayName || "Usuario" }}</h2>
      <p>Correo: {{ user.email }}</p>
      <ion-button @click="logout">Cerrar Sesión</ion-button>
    </ion-content>
    <ion-content v-else>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script>
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonFooter,
  IonRouterOutlet,
} from "@ionic/vue";

export default {
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonFooter,
    IonRouterOutlet,
  },
  data() {
    return {
      user: null,
    };
  },

  methods: {
    logout() {
      signOut(auth).then(() => {
        this.$router.push("/home");
      });
    },
  },
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      } else {
        // Si no está autenticado, redirige a la página de login dentro de 'account'
        this.$router.push({ name: "login" });
      }
    });
  },
};
</script>
