<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Carrito de compras</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <!-- Iterar sobre los productos del carrito -->
        <ion-card v-for="product in shoppingCart" :key="product.id">
          <ion-grid>
            <ion-row>
              <ion-col size="3">
                <img
                  :src="product.ulrFoto"
                  alt="product.name"
                  class="product-image"
                />
              </ion-col>
              <ion-col size="6">
                <h2>{{ product.nombre }}</h2>
                <p>
                  Precio unitario: {{ product.precioUnitario | currencyFormat }}
                </p>
                <p>Cantidad: {{ product.cantidad }}</p>
                <p>Total: {{ calculateTotal(product) | currencyFormat }}</p>
              </ion-col>
              <ion-col size="3">
                <!-- Botones para modificar cantidad -->
                <ion-button @click="decreaseQuantity(product)">-</ion-button>
                <ion-button @click="increaseQuantity(product)">+</ion-button>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button color="danger" @click="removeProduct(product)">
                  Eliminar del carrito
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-list>

      <!-- Mostrar el precio total del carrito -->
      <ion-card>
        <ion-card-content>
          <h2>Total del carrito: {{ calculateCartTotal() | currencyFormat }}</h2>
        </ion-card-content>
      </ion-card>

      <!-- Botón para vaciar el carrito -->
      <ion-button expand="full" color="danger" @click="emptyCart">
        Vaciar carrito
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { doc, updateDoc, onSnapshot, deleteField } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { onIonViewWillEnter } from "@ionic/vue"; 
import {
  IonRow,
  IonCol,
  IonGrid,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonList,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/vue";

export default {
  name: "CartPage",
  components: {
    IonRow,
    IonCol,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonButton,
    IonCard,
    IonCardContent,
  },
  data() {
    return {
      shoppingCart: [], // Lista para almacenar los productos del carrito
      userId: null, // ID del usuario autenticado
      unsubscribe: null, // Listener para cambios en tiempo real
    };
  },
  methods: {
    // Formatear a moneda
    currencyFormat(value) {
      return new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },

    // Obtener el total de un producto (cantidad * precio unitario)
    calculateTotal(product) {
      return product.cantidad * product.precioUnitario;
    },

    // Método para calcular el total de todos los productos en el carrito
    calculateCartTotal() {
      return this.shoppingCart.reduce(
        (total, product) => total + this.calculateTotal(product),
        0
      );
    },

    // Cargar productos desde Firebase al montar el componente
    async fetchCart() {
      try {
        const userRef = doc(db, "users", this.userId);
        this.unsubscribe = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            this.shoppingCart = userData.shoppingCart || [];
          }
        });
      } catch (error) {
        console.error("Error fetching cart: ", error);
      }
    },

    // Incrementar cantidad de producto
    async increaseQuantity(product) {
      product.cantidad += 1;
      await this.updateCart();
    },

    // Decrementar cantidad de producto
    async decreaseQuantity(product) {
      if (product.cantidad > 1) {
        product.cantidad -= 1;
      } else {
        this.shoppingCart = this.shoppingCart.filter(
          (item) => item.id !== product.id
        );
      }
      await this.updateCart();
    },

    // Eliminar producto del carrito
    async removeProduct(product) {
      this.shoppingCart = this.shoppingCart.filter(
        (item) => item.id !== product.id
      );
      await this.updateCart();
    },

    // Actualizar carrito en Firebase
    async updateCart() {
      try {
        const userRef = doc(db, "users", this.userId);
        await updateDoc(userRef, {
          shoppingCart: this.shoppingCart,
        });
      } catch (error) {
        console.error("Error updating cart: ", error);
      }
    },

    // Vaciar carrito
    async emptyCart() {
      try {
        const userRef = doc(db, "users", this.userId);
        await updateDoc(userRef, {
          shoppingCart: deleteField(),
        });
        this.shoppingCart = [];
      } catch (error) {
        console.error("Error emptying cart: ", error);
      }
    },
  },

  async mounted() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.fetchCart(); // Escuchar cambios en tiempo real en el carrito del usuario autenticado
      } else {
        console.log("No hay usuario autenticado.");
      }
    });
  },

  // Usar el ciclo de vida `onIonViewWillEnter` para recargar el carrito al entrar en la página
  onIonViewWillEnter() {
    if (this.userId) {
      this.fetchCart(); // Recargar el carrito cuando se entra en la página
    }
  },

  onBeforeUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe(); // Desactivar el listener cuando el componente se destruya
    }
  },
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: auto;
}
</style>
