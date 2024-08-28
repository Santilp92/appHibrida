<template>
    <ion-page>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="home" href="/home">
            <ion-icon :icon="home" />
            <ion-label>home</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="grid" href="/categories">
            <ion-icon :icon="grid" />
            <ion-label>Categories</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="cart" href="/cart">
            <ion-icon :icon="cart" />
            <ion-label>List</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="person" href="/account">
            <ion-icon :icon="person" />
            <ion-label>Account</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script>
    import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
  
    import { home, person, grid, cart } from 'ionicons/icons';
  
    export default {
      components: { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon },
      data() {
        return {
          home,
          person,
          grid,
          cart,
        };
      },
    };
  </script>