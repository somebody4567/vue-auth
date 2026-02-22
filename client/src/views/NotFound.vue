<template>
  <app-page title="❌ 404. Not Found ❌">
    <div class="not-found text-base md:text-xl">
      <p>Страницы не существует</p>
      <router-link to="/auth">Перейти к аутентификации</router-link>
      <router-link to="/requests">Перейти к запросам</router-link>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from '@/components/ui/AppPage.vue'
</script>

<style lang="css" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  line-height: 1.6;
}
</style>
