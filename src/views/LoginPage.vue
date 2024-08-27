<template>
    <ion-content>
      <!-- Background Images -->
      <ion-img src="/assets/background.png" class="background-img"></ion-img>
      <ion-img src="/assets/top_background.png" class="top-background-img"></ion-img>
      
      <!-- Scrollable Content -->
      <ion-scroll>
        <ion-list>
          <ion-item class="welcome-text">
            <ion-label>Bienvenido Nuevamente</ion-label>
          </ion-item>
  
          <!-- Input Fields -->
          <ion-item>
            <ion-input
              placeholder="Correo Electronico"
              type="text"
              clearInput
              class="input-field"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              placeholder="Contraseña"
              type="password"
              clearInput
              class="input-field"
            ></ion-input>
          </ion-item>
  
          <!-- Buttons -->
          <ion-button expand="full" class="login-button">
            <ion-img src="/assets/btn_login.png"></ion-img>
          </ion-button>
  
          <ion-button expand="full" class="social-button">
            <ion-img src="/assets/google.png" class="button-icon"></ion-img>
            Ingresar con Google
          </ion-button>
          <ion-button expand="full" class="social-button">
            <ion-img src="/assets/facebook.png" class="button-icon"></ion-img>
            Ingresar con Facebook
          </ion-button>
  
          <!-- Text Link -->
          <ion-item class="new-user">
            <ion-label>¿Eres usuario nuevo?</ion-label>
          </ion-item>
        </ion-list>
      </ion-scroll>
    </ion-content>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
  }
  </script>
  
  <style scoped>
  .background-img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .top-background-img {
    position: absolute;
    width: 100%;
    object-fit: cover;
    top: 0;
  }
  .welcome-text {
    text-align: center;
    font-size: 40px;
    color: #603a91;
    margin: 100px 32px 100px;
  }
  .input-field {
    margin: 32px;
    --padding-start: 16px;
    --padding-end: 16px;
    --color-placeholder: #603a91;
    --background: #ffffff;
  }
  .login-button {
    margin-top: 16px;
    background: #ffffff;
  }
  .social-button {
    background: #ffffff;
    margin-top: 16px;
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
  