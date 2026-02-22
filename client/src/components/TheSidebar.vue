<template>
  <div class="sidebar w-full sm:w-[300px]">
    <span class="sidebar-close" @click="useStore().showMessage = false">&times;</span>

    <div class="sidebar-content">
      <p>
        Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпывающую
        информацию про систему и заявки
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
</script>

<style scoped>
.sidebar {
  background: linear-gradient(
    135deg,
    rgb(44, 62, 80) 0%,
    /* #2C3E50 */ rgb(26, 37, 47) 100% /* Более темный #1a252f */
  );
  color: white;
}
</style>
