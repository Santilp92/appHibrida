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
      loading: true,
    };
  },

  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          this.$router.push("/home");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error.message);
        });
    },
  },
  mounted() {
    // Suscribirse a los cambios en el estado de autenticación
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      this.user = user;
      this.loading = false; // Termina el estado de carga una vez que se ha verificado el estado del usuario
    });
  },
  beforeDestroy() {
    // Limpiar la suscripción cuando el componente se desmonte
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
};
</script>
