import {defineStore} from "pinia";
import {ref, isRef, isReactive} from "vue";
import axios from "axios";
import router from "@/router/index.js";
import {errorHandling} from "@/utils/errorHandling.js";

export const useAuthStore = defineStore('auth', () => {
  let token = null;
  let error = ref(null);

  function createToken(value) {
    token = value;
    localStorage.setItem('token', token)
  }

  function resetToken() {
    token = null;
    localStorage.removeItem('token');
  }

  function clearError() {
    error.value = null
  }

  function logout() {
    resetToken()
  }

  async function sendUser(url, payload) {
    try {
      const res = await axios.post(url, {
        email: payload.email.value,
        password: payload.password.value,
        returnSecureToken: true
      });
      console.log(res);
      createToken(res.data.idToken);
      await router.push('/requests');
    } catch(e) {
      console.log(e.response.data.error.message)
      if (e.response.data.error.message === "EMAIL_EXISTS") {
        return await signIn(payload)
      }
      error.value = errorHandling(e.response.data.error.message);
    }
  }

  // async function signUp(payload) {
  //   const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2i6SSMiXRRu7Biuhn6zvK1Vc8tfCiTtk';
  //   await sendUser(url, payload);
  // }

  async function signIn(payload) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2i6SSMiXRRu7Biuhn6zvK1Vc8tfCiTtk';
    await sendUser(url, payload)
  }

  async function signUp(email, password) {
    let URL = null;
    if (process.env.NODE_ENV === 'development') {
      URL = 'http://localhost:3000/auth'
    } else if (process.env.NODE_ENV === 'production') {
      URL = ''
    }
    const response = await axios.post(URL, { email: email.value, password: password.value })
    console.log(response);

    if (response.success) {
      // Сохраняем токен
      localStorage.setItem('token', response.token);
      console.log('Регистрация успешна!', response.user);
    } else {
      console.error('Ошибка:', response.message);
    }

    return response;
  }

  return {
    logout, signIn, signUp,
    createToken, resetToken, token,
    error, clearError
  }
})
