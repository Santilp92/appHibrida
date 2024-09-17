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
                <img :src="product.ulrFoto" alt="product.name" class="product-image" />
              </ion-col>
              <ion-col size="6">
                <h2>{{ product.nombre }}</h2>
                <p>Precio unitario: {{ product.precioUnitario | currencyFormat }}</p>
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

      <!-- Botón para vaciar el carrito -->
      <ion-button expand="full" color="danger" @click="emptyCart">
        Vaciar carrito
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { doc, updateDoc, getDoc, deleteField } from "firebase/firestore";
import { db, auth } from "../firebase"; // Importar Firebase

export default {
  name: "CartPage",
  data() {
    return {
      shoppingCart: [], // Lista para almacenar los productos del carrito
      userId: null, // ID del usuario autenticado
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

    // Cargar productos desde Firebase al montar el componente
    async fetchCart() {
      try {
        const userRef = doc(db, "users", this.userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.shoppingCart = userData.shoppingCart || [];
        }
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

  // Cargar productos cuando el componente se monte
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.userId = user.uid;
      await this.fetchCart(); // Obtener carrito del usuario autenticado
    } else {
      console.log("No hay usuario autenticado.");
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
