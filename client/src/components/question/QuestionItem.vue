<template>
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title sm:text-base lg:text-lg">{{ question.title }}</div>
    <div class="question-body sm:text-base lg:text-lg" v-if="isOpen">{{ question.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IQuestionPropObject } from '@/types/types'

defineProps<{
  question: IQuestionPropObject
}>()

const isOpen = ref(false)
</script>

<style scoped></style>
