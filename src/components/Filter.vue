<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Filtros</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <div v-if="category === 'PC y Laptops'">
          <ion-item>
            <ion-label>Subcategoría</ion-label>
            <ion-select v-model="filters.subcategory" placeholder="Seleccionar">
              <ion-select-option value="laptop">Laptop</ion-select-option>
              <ion-select-option value="pc">PC</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Marca</ion-label>
            <ion-select v-model="filters.brand" multiple="true">
              <ion-select-option value="hp">HP</ion-select-option>
              <ion-select-option value="lenovo">Lenovo</ion-select-option>
              <ion-select-option value="asus">Asus</ion-select-option>
              <ion-select-option value="acer">Acer</ion-select-option>
              <ion-select-option value="mac">Mac</ion-select-option>
              <ion-select-option value="dell">Dell</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Sistema Operativo</ion-label>
            <ion-select v-model="filters.cpu" multiple="true">
              <ion-select-option value="i3">Intel Core I3</ion-select-option>
              <ion-select-option value="i5">Intel Core I5</ion-select-option>
              <ion-select-option value="i7">Intel Core I7</ion-select-option>
              <ion-select-option value="i9">Intel Core I9</ion-select-option>
              <ion-select-option value="ryzen3">Ryzen 3</ion-select-option>
              <ion-select-option value="ryzen5">Ryzen 5</ion-select-option>
              <ion-select-option value="ryzen7">Ryzen 7</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Memoria RAM</ion-label>
            <ion-select v-model="filters.ram" multiple="true">
              <ion-select-option value="4gb">4 GB</ion-select-option>
              <ion-select-option value="8gb">8 GB</ion-select-option>
              <ion-select-option value="16gb">16 GB</ion-select-option>
              <ion-select-option value="32gb">32 GB</ion-select-option>
              <ion-select-option value="64gb">64 GB</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Almacenamiento</ion-label>
            <ion-select v-model="filters.storage" multiple="true">
              <ion-select-option value="256gb">256 GB</ion-select-option>
              <ion-select-option value="512gb">512 GB</ion-select-option>
              <ion-select-option value="1tb">1 TB</ion-select-option>
              <ion-select-option value="2tb">2 TB</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
  
        <div v-if="category === 'Celulares'">
          <ion-item>
            <ion-label>Marca</ion-label>
            <ion-select v-model="filters.brand" multiple="true">
              <ion-select-option value="samsung">Samsung</ion-select-option>
              <ion-select-option value="lg">LG</ion-select-option>
              <ion-select-option value="xiaomi">Xiaomi</ion-select-option>
              <ion-select-option value="apple">Apple</ion-select-option>
              <ion-select-option value="huawei">Huawei</ion-select-option>
              <ion-select-option value="google">Google</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Memoria RAM</ion-label>
            <ion-select v-model="filters.ram" multiple="true">
              <ion-select-option value="3gb">3 GB</ion-select-option>
              <ion-select-option value="4gb">4 GB</ion-select-option>
              <ion-select-option value="6gb">6 GB</ion-select-option>
              <ion-select-option value="8gb">8 GB</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Almacenamiento</ion-label>
            <ion-select v-model="filters.storage" multiple="true">
              <ion-select-option value="64gb">64 GB</ion-select-option>
              <ion-select-option value="128gb">128 GB</ion-select-option>
              <ion-select-option value="256gb">256 GB</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label>Cámara</ion-label>
            <ion-select v-model="filters.camera" multiple="true">
              <ion-select-option value="12mp">12 MP</ion-select-option>
              <ion-select-option value="16mp">16 MP</ion-select-option>
              <ion-select-option value="48mp">48 MP</ion-select-option>
              <ion-select-option value="108mp">108 MP</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
  
        <!-- Rango de Precio -->
        <ion-item>
          <ion-label>Precio</ion-label>
          <ion-range dual-knobs="true" v-model="filters.price" min="100" max="5000">
            <ion-label slot="start">$ {{ filters.price.lower }}</ion-label>
            <ion-label slot="end">$ {{ filters.price.upper }}</ion-label>
          </ion-range>
        </ion-item>
  
        <!-- Botón de Filtrar -->
        <ion-button expand="block" @click="applyFilters">Filtrar</ion-button>
      </ion-card-content>
    </ion-card>
  
    <!-- Desplegable para Ordenar -->
    <ion-item>
      <ion-label>Ordenar por</ion-label>
      <ion-select v-model="sortOrder">
        <ion-select-option value="price-asc">Precio: menor a mayor</ion-select-option>
        <ion-select-option value="price-desc">Precio: mayor a menor</ion-select-option>
        <ion-select-option value="relevance">Más relevante</ion-select-option>
      </ion-select>
    </ion-item>
  </template>
  
  <script>
  export default {
    props: {
      category: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        filters: {
          subcategory: null,
          brand: [],
          cpu: [],
          ram: [],
          storage: [],
          camera: [],
          price: {
            lower: 100,
            upper: 5000,
          },
        },
        sortOrder: 'relevance',
      };
    },
    methods: {
      applyFilters() {
        // Aquí implementarías la lógica para aplicar los filtros y traer los productos filtrados.
        console.log("Filtros aplicados:", this.filters, "Ordenar por:", this.sortOrder);
      },
    },
  };
  </script>
  
  <style scoped>
  ion-card {
    margin: 10px;
  }
  </style>
  