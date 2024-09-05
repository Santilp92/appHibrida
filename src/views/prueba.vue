<style scoped>
  .background-container {
  position: relative; /* Permite el posicionamiento absoluto de los hijos */
  width: 100%;
  height: 300px; /* Ajusta según el tamaño deseado */
}

.top-background-img {
  position: absolute;
  width: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  z-index: 2; /* Asegura que esta imagen esté sobre la imagen de fondo */
}

.overlay-content {
  position: absolute; /* Posiciona el contenido sobre la imagen de fondo */
  top: 86.5%; /* Centra verticalmente */
  left: 35%; /* Centra horizontalmente */
  transform: translate(
    -50%,
    -50%
  ); /* Ajusta el posicionamiento para un centrado exacto */
  width: 100%;
  display: flex; /* Usa flexbox para centrar el contenido */
  align-items: center; /* Centra verticalmente */
  justify-content: center; /* Centra horizontalmente */
  z-index: 3; /* Asegura que el contenido esté sobre las imágenes de fondo */
  background: transparent;
}

.welcome-text {
  background: transparent;
  background-color: transparent;
  border: none; /* Elimina el borde del ion-item si es necesario */
  box-shadow: none; /* Elimina cualquier sombra si es necesario */
  font-size: 35px;
  font-weight: bold;
  color: #603a91;
  padding: 0;
}

.input-container {
  display: flex;
  align-items: center;
  margin: 16px 0; /* Espacio entre los campos de entrada */
}

.input-icon {
  width: 24px; /* Ajusta el tamaño del ícono */
  height: 24px;
  margin-right: 8px; /* Espacio entre la imagen y el campo de entrada */
}

.input-field {
  flex: 1; /* Ocupa el espacio restante del contenedor */
  --padding-start: 16px;
  --padding-end: 16px;
  --color-placeholder: #603a91;
  --background: #ffffff;
}


.custom-button {
  display: flex;
  justify-content: right;
  margin-right: 20px;
  cursor: pointer; /* Cambia el cursor para indicar que es clickeable */
  margin-top: 10px;
}

.login-image {
  width: 130px; /* Ajusta el tamaño de la imagen */
  height: 85px; /* Ajusta la altura de la imagen */
}

.social-button {
  background: #ffffff;
  margin-top: 16px;
  width: auto; /* Ajusta el ancho */
  max-width: 300px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
}
.button-icon {
  background-color: #ffffff00;
  background: #ffffff00;
}

.social-button {
  background: #ffffff;
  margin-top: 16px;
  width: auto; /* Ajusta el ancho */
  max-width: 300px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
}

.button-icon {
  margin-right: 8px;
}

.new-user {
  text-align: center;
  margin-top: 32px;
  color: #603a91;
}
</style>

<template>
  <ion-page>
    <ion-content>
      <!-- Background Images -->
      <ion-grid class="background-container">
        <ion-row>
          <img
            src="../assets/top_background.png"
            class="top-background-img"
          />
          <ion-col class="overlay-content">
            <ion-item class="welcome-text">
              <ion-label>Bienvenido Nuevamente</ion-label>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Scrollable Content -->
      <ion-list>
        <ion-item class="input-container">
          <img
            src="../assets/email.png"
            class="input-icon"
            alt="Email Icon"
          />
          <ion-input
            placeholder="Correo Electronico"
            type="text"
            clearInput
            class="input-field"
          ></ion-input>
        </ion-item>
        <ion-item>
          <img
            src="../assets/password.png"
            class="input-icon"
            alt="Email Icon"
          />
          <ion-input
            placeholder="Contraseña"
            type="password"
            clearInput
            class="input-field"
          ></ion-input>
        </ion-item>

        <!-- Buttons -->
        <ion-button class="custom-button" @click="handleClick">
          <img
            src="../assets/btn_login.png"
            alt="Login Button"
            class="login-image"
          />
        </ion-button>

        <ion-button class="social-button">
          <img
            src="../assets/google.png"
            class="button-icon"
          />
          Ingresar con Google
        </ion-button>
        <ion-button class="social-button">
          <img
            src="../assets/facebook.png"
            class="button-icon"
          />
          Ingresar con Facebook
        </ion-button>

        <!-- Text Link -->
        <ion-item class="new-user">
          <ion-label>¿Eres usuario nuevo?</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage } from '@ionic/vue';

  export default {
    name: "LoginPage",
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
    methods: {
    handleClick() {
      // Lógica para manejar el clic del botón
      console.log("Botón clickeado!");
    },
  },
  };
  
</script>