<template>
  <div class="breadcrumbs">
    Вернуться к списку заявок
  </div>
  <div class="card" style="position: relative; margin-top: 30px">
    <h1 class="card-title">
      {{ title }}
      <slot name="header" />
    </h1>

    <slot />
  </div>
</template>

<script>
export default {
  props: ['title'],
  setup() {

  }
}
</script>

<style scoped>

</style>
