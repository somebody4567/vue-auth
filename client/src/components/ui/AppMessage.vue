<template>
  <teleport to="body">
    <div class="alert" :class="type">
      <p class="alert-title">{{ text }}</p>
      <p></p>
      <span class="alert-close" @click="alertStore.closeAlert()">&times;</span>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useAlertStore } from '@/stores/alertStore'

defineProps<{
  type?: string
  text?: string
}>()

const alertStore = useAlertStore()
let timer: number | null = null

onMounted(() => {
  timer = setTimeout(() => alertStore.closeAlert(), 5000)
})

onUnmounted(() => {
  // Очищаем таймер при размонтировании компонента
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
.alert {
  min-width: 500px;
  position: fixed;
  bottom: 10px;
  right: 10px;
}

@media (max-width: 567px) {
  .alert {
    min-width: 250px;
  }
}
</style>
