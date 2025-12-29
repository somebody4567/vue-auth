<template>
  <AuthForm />
</template>

<script>
import AuthForm from '@/components/forms/AuthForm.vue'
export default {
  components: {AuthForm}
}
</script>

<style scoped>

</style>

<!--<template>-->
<!--  <form class="card"-->
<!--        style="max-width: 800px; margin: 0 auto"-->
<!--        autocomplete="off" @submit.prevent>-->
<!--    <h1>Войти в систему</h1>-->
<!--    <div class="form-control">-->
<!--      <label for="email">Email</label>-->
<!--      <input v-model="email" type="text" id="email">-->
<!--      <small></small>-->
<!--    </div>-->
<!--    <div class="form-control">-->
<!--      <label for="password">Пароль</label>-->
<!--      <input v-model="password" type="password" id="password">-->
<!--      <small></small>-->
<!--    </div>-->
<!--    <button class="btn primary" type="submit" @click="login" :disabled="store.isLoading">-->
<!--      {{!store.isLoading ? 'Войти' : ''}}-->
<!--      <app-loader type="primary small" v-if="store.isLoading" />-->
<!--    </button>-->
<!--    <small style="color: red">{{authStore.error}}</small>-->

<!--    <button class="btn primary" type="submit" @click="registration" :disabled="store.isLoading">-->
<!--      {{!store.isLoading ? 'Регистрация' : ''}}-->
<!--      <app-loader type="primary small" v-if="store.isLoading" />-->
<!--    </button>-->
<!--  </form>-->
<!--</template>-->

<!--<script>-->
<!--import { useAuthStore } from "@/stores/authStore.js";-->
<!--import { useStore } from '@/stores/store.js'-->
<!--import { onMounted, ref, watch} from "vue";-->
<!--import {useRoute} from "vue-router";-->

<!--import {useAlertStore} from "@/stores/alertStore.js";-->
<!--import AppLoader from '@/components/ui/AppLoader.vue'-->

<!--export default {-->
<!--  components: { AppLoader },-->
<!--setup() {-->
<!--  const authStore = useAuthStore();-->
<!--  const alertStore = useAlertStore();-->
<!--  const store = useStore();-->
<!--  const email = ref('smaxims03@mail.ru');-->
<!--  const password = ref('123456789');-->

<!--  if (useRoute().query.message) {-->
<!--    alertStore.changeAlert(true, 'danger', 'Войдите в систему, чтобы получить доступ!');-->
<!--  }-->

<!--  function isValid() {-->

<!--  }-->

<!--  function login() {-->
<!--    if (isValid()) {-->
<!--      authStore.login({email: email.value, password: password.value});-->
<!--    }-->
<!--  }-->

<!--  function registration() {-->
<!--    if (isValid()) {-->
<!--      authStore.registration({email: email.value, password: password.value});-->
<!--    }-->
<!--  }-->

<!--  return {-->
<!--    email,-->
<!--    password,-->
<!--    login, registration,-->
<!--    authStore, store-->
<!--  }-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.error input {-->
<!--  border: 1px solid #e53935;-->
<!--}-->

<!--.error small {-->
<!--  color: #e53935;-->
<!--}-->
<!--</style>-->
