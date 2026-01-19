import {defineStore} from "pinia";
import { ref } from 'vue'
import { $app } from '@/http/axios.js'
import router from "@/router/index.js";
import {useAlertStore} from "@/stores/alertStore.js";

export const useAuthStore = defineStore('auth', () => {
  const alertStore = useAlertStore();

  let token = ref(localStorage.getItem('token'))
  let error = ref(null);
  let user = ref({});
  let isAuthenticated = ref(false);
  let isVerified = ref(true);
  let verificationLink = ref('');

  function setVerificationStatus(value) {
    isVerified.value = value
  }

  function createToken(value) {
    token.value = value;
    localStorage.setItem('token', value)
  }

  function resetToken() {
    token.value = null;
    localStorage.removeItem('token');
  }

  function setAuthStatus(value) {
    isAuthenticated.value = value
  }

  function setUser(value) {
    user.value = value
  }

  async function login({email, password}) {
    let res;
    try {
      res = await $app.post('/login', {email, password});
      user.value = res.data.user;
      if (res.status === 200) {
        createToken(res.data.accessToken);
        setAuthStatus(true);
        await router.push('/requests')
      }
    } catch (e) {
      alertStore.changeAlert(true, 'danger', e.response.data.message);
    }

    return res;
  }

  async function logout() {
    const res = await $app.post('/logout');
    resetToken();
    setAuthStatus(false);
    return res
  }

  async function registration({ email, password }) {
    let res;
    try {
      res = await $app.post('/registration', {email, password});
      user.value = res.data.user;
      if (res.status === 200) {
        createToken(res.data.accessToken);
        setAuthStatus(true);
        await router.push('/requests')
      }
      console.log(res)
    } catch (e) {
      alertStore.changeAlert(true, 'danger', e.response.data.message);
    }

    return res;
  }

  return {
    logout, login, registration,
    createToken, token,
    error,
    setAuthStatus,
    setUser,
    user, isAuthenticated,
    isVerified, setVerificationStatus,
    verificationLink,
  }
})
