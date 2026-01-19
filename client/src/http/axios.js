import axios from 'axios';
import router from '@/router/index.js'
import { useAuthStore } from '@/stores/authStore.js'

const URL = 'http://localhost:5000'
export const $app = axios.create({
  withCredentials: true,
  baseURL: 'https://localhost/api'
})

$app.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})

$app.interceptors.response.use(function (response) {return response}, async function (error) {
  if (error.status === 401) {
    await useAuthStore().logout();
    return router.push('/auth?message=auth');
  }
  console.log(error)
  return Promise.reject(error);
});
