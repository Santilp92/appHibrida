<style scoped>
/* Contenedor de la imagen de perfil */
.profile-image-container {
  width: 150px; /* Ancho constante */
  height: 150px; /* Altura constante */
  border-radius: 50%; /* Hacer el contenedor circular */
  overflow: hidden; /* Asegurar que la imagen no salga del contenedor */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px; /* Centrar el contenedor y añadir margen inferior */
  background-color: #f0f0f0; /* Color de fondo para el ícono por defecto */
}

/* Imagen de perfil */
.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajustar la imagen al contenedor manteniendo la proporción */
  border-radius: 50%; /* Hacer la imagen circular */
}

/* Ícono de perfil por defecto */
.profile-icon {
  font-size: 100px; /* Tamaño del ícono por defecto */
  color: #8a8a8a; /* Color gris para el ícono */
}

/* Estilo para centrar el botón de editar foto */
.edit-photo-button {
  display: block;
  margin: 0px auto; /* Centrar el botón */
  width: auto; /* Ancho del botón ajustado automáticamente */
  padding: 0 100px; /* Espaciado horizontal dentro del botón */
}
</style>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mi Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="user" class="ion-padding">
      <div class="profile-image-container">
        <img v-if="userPhotoUrl" :src="userPhotoUrl" class="profile-image" />
        <ion-icon v-else :icon="personCircle" class="profile-icon"></ion-icon>
      </div>

      <ion-button @click="editPhoto" fill="clear" class="edit-photo-button">
        Editar foto
      </ion-button>

      <h2 class="ion-text-center">
        Bienvenido, {{ user.displayName || "Usuario" }}
      </h2>
      <p class="ion-text-center">Correo: {{ user.email }}</p>

      <ion-button @click="logout" expand="block">Cerrar Sesión</ion-button>

      <!-- Botón de eliminar cuenta -->
      <ion-button @click="presentAlert" color="danger" expand="block">
        Eliminar Cuenta
      </ion-button>

      <!-- Alerta de confirmación -->
      <ion-alert
        :is-open="showAlert"
        header="Confirmación"
        message="¿Estás seguro de que deseas eliminar tu cuenta?"
        :buttons="alertButtons"
        @didDismiss="showAlert = false"
      ></ion-alert>
    </ion-content>
    <ion-content v-else>
      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script>
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
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
  IonAlert,
} from "@ionic/vue";
import { personCircle } from "ionicons/icons";

export default {
  components: {
    IonAlert,
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
      showAlert: false,
      alertButtons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            this.showAlert = false;
          },
        },
        {
          text: "Eliminar",
          role: "confirm",
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    };
  },

  methods: {

    presentAlert() {
      this.showAlert = true;
    },

    async editPhoto() {
      try {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
          quality: 100,
        });

        const imageFile = this.dataURLtoBlob(image.dataUrl);

        if (imageFile) {
          const storage = getStorage();
          const storageRef = ref(storage, `FotosUsers/${this.user.uid}`);

          if (this.userPhotoUrl) {
            const oldRef = ref(storage, this.userPhotoUrl);
            await deleteObject(oldRef);
          }

          await uploadBytes(storageRef, imageFile);

          const downloadURL = await getDownloadURL(storageRef);

          await updateDoc(doc(db, "users", this.user.uid), {
            urlFoto: downloadURL,
          });

          this.userPhotoUrl = downloadURL;
        }
      } catch (error) {
        console.error("Error al capturar o subir la imagen:", error);
      }
    },

    dataURLtoBlob(dataUrl) {
      const arr = dataUrl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },

    logout() {
      signOut(auth)
        .then(() => {
          this.user = null;
          this.$router.push({ path: "/home", query: {} });
        })
        .catch((error) => {
          console.error("Error al cerrar sesión:", error.message);
        });
    },

    async fetchUserPhotoUrl() {
      try {
        const userDoc = await getDoc(doc(db, "users", this.user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.userPhotoUrl = userData.urlFoto || null;
        }
      } catch (error) {
        console.error("Error al obtener la foto del usuario:", error);
      }
    },

    async deleteAccount() {
      try {
        const userDocRef = doc(db, "users", this.user.uid);
        // Verificar si el usuario tiene una foto de perfil antes de eliminarla
        if (this.userPhotoUrl) {
          const storage = getStorage();
          const storageRef = ref(storage, `FotosUsers/${this.user.uid}`);

          try {
            // Intentar eliminar la imagen de Firebase Storage
            await deleteObject(storageRef);
            console.log("Imagen eliminada correctamente");
          } catch (error) {
            // Verificar si el error es de tipo "Object not found"
            if (error.code === "storage/object-not-found") {
              console.error("La imagen no existe en el Storage");
            } else {
              throw error; // Re-lanzar otros errores
            }
          }
        }

        // Eliminar el documento del usuario en Firestore
        await deleteDoc(userDocRef);

        // Eliminar el usuario de la autenticación
        await this.user.delete();

        // Limpiar el estado de usuario local
        this.user = null;
        this.userPhotoUrl = null;

        // Redirigir al usuario a la página de inicio
        this.$router.push({ path: "/home", query: {} });
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    },
  },

  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.fetchUserPhotoUrl();
      } else {
        // this.$router.push({ name: "login" });
      }
    });
  },
};
</script>
