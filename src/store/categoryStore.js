import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    selectedCategory: null,
  }),
  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    },
  },
});
