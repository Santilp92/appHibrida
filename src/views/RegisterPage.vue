<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Registrar Producto</ion-title>
        <ion-buttons slot="start">
          <ion-menu-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-menu side="start" content-id="main-content">
        <ion-header>
          <ion-toolbar>
            <ion-title>Escoge una Categoría</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-item button @click="selectCategory('PcyLaptops')"
              >PC y Laptops</ion-item
            >
            <ion-item button @click="selectCategory('Electrodomesticos')"
              >Electrodomésticos</ion-item
            >
            <ion-item button @click="selectCategory('Celulares')"
              >Celulares</ion-item
            >
            <ion-item button @click="selectCategory('Gaming')">Gaming</ion-item>
            <ion-item button @click="selectCategory('IoT')">IoT</ion-item>
            <ion-item button @click="selectCategory('Accesorios')"
              >Accesorios</ion-item
            >
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-toast
        :is-open="toastData.isOpen"
        :message="toastData.message"
        :color="toastData.color"
        :duration="2000"
        :position="'middle'"
        @didDismiss="toastData.isOpen = false"
      />

      <ion-content id="main-content">
        <ion-card v-if="selectedCategory">
          <ion-card-header>
            <ion-card-title>Registrar {{ selectedCategory }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <form @submit.prevent="registerProduct">
              <ion-card v-if="selectedCategory === 'PcyLaptops'">
                <ion-item>
                  <ion-label>Marca:</ion-label>
                  <ion-input v-model="productData.marca"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Modelo:</ion-label>
                  <ion-input v-model="productData.modelo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Procesador:</ion-label>
                  <ion-input v-model="productData.procesador"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Ram:</ion-label>
                  <ion-input v-model="productData.ram"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Almacenamiento:</ion-label>
                  <ion-input v-model="productData.almacenamiento"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Pantalla:</ion-label>
                  <ion-input v-model="productData.pantalla"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>color:</ion-label>
                  <ion-input v-model="productData.color"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Sistema Operativo:</ion-label>
                  <ion-input v-model="productData.sisOperativo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Precio:</ion-label>
                  <ion-input v-model="productData.precio"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>URL foto:</ion-label>
                  <ion-input v-model="productData.foto"></ion-input>
                </ion-item>
              </ion-card>

              <ion-card v-if="selectedCategory === 'Electrodomesticos'">
                <ion-item>
                  <ion-label>Marca:</ion-label>
                  <ion-input v-model="productData.marca"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Modelo:</ion-label>
                  <ion-input v-model="productData.modelo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Pantalla:</ion-label>
                  <ion-input v-model="productData.pantalla"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Sistema Operativo:</ion-label>
                  <ion-input v-model="productData.sisOperativo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Precio:</ion-label>
                  <ion-input v-model="productData.precio"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>URL foto:</ion-label>
                  <ion-input v-model="productData.foto"></ion-input>
                </ion-item>
              </ion-card>

              <ion-card v-if="selectedCategory === 'Celulares'">
                <ion-item>
                  <ion-label>Marca:</ion-label>
                  <ion-input v-model="productData.marca"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Modelo:</ion-label>
                  <ion-input v-model="productData.modelo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Ram:</ion-label>
                  <ion-input v-model="productData.ram"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Almacenamiento:</ion-label>
                  <ion-input v-model="productData.almacenamiento"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Pantalla:</ion-label>
                  <ion-input v-model="productData.pantalla"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Precio:</ion-label>
                  <ion-input v-model="productData.precio"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>URL foto:</ion-label>
                  <ion-input v-model="productData.foto"></ion-input>
                </ion-item>
              </ion-card>

              <ion-card v-if="selectedCategory === 'Gaming'">
                <ion-item>
                  <ion-label>Nombre:</ion-label>
                  <ion-input v-model="productData.nombre"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Marca:</ion-label>
                  <ion-input v-model="productData.marca"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Modelo:</ion-label>
                  <ion-input v-model="productData.modelo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Precio:</ion-label>
                  <ion-input v-model="productData.precio"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>URL foto:</ion-label>
                  <ion-input v-model="productData.foto"></ion-input>
                </ion-item>
              </ion-card>

              <ion-card v-if="selectedCategory === 'IoT'">
                <ion-item>
                  <ion-label>Nombre:</ion-label>
                  <ion-input v-model="productData.nombre"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Marca:</ion-label>
                  <ion-input v-model="productData.marca"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Modelo:</ion-label>
                  <ion-input v-model="productData.modelo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Precio:</ion-label>
                  <ion-input v-model="productData.precio"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>URL foto:</ion-label>
                  <ion-input v-model="productData.foto"></ion-input>
                </ion-item>
              </ion-card>

              <ion-card v-if="selectedCategory === 'Accesorios'">
                <ion-item>
                  <ion-label>Nombre:</ion-label>
                  <ion-input v-model="productData.nombre"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Marca:</ion-label>
                  <ion-input v-model="productData.marca"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Modelo:</ion-label>
                  <ion-input v-model="productData.modelo"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>Precio:</ion-label>
                  <ion-input v-model="productData.precio"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label>URL foto:</ion-label>
                  <ion-input v-model="productData.foto"></ion-input>
                </ion-item>
              </ion-card>

              <ion-button expand="full" type="submit"
                >Registrar Producto</ion-button
              >
            </form>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script>
import { ref } from "vue";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase"; // Asegúrate de importar Firestore y Storage
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { useRouter } from "vue-router";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonRouterOutlet,
  IonButton,
  IonMenu,
  IonList,
  IonItem,
  IonButtons,
  IonMenuButton,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  menuController,
  IonToast,
} from "@ionic/vue";

export default {
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonRouterOutlet,
    IonButton,
    IonMenu,
    IonList,
    IonItem,
    IonButtons,
    IonMenuButton,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonToast,
  },
  setup() {
    const selectedCategory = ref("PcyLaptops");
    const productData = ref({});
    const selectCategory = async (category) => {
      selectedCategory.value = category;
      await menuController.close(); // Cierra el menú después de seleccionar la categoría
    };

    const registerProduct = async () => {
      try {
        // // Subir la imagen al storage
        // const imageFile = await selectImageFromGallery();
        // const storageReference = storageRef(
        //   storage,
        //   `${selectedCategory.value}/${productData.value.marca}`
        // );
        // await uploadBytes(storageReference, imageFile);
        // const imageUrl = await getDownloadURL(storageReference);

        // Guardar el producto en la base de datos
        await addDoc(collection(db, selectedCategory.value), {
          ...productData.value,
          //   foto: imageUrl,
        });

        // Limpiar los campos después del registro exitoso
        productData.value = {};
        selectedCategory.value = null;

        // Mostrar mensaje de éxito
        showToast("Producto registrado exitosamente", "success");
      } catch (error) {
        showToast("Error registrando producto", "danger");
      }
    };

    const showToast = (message, color) => {
      toastData.value.message = message;
      toastData.value.color = color;
      toastData.value.isOpen = true;
    };

    const toastData = ref({
      isOpen: false,
      message: "",
      color: "success",
    });

    const selectImageFromGallery = async () => {
      // Lógica para seleccionar imagen de la galería
    };

    return {
      selectedCategory,
      productData,
      selectCategory,
      registerProduct,
      toastData,
    };
  },
};
</script>
