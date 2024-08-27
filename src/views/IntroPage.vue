<template>
    <ion-content fullscreen>
      <div class="intro-container">
        <img src="@/assets/intro.png" class="intro-image" alt="Intro Image" />
  
        <h1 class="title">Techy</h1>
  
        <img src="@/assets/logo.png" class="logo-image" alt="Logo" />
  
        <h2 class="subtitle">Bienvenido nuevamente</h2>
        <p class="description">Todo lo que necesitas</p>
  
        <ion-button expand="block" class="login-button" @click="goToLogin">
          Entrar
        </ion-button>
  
        <ion-button expand="block" class="signup-button" @click="goToSignup">
          Registrarme
        </ion-button>
      </div>
    </ion-content>
  </template>
  
  <script>
export default {
  name: 'IntroPage',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    },
  },
};
</script>
  
  <style scoped>
  .intro-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #ffffff;
  }
  
  .intro-image {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
  
  .title {
    color: #ffffff;
    font-size: 40px;
    font-weight: bold;
    margin-top: 20px;
  }
  
  .logo-image {
    margin-bottom: 80px;
  }
  
  .subtitle {
    color: #6a46ad;
    font-size: 20px;
    font-weight: bold;
  }
  
  .description {
    color: #8a8a8a;
    font-size: 16px;
    margin-top: 8px;
  }
  
  .login-button {
    width: 200px;
    height: 50px;
    --background: #603a91;
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 16px;
  }
  
  .signup-button {
    width: 200px;
    height: 50px;
    --background: #ffffff;
    --color: #603a91;
    font-size: 20px;
    font-weight: bold;
    margin-top: 16px;
  }
  </style>
  