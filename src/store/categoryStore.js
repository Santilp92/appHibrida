import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    selectedCategory: null, // Estado inicial de la categoría seleccionada
  }),
  actions: {
    // Acción para establecer la categoría seleccionada
    setCategory(category) {
      this.selectedCategory = category;
    },
    // Acción para limpiar la categoría seleccionada
    clearCategory() {
      this.selectedCategory = null;
    },
    getCategory(){
      return this.selectedCategory;
    },
  },
});
