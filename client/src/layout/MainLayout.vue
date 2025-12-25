<template>
  <the-navbar />
  <the-sidebar v-if="useStore().showMessage"  />
  <div class="container with-nav">
    <router-view />
  </div>
</template>

<script>
import { useStore } from "@/stores/store.js";
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import AppMessage from '../components/ui/AppMessage.vue'

export default {
  setup() {
    return {
      useStore
    }
  },
  components: {TheNavbar, AppMessage, TheSidebar}
}
</script>

<style scoped>

</style>
