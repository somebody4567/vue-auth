<template>
  <the-navbar />
  <the-sidebar v-if="useStore().showMessage" />
  <div class="container with-nav mt-18 mx-auto">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
</script>

<style scoped lang="scss"></style>
