<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user">
      <ion-avatar>
        <img v-if="userPhotoUrl" :src="userPhotoUrl" />
        <ion-icon v-else :icon="personCircle"></ion-icon>
      </ion-avatar>
      <ion-button @click="editPhoto">Editar foto</ion-button>

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
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import {
  IonAvatar,
  IonIcon,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonRouterOutlet,
} from "@ionic/vue";
import { personCircle } from "ionicons/icons";

export default {
  components: {
    IonAvatar,
    IonIcon,
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonButton,
    IonRouterOutlet,
  },
  data() {
    return {
      user: null,
      userPhotoUrl: null,
      personCircle,
    };
  },

  methods: {
    async editPhoto() {
      // Aquí obtendrás la imagen desde la cámara o la galería
      const imageFile = await this.openFileSelector();

      if (imageFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `FotosUsers/${this.user.uid}`);

        // Si ya existe una foto, eliminarla
        if (this.userPhotoUrl) {
          const oldRef = ref(storage, this.userPhotoUrl);
          await deleteObject(oldRef);
        }

        // Subir la nueva foto
        await uploadBytes(storageRef, imageFile);

        // Obtener la URL de la nueva foto
        const downloadURL = await getDownloadURL(storageRef);

        // Actualizar la URL en Firestore
        await updateDoc(doc(db, "users", this.user.uid), {
          urlFoto: downloadURL,
        });

        // Actualizar el estado local de la URL
        this.userPhotoUrl = downloadURL;
      }
    },
    openFileSelector() {
      return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (event) => {
          resolve(event.target.files[0]);
        };
        input.click();
      });
    },

    logout() {
      signOut(auth)
        .then(() => {
          this.user = null;
          this.$router.push("/home");
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error.message);
        });
    },

    // Nueva función para obtener la URL de la foto desde Firestore
    async fetchUserPhotoUrl() {
      try {
        const userDoc = await getDoc(doc(db, "users", this.user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.userPhotoUrl = userData.urlFoto || null; // Asigna la URL si existe
        }
      } catch (error) {
        console.error("Error al obtener la foto del usuario:", error);
      }
    },
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;

        // Llama a la función para obtener la URL de la foto al montar el componente
        this.fetchUserPhotoUrl();
      } else {
        // Si no está autenticado, redirige a la página de login dentro de 'account'
        this.$router.push({ name: "login" });
      }
    });
  },
};
</script>
