<template>
  <span class="badge" :class="styles">{{ text }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//!!!!!!!!

const props = defineProps({
  type: {
    type: String,
    validate(value: string): boolean {
      return ['active', 'done', 'canceled', 'inProgress'].includes(value)
    },
  },
})
const textMap = {
  active: 'Активен',
  done: 'Завершен',
  canceled: 'Отменен',
  inProgress: 'Выполняется',
} as const
const stylesMap = {
  active: 'primary',
  done: 'primary',
  canceled: 'danger',
  inProgress: 'warning',
} as const
const text = ref(textMap[props.type])
const styles = ref(stylesMap[props.type])
</script>

<style scoped></style>
