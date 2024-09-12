<style scoped>
.scroller {
  display: flex;
  flex-direction: row; /* Asegura que los elementos se alineen horizontalmente */
  overflow-x: auto; /* Habilita el desplazamiento horizontal */
  overflow-y: hidden; /* Deshabilita el desplazamiento vertical */
  height: 250px; /* Establece la altura para hacer las cards más grandes */
  margin-right: 10px;
}

.no-scrollbar {
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none; /* Para Internet Explorer y Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari y Opera */
}

.item-card {
  width: 150px;
  height: 220px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
}

.card-img {
  height: 120px; /* Tamaño de la imagen */
  object-fit: cover;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.subtitle {
  font-size: 20px;
}

.description {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Muestra puntos suspensivos cuando el texto es muy largo */
}
</style>

<template>
  <!-- Contenido principal -->
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Bienvenido{{ $route.query.name ? ', ' + $route.query.name : '' }}
        </ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <searchbar />
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <img src="../assets/logo.png" alt="Logo" />
        <ion-card-header class="ion-text-center">
          <ion-card-title>TECHY</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Esta es la pagina de venta de productos online más grande de colombia,
          con los mayoes descuentos.
        </ion-card-content>
      </ion-card>

      <ion-list>
        <ion-list-header>
          <ion-label>PRODUCTOS DESTACADOS</ion-label>
        </ion-list-header>

        <RecycleScroller
          class="scroller no-scrollbar"
          :items="featuredProducts"
          :item-size="160"
          direction="horizontal"
        >
          <template v-slot="{ item }">
            <ion-card class="item-card">
              <ion-img class="card-img" :src="item.foto" alt="Producto" />
              <ion-card-header>
                <ion-card-title class="title">{{ item.nombre }}</ion-card-title>
                <ion-card-subtitle color="danger"  class="subtitle"
                  >{{ item.precio }}</ion-card-subtitle
                >
              </ion-card-header>
              <ion-card-content class="description">
                
              </ion-card-content>
            </ion-card>
          </template>
        </RecycleScroller>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { db } from "../firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import Searchbar from "../components/Searchbar.vue";
import { RecycleScroller } from "vue-virtual-scroller";
import { personCircle, list } from "ionicons/icons";
import {
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonSearchbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonButton,
  IonAvatar,
  IonItem,
  IonLabel,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonListHeader,
} from "@ionic/vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonSearchbar,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonButton,
    IonAvatar,
    IonItem,
    IonLabel,
    Searchbar,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    RecycleScroller,
    IonList,
    IonListHeader,
    IonIcon,
  },
  data() {

    return {
      personCircle,
      list,
      featuredProducts: [],
    };
  },

  mounted() {
    this.fetchFeaturedProducts();
  },

  methods: {
    async fetchFeaturedProducts() {
      const categories = [
        "PcyLaptops",
        "Electrodomesticos",
        "Celulares",
        "Gaming",
        "IoT",
        "Accesorios",
      ];
      let products = [];

      try {
        for (const category of categories) {
          const collectionRef = collection(db, category);
          const q = query(collectionRef, where("esDes", "==", true));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const data = doc.data();

            // console.log(`Producto de la categoría ${category}:`, data);

            let nombreProducto = data.nombre || `${data.marca || ''} ${data.modelo || ''}`;

            products.push({
              id: doc.id,
              nombre: nombreProducto.trim(),
              ...data,
            });
          });
        }
        this.featuredProducts = products;
      } catch (error) {
        console.error("Error fetching featured products: ", error);
      }
    },
  },
};
</script>
