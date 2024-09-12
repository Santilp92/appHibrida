<template>
  <ion-page>
    <ion-content class="products-container">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Productos de {{ category }}</ion-card-title>
        </ion-card-header>
      </ion-card>

      <!-- Verificar si hay productos -->
      <ion-list class="products-container" v-if="products.length > 0">
        <!-- Itera sobre los productos -->
        <IonCard
          v-for="product in products"
          :key="product.id"
          class="item-card"
        >
          <IonCardHeader>
            <IonCardTitle>
              {{ product.marca }} {{ product.modelo }}
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="3">
                  <img
                    :src="product.foto"
                    alt="Product Image"
                    class="product-image"
                  />
                </IonCol>
                <IonCol size="9">
                  <!-- Verifica la categoría para mostrar los campos adecuados -->
                  <template v-if="category === 'PcyLaptops'">
                    <IonLabel>
                      <h2>{{ product.marca }} {{ product.modelo }}</h2>
                      <p>{{ product.ram }} {{ product.almacenamiento }}</p>
                      <p class="price">{{ product.precio }}</p>
                    </IonLabel>
                  </template>

                  <template v-else-if="category === 'Electrodomesticos'">
                    <IonLabel>
                      <h2>{{ product.marca }} {{ product.modelo }}</h2>
                      <p>
                        {{ product.pantalla }} pulgadas,
                        {{ product.sisOperativo }}
                      </p>
                      <p class="price">{{ product.precio }}</p>
                    </IonLabel>
                  </template>

                  <template v-else-if="category === 'Celulares'">
                    <IonLabel>
                      <h2>{{ product.marca }} {{ product.modelo }}</h2>
                      <p>
                        {{ product.pantalla }} pulgadas,
                        {{ product.almacenamiento }}
                      </p>
                      <p class="price">{{ product.precio }}</p>
                    </IonLabel>
                  </template>

                  <template v-else-if="category === 'Gaming'">
                    <IonLabel>
                      <h1>Nombre: {{ product.nombre }}</h1>
                      <h2>{{ product.marca }} {{ product.modelo }}</h2>
                      <p class="price">{{ product.precio }}</p>
                    </IonLabel>
                  </template>

                  <template v-else-if="category === 'IoT'">
                    <IonLabel>
                      <h1>Nombre: {{ product.nombre }}</h1>
                      <h2>{{ product.marca }} {{ product.modelo }}</h2>
                      <p class="price">{{ product.precio }}</p>
                    </IonLabel>
                  </template>

                  <template v-else-if="category === 'Accesorios'">
                    <IonLabel>
                      <h1>Nombre: {{ product.nombre }}</h1>
                      <h2>{{ product.marca }} {{ product.modelo }}</h2>
                      <p class="price">{{ product.precio }}</p>
                    </IonLabel>
                  </template>

                  <IonButton expand="full" @click="openModal(product)"
                    >Ver más</IonButton
                  >
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </ion-list>

      <ion-list v-else>
        <p>No hay productos disponibles para esta categoría.</p>
      </ion-list>

      <!-- Modal de información del producto -->
      <IonModal
        :isOpen="isModalOpen"
        @didDismiss="closeModal"
        :backdropDismiss="true"
        class="transparent-modal"
      >
        <IonCard class="modal-container">
          <IonCardHeader>
            <IonCardTitle
              >{{ selectedProduct.marca }}
              {{ selectedProduct.modelo }}</IonCardTitle
            >
          </IonCardHeader>
          <IonCardContent>
            <img
              :src="selectedProduct.foto"
              alt="Product Image"
              class="modal-product-image"
            />
            <template v-if="category === 'PcyLaptops'">
              <p>Procesador: {{ selectedProduct.procesador }}</p>
              <p>Pantalla: {{ selectedProduct.pantalla }} pulgadas</p>
              <p>RAM: {{ selectedProduct.ram }}</p>
              <p>Sistema Operativo: {{ selectedProduct.sisOperativo }}</p>
              <p>Color: {{ selectedProduct.color }}</p>
              <p class="price">{{ selectedProduct.precio }}</p>
            </template>

            <template v-else-if="category === 'Electrodomesticos'">
              <IonLabel>
                <p>Modelo: {{ selectedProduct.modelo }}</p>
                <p>Marca: {{ selectedProduct.marca }}</p>
                <p>Pulgadas: {{ selectedProduct.pantalla }}</p>
                <p>Sistema Operativo: {{ selectedProduct.sisOperativo }}</p>
                <p class="price">{{ selectedProduct.precio }}</p>
              </IonLabel>
            </template>

            <template v-else-if="category === 'Celulares'">
              <IonLabel>
                <p>Modelo: {{ selectedProduct.modelo }}</p>
                <p>Marca: {{ selectedProduct.marca }}</p>
                <p>Pantalla: {{ selectedProduct.pantalla }} pulgadas</p>
                <p>RAM: {{ selectedProduct.ram }}</p>
                <p>Almacenamiento: {{ selectedProduct.almacenamiento }}</p>
                <p class="price">{{ selectedProduct.precio }}</p>
              </IonLabel>
            </template>

            <template v-else-if="category === 'Gaming'">
              <IonLabel>
                <p>Nombre: {{ selectedProduct.nombre }}</p>
                <p>Marca: {{ selectedProduct.marca }}</p>
                <p>Modelo: {{ selectedProduct.modelo }}</p>
                <p class="price">{{ selectedProduct.precio }}</p>
              </IonLabel>
            </template>

            <template v-else-if="category === 'IoT'">
              <IonLabel>
                <p>Nombre: {{ selectedProduct.nombre }}</p>
                <p>Marca: {{ selectedProduct.marca }}</p>
                <p>Modelo: {{ selectedProduct.modelo }}</p>
                <p class="price">{{ selectedProduct.precio }}</p>
              </IonLabel>
            </template>

            <template v-else-if="category === 'Accesorios'">
              <IonLabel>
                <p>Nombre: {{ selectedProduct.nombre }}</p>
                <p>Marca: {{ selectedProduct.marca }}</p>
                <p>Modelo: {{ selectedProduct.modelo }}</p>
                <p class="price">{{ selectedProduct.precio }}</p>
              </IonLabel>
            </template>

            <IonButton
              expand="full"
              color="primary"
              @click="addToCart(selectedProduct)"
              >Agregar al carrito</IonButton
            >
            <IonButton expand="full" color="light" @click="closeModal"
              >Cerrar</IonButton
            >
          </IonCardContent>
        </IonCard>
      </IonModal>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db, auth } from "../firebase"; // Asegúrate de importar la instancia de Firestore desde firebase.js
import { getAuth } from "firebase/auth"; // Importa Firebase Auth
import { useCategoryStore } from "../store/categoryStore";
import { computed } from "vue";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonButton,
  IonModal,
  IonLoading,
} from "@ionic/vue";

export default {
  name: "ProductsPage",
  components: {
    IonPage,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonButton,
    IonModal,
    IonLoading,
  },
  data() {
    const categoryStore = useCategoryStore();
    const category = computed(() => categoryStore.selectedCategory);
    const products = ref([]); // Aquí almacenaremos los productos

    // Función para obtener los productos de Firebase según la categoría
    const fetchProducts = async () => {
      try {
        // Crea la referencia a la colección según la categoría
        const q = query(collection(db, category.value));
        const querySnapshot = await getDocs(q);

        // Mapea los documentos obtenidos a objetos de productos
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
        });
        products.value = fetchedProducts; // Asigna los productos a la variable reactiva
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Llama a la función cuando el componente se monte
    onMounted(() => {
      fetchProducts();
    });

    return {
      category,
      products,
      isModalOpen: false,
      selectedProduct: {},
      userId: null,
    };
  },

  created() {
    // Aquí obtenemos el ID del usuario autenticado
    const auth = getAuth(); // Obtén la instancia de autenticación
    const user = auth.currentUser; // Obtén el usuario actual
    if (user) {
      this.userId = user.uid; // Si el usuario está autenticado, guarda el UID
    } else {
      console.log("No hay usuario autenticado.");
    }
  },

  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedProduct = {};
    },
    addToCart(product) {
      // Lógica para agregar el producto al carrito
      console.log("Producto agregado al carrito:", product);
      this.closeModal();
    },

    async addToCart(product) {
      try {
        if (!this.userId) {
          console.log("Usuario no autenticado.");
          return;
        }

        // Obtener la referencia del documento del usuario
        const userRef = doc(db, "users", this.userId);
        const userDoc = await getDoc(userRef);

        // Definir los detalles del producto para el carrito
        const productToAdd = {
          id: product.id,
          nombre: product.nombre || `${product.marca} ${product.modelo}`,
          precioUnitario: product.precio,
          cantidad: 1, // Inicialmente agregar un producto con cantidad 1
        };

        // Si el documento del usuario no existe, lo creamos con el carrito
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            shoppingCart: [productToAdd],
          });
        } else {
          const userData = userDoc.data();
          const shoppingCart = userData.shoppingCart || [];

          // Buscar si el producto ya existe en el carrito
          const existingProduct = shoppingCart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            existingProduct.cantidad += 1;
            await updateDoc(userRef, {
              shoppingCart,
            });
          } else {
            // Si el producto no está en el carrito, agregarlo
            await updateDoc(userRef, {
              shoppingCart: arrayUnion(productToAdd),
            });
          }
        }
        console.log("Producto agregado al carrito:", product);
        this.closeModal();
      } catch (error) {
        console.error("Error agregando al carrito: ", error);
      }
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 100%;
  height: auto;
}

.price {
  color: red;
  font-weight: bold;
}

.modal-container {
  bottom: 0;
  height: 100%;
  background: white;
  border-radius: 20px;
}

.modal-product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
ion-modal {
  --height: 90%;
  --width: 75%;
}

.transparent-modal {
  background-color: transparent !important; /* Hacer el fondo del modal transparente */
}
</style>
