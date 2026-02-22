<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="relative modal w-full min-h-full md:min-h-110 top-0 md:w-[600px] md:top-15">
    <h3>{{ title }}</h3>
    <span class="modal-close text-4xl absolute top-1 right-3" @click="$emit('close')">&times;</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>()
defineProps<{
  title: string
}>()
</script>

<style scoped></style>
