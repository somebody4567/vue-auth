<template>
  <div class="sidebar">
    <span class="sidebar-close" @click="useStore().showMessage = false">&times;</span>

    <div class="sidebar-content">
      <p>Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпывающую информацию про систему и заявки</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "@/stores/store.js";

export default {
setup() {
  return {
    useStore
  }
}
}
</script>

<style scoped>

</style>
