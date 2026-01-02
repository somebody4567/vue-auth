<template>
  <div class="container">
    <teleport to="body">
      <app-message v-if="useAlertStore().alert.show" :type="useAlertStore().alert.type" :text="useAlertStore().alert.text" />
    </teleport>
    <router-view />
  </div>
</template>

<script>
import {useAlertStore} from "@/stores/alertStore.js";
import AppMessage from '../components/ui/AppMessage.vue'
export default {
  setup() {
    return { useAlertStore }
  },
  components: {AppMessage}
}
</script>

<style scoped>

</style>
