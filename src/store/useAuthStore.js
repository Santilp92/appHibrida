import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isSignUpSuccess: false,
    userName: ''
  }),
  actions: {
    setSignUpSuccess(name) {
      this.isSignUpSuccess = true;
      this.userName = name;
    },
    clearSignUpState() {
      this.isSignUpSuccess = false;
      this.userName = '';
    }
  }
});
