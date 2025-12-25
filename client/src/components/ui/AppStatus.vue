<template>
  <span class='badge' :class="styles">{{ text }}</span>
</template>

<script>

import {ref} from "vue";

export default {
setup(props) {
  const text = ref('');
  const styles = ref('');
  if (props.type === 'active') {
    text.value = 'Активен';
    styles.value = 'primary'
  } else if (props.type === 'done') {
    text.value = 'Выполнен';
    styles.value = 'primary';
  } else if (props.type === 'canceled') {
    text.value = 'Отменен';
    styles.value = 'danger';
  } else if (props.type === 'inProgress') {
    text.value = 'Выполняется';
    styles.value = 'warning'
  }

  return {
    text,
    styles
  }
},
props: {
  type: {
    type: String,
    validate(value) {
      return ['active', 'done', 'canceled', 'inProgress'].includes(value)
    }
  }
}
}
</script>

<style scoped>

</style>
