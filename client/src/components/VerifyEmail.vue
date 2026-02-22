<template>
  <app-page>
    <div class="flex flex-col md:flex-row justify-between alert warning min-h-30 md:min-h-24">
      <p class="alert-title" style="line-height: 17px">Подтвердите почту</p>
      <button class="btn warning" type="button" :disabled="disabled" @click="submit">
        {{ !timer ? 'Отправить письмо' : '0:' + (timer < 10 ? '0' + timer : timer) }}
      </button>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppPage from '@/components/ui/AppPage.vue'
import { $app } from '@/http/axios'
import { useAuthStore } from '@/stores/authStore'

let disabled = ref(false)
let timer = ref(false)
const URL = 'http://localhost:5000' // !!!

//ИСПРАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!

async function submit() {
  disabled.value = true

  // Отправка письма
  await $app.post('/api/mail', {
    to: useAuthStore().user.email,
    link: URL + '/api/activate/' + useAuthStore().user.activationLink,
  })
  const time = Date.now() / 1000 + 5
  const interval = setInterval(() => {
    timer.value = Math.ceil(time - Date.now() / 1000)
    if (timer.value === 0) {
      clearInterval(interval)
      timer.value = false
      disabled.value = false
    }
  }, 1000)
}
</script>

<style lang="scss" scoped></style>
