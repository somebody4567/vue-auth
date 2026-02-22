import { defineStore } from 'pinia'
import { ref } from 'vue'
import { $app } from '@/http/axios'
import router from '@/router'
import { useAlertStore } from '@/stores/alertStore'
import { IUser, IAuthData } from '@/types/types'
import axios, { AxiosResponse, AxiosError } from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const alertStore = useAlertStore()
  let error = ref<string | null>(null)
  let token = ref(localStorage.getItem('token'))
  let user = ref<IUser>()
  let isAuthenticated = ref(false)
  let isVerified = ref(true)
  let verificationLink = ref('')

  function setVerificationStatus(value: boolean) {
    isVerified.value = value
  }

  function createToken(value: string) {
    token.value = value
    localStorage.setItem('token', value)
  }

  function resetToken() {
    token.value = null
    localStorage.removeItem('token')
  }

  function setAuthStatus(value: boolean) {
    isAuthenticated.value = value
  }

  function setUser(value: IUser) {
    user.value = value
  }

  async function login({ email, password }: { email: string; password: string }) {
    try {
      let res = await $app.post('/api/login', { email, password })
      user.value = res.data.user
      if (res.status === 200) {
        createToken(res.data.accessToken)
        setAuthStatus(true)
        await router.push('/requests')
      }
      return res
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const e = error as AxiosError
        alertStore.changeAlert(true, 'danger', e?.response?.data?.message)
      }
    }
  }
  // logout

  async function logout() {
    const res = await $app.post('/api/logout')
    await router.push('/auth')
    resetToken()
    setAuthStatus(false)
    return res
  }

  async function registration({ email, password }: { email: string; password: string }) {
    let res
    try {
      res = await $app.post('/api/registration', { email, password })
      user.value = res.data.user
      if (res.status === 200) {
        createToken(res.data.accessToken)
        setAuthStatus(true)
        await router.push('/requests')
      }
    } catch (e) {
      alertStore.changeAlert(true, 'danger', e.response.data.message)
    }

    return res
  }

  async function keepUserLoggedIn() {
    try {
      if (localStorage.getItem('token')) {
        // Получение данных пользователя после перезагрузки страницы
        const { data }: AxiosResponse<IAuthData> = await $app.get('/api/refresh', {
          withCredentials: true,
        })

        setAuthStatus(true)
        createToken(data.accessToken)
        setUser(data.user)
        setVerificationStatus(data.user.isActivated)
        return true
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return {
    logout,
    login,
    registration,
    error,
    createToken,
    token,
    setAuthStatus,
    setUser,
    user,
    isAuthenticated,
    isVerified,
    setVerificationStatus,
    verificationLink,
    keepUserLoggedIn,
  }
})
