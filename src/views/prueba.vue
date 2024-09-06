<style scoped>
.background-container {
  position: relative; 
  width: 100%;
  height: 300px; 
}

.top-background-img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: -2; 
}

.overlay-content {
  position: absolute; 
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3; 
  background: transparent;
}

.welcome-text {
  background-color: transparent;
  font-size: 35px;
  font-weight: bold;
  color: #603a91;
  padding: 0;
  margin-bottom: 35px;
}

.DATOSCONTENEDOR {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  margin: 16px 0;
}

.input-icon {
  position: absolute;
  top: 50%; 
  left: 10px; 
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  z-index: 1; 
  pointer-events: none; 
}

.input-field {
  flex: 1; 
  padding-left: 40px; 
  --color: #000000; /* Color del texto de entrada */
  --color-placeholder: #603a91; /* Color del texto del placeholder */
  --background: #ffffff;
  color: #000000; /* Asegura que el texto ingresado sea negro */
  z-index: 5;
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

.social-button {
  background: #ffffff;
  margin-top: 16px;
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px; 
  border: 1px solid #603a91; 
}

.button-icon {
  margin-right: 8px;
  background-color: transparent;
}
ion-list {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los elementos hijos en el eje transversal */
}
.new-user {
  text-align: center;
  margin-top: 32px;
  color: #603a91;
  display: block; /* Asegura que el enlace ocupe el ancho completo de su contenedor */
}
</style>

<template>
  <ion-page>
    <ion-content>
      <ion-grid class="background-container">
        <ion-row>
          <img src="../assets/top_background.png" class="top-background-img" />
          <ion-col class="overlay-content">
            <ion-label class="welcome-text">Bienvenido Nuevamente</ion-label>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-list class="ion-padding">
        <div class="DATOSCONTENEDOR">
          <ion-item class="input-container">
            <img src="../assets/email.png" class="input-icon" alt="Email Icon" />
            <ion-input
              placeholder="Correo Electrónico"
              type="text"
              clear-input
              class="input-field"
              inputmode="email"
            ></ion-input>
          </ion-item>

          <ion-item class="input-container">
            <img src="../assets/password.png" class="input-icon" alt="Password Icon" />
            <ion-input
              placeholder="Contraseña"
              type="password"
              clear-input
              class="input-field"
              inputmode="text"
            ></ion-input>
          </ion-item>
        </div>

        <ion-button fill="clear" class="custom-button" @click="handleClick">
          <div class="image-container">
            <img src="../assets/btn_login.png" alt="Login Button" class="login-image" />
          </div>
        </ion-button>

        <ion-button fill="outline" shape="round" class="social-button">
          <img src="../assets/google.png" class="button-icon" />
          Ingresar con Google
        </ion-button>
        <ion-button fill="outline" shape="round" class="social-button">
          <img src="../assets/facebook.png" class="button-icon" />
          Ingresar con Facebook
        </ion-button>

        <!-- Asegúrate de que el router-link esté correctamente centrado -->
        <router-link to="/SignUP" class="new-user">
          <ion-label>¿Eres usuario nuevo?</ion-label>
        </router-link>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonRow, IonCol,IonGrid,IonHeader, IonToolbar, IonTitle, IonContent, IonPage,IonInput,IonList,IonLabel,IonButton,IonItem } from '@ionic/vue';

export default {
  name: "LoginPage",
  components: { IonRow, IonCol,IonGrid,IonHeader, IonToolbar, IonTitle, IonContent, IonPage,IonInput,IonList,IonLabel,IonButton,IonItem },
  methods: {
    handleClick() {
      console.log("Botón clickeado!");
    },
   
    // focusEmailInput() {
    //   this.$refs.emailInput.setFocus();
    // },
    // focusPasswordInput() {
    //   this.$refs.passwordInput.setFocus();
    // },
  },
};
</script>
