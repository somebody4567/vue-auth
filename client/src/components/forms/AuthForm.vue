<template>
  <form class="card"
        style="max-width: 800px; margin: 0 auto"
        autocomplete="off" @submit.prevent>
    <h1>Войти в систему</h1>
    <div class="form-control" :class="{'error': errors.email, 'valid': isEmailValid}">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" v-bind="emailAttrs" @input="isFieldValid('email')">
      <small v-if="errors.email">{{ errors.email }}</small>
    </div>
    <div class="form-control" :class="{'error': errors.password, 'valid': isPasswordValid}">
      <label for="password">Пароль</label>
      <input v-model="password" type="password" id="password" v-bind="passwordAttrs" @input="isFieldValid('password')">
      <small v-if="errors.password">{{ errors.password }}</small>
    </div>
    <button class="btn primary" type="submit" @click="login" :disabled="store.isLoading">
      {{!store.isLoading ? 'Войти' : ''}}
      <app-loader type="primary small" v-if="store.isLoading" />
    </button>
    <small style="color: red">{{authStore.error}}</small>

    <button class="btn primary" type="submit" @click="registration" :disabled="store.isLoading">
      {{!store.isLoading ? 'Регистрация' : ''}}
      <app-loader type="primary small" v-if="store.isLoading" />
    </button>
  </form>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { useStore } from '@/stores/store.js'
import { ref } from "vue";
import {useRoute} from "vue-router";
import { useForm } from 'vee-validate';
import * as yup from 'yup';

import {useAlertStore} from "@/stores/alertStore.js";
import AppLoader from '@/components/ui/AppLoader.vue'

export default {
  components: { AppLoader },
  setup() {
    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const store = useStore();

    let isEmailValid = ref(false);
    let isPasswordValid = ref(false);

    const { errors, handleSubmit, defineField, meta, setFieldError, validateField } = useForm({
      validationSchema: yup.object({
        email: yup.string().email('Неверный email').required('Поле не должно быть пустым'),
        password: yup.string().min(6, 'Минимум 6 символов').required('Поле не должно быть пустым'),
      }),
    });

    const [email, emailAttrs] = defineField('email');
    const [password, passwordAttrs] = defineField('password');

    // Если поле валидно - показываем это(класс valid)
    async function isFieldValid(validate) {
      if (validate === 'email') {
        isEmailValid.value = (await validateField(validate)).valid
      } else if (validate === 'password') {
        isPasswordValid.value = (await validateField(validate)).valid
      }
    }

    if (useRoute().query.message) {
      alertStore.changeAlert(true, 'danger', 'Войдите в систему, чтобы получить доступ!');
    }

    function isValid() {
      if (meta.value.valid) {
        return true
      } else {
        if (!isEmailValid.value) setFieldError('email', 'Заполните поле');
        if (!isPasswordValid.value) setFieldError('password', 'Заполните поле');
      }
    }

    function login() {
      if (isValid()) {
        authStore.login({email: email.value, password: password.value});
      }
    }

    function registration() {
      if (isValid()) {
        authStore.registration({email: email.value, password: password.value});
      }
    }

    return {
      email, emailAttrs,
      password, passwordAttrs,
      errors,
      login, registration,
      authStore, store,
      isFieldValid,
      isEmailValid, isPasswordValid
    }
  }
}
</script>

<style scoped></style>

