<template>
  <span class='badge' :class="styles">{{ text }}</span>
</template>

<script>

import {ref} from "vue";

export default {
setup(props) {
  const textMap = {
    active: 'Активен',
    done: 'Выполнен',
    canceled: 'Отменен',
    inProgress: 'Выполняется'
  };
  const stylesMap = {
    active: 'primary',
    done: 'primary',
    canceled: 'danger',
    inProgress: 'warning'
  };
  const text = ref(textMap[props.type]);
  const styles = ref(stylesMap[props.type]);

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
