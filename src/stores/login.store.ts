import { ref } from "vue";

export const loginStore =  ref({
  email: localStorage.getItem('email') || '',
  token: localStorage.getItem('token') || '',

  setEmail(value: string) {
    this.email = value;
    localStorage.setItem('email', value);
  },

  setToken(value: string) {
    this.token = value;
    localStorage.setItem('token', value);
  }
});