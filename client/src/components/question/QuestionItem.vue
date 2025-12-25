<template>
  <the-navbar />
  <div class="question" @click="isOpen = !isOpen">
    <div class="question-title">{{ question.title }}</div>
    <div class="question-body" v-if="isOpen">{{ question.text }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import TheNavbar from "@/components/TheNavbar.vue";

export default {
  components: {TheNavbar},
props: ['question'],
  setup() {
    const isOpen = ref(false);
    return { isOpen }
  }
}

</script>

<style scoped>

</style>
