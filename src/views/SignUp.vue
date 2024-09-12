<template>
  <ion-page>
    <ion-content class="page-signup">
      <!-- Imagen de fondo en la parte superior -->
      <img
        class="background-top"
        src="../assets/top_background.png"
        alt="Background Top"
      />

      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="6" size-lg="4">
            <!-- Título de la página -->
            <div class="title">Regístrate</div>

            <!-- Formulario de registro -->
            <form class="form" @submit.prevent="signup">
              <!-- Campo de Nombre con Imagen -->
              <ion-item>
                <img
                  src="../assets/name.png"
                  slot="start"
                  class="input-icon"
                  alt="Nombre Icon"
                />
                <ion-input placeholder="Nombre" v-model="name"></ion-input>
              </ion-item>

              <!-- Campo de Correo Electrónico con Imagen -->
              <ion-item>
                <img
                  src="../assets/email.png"
                  slot="start"
                  class="input-icon"
                  alt="Email Icon"
                />
                <ion-input
                  placeholder="Correo Electrónico"
                  type="email"
                  v-model="email"
                ></ion-input>
              </ion-item>

              <!-- Campo de Contraseña con Imagen -->
              <ion-item>
                <img
                  src="../assets/password.png"
                  slot="start"
                  class="input-icon"
                  alt="Password Icon"
                />
                <ion-input
                  placeholder="Contraseña"
                  type="password"
                  v-model="password"
                ></ion-input>
              </ion-item>

              <!-- Campo de Confirmar Contraseña con Imagen -->
              <ion-item>
                <img
                  src="../assets/password.png"
                  slot="start"
                  class="input-icon"
                  alt="Password Icon"
                />
                <ion-input
                  placeholder="Confirmar Contraseña"
                  type="password"
                  v-model="confirmPassword"
                ></ion-input>
              </ion-item>

              <!-- Botón de Registro con Imagen -->
              <ion-button fill="clear" class="custom-button" type="submit">
                <div class="image-container">
                  <img
                    src="../assets/btn_login.png"
                    alt="Login Button"
                    class="login-image"
                  />
                </div>
              </ion-button>
            </form>

            <!-- Pie con enlace a iniciar sesión -->
            <ion-button fill="clear" class="new-user" @click="Login">
              <ion-label>¿Ya tienes una cuenta?</ion-label>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-toast
        :is-open="showToast"
        :message="toastMessage"
        :color="toastColor"
        duration="2000"
        @did-dismiss="showToast = false"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import {
  IonInput,
  IonButton,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonPage,
  IonToast,
  IonLabel,
} from "@ionic/vue";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "vue-router";

export default {
  components: {
    IonInput,
    IonButton,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonContent,
    IonPage,
    IonToast,
    IonLabel,
  },
  setup() {
    const db = getFirestore();

    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const showToast = ref(false);
    const toastMessage = ref("");
    const toastColor = ref("success");
    const router = useRouter();

    const presentToast = (message, color) => {
      toastMessage.value = message;
      toastColor.value = color;
      showToast.value = true;
    };

    const signup = async () => {
      if (password.value !== confirmPassword.value) {
        presentToast("Las contraseñas no coinciden", "danger");
        return;
      }

      if (password.value.length < 6) {
        presentToast("Por favor mínimo 6 caracteres", "danger");
        return;
      }
      if (name.value.trim() === "") {
        presentToast("El nombre no puede estar vacío", "danger");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        if (user) {
          await updateProfile(user, {
            displayName: name.value,
          });
        };
        const isAdmin = email.value === 'salp7811@hotmail.com';
        
        await setDoc(doc(db, "users", user.uid), {
            isAdmin,
            direccion: "", // Dirección vacía
            urlFoto: "" // URL de foto vacía
          });

        presentToast("Creación exitosa", "success");
        router.push({ path: "/home", query: { name: name.value } });
      } catch (error) {
        console.error("Error al registrar usuario:", error.message);
        presentToast(error.message || "Error al registrar usuario", "danger");
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      signup,
      showToast,
      toastMessage,
      toastColor,
    };
  },
  methods: {
    Login() {
      this.$router.push({ path: "/account/logIn" });
    },
  },
};
</script>

<style scoped>
.page-signup {
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
}

.logo {
  width: 100%;
  height: 120px;
  margin-bottom: 20px;
}

.title {
  font-size: 40px;
  color: #603a91;
  font-weight: bold;
  text-align: center;
}

.form {
  width: 100%;
}

.form ion-item {
  --background: transparent;
  --border-color: #603a91;
  margin-bottom: 20px;
}

.form ion-input {
  color: #603a91;
  --placeholder-color: #603a91;
}

.custom-button {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
}

.image-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.login-image {
  width: 130px;
  height: 85px;
}

.footer {
  margin-top: 30px;
  text-align: center;
  color: #603a91;
  font-weight: bold;
}
</style>
