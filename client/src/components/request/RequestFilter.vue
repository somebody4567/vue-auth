<template>
  <div class="filter">
    <div class="form-control">
      <input @input="nameInput" v-model="name" type="text" placeholder="Начните писать имя">
    </div>
    <div class="form-control">
      <select @click="statusInput" v-model="status">
        <option value="">Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="canceled">Отменен</option>
        <option value="active">Активен</option>
        <option value="inProgress">Выполняется</option>
      </select>
    </div>
    <button class="btn warning" v-if="name !== '' || status !== ''" @click="resetFilter">Очистить</button>
  </div>
</template>

<script>
import {ref} from "vue";
import {useRequestsStore} from "@/stores/requests.js";

export default {
setup() {
  const requestsStore = useRequestsStore();
  const name = ref('');
  const status = ref('');

  function nameInput() {
    requestsStore.setName(name.value);
    requestsStore.filterRequests()
  }

  function statusInput() {
    requestsStore.setStatus(status.value);
    requestsStore.filterRequests()
  }

  function resetFilter() {
    name.value = '';
    status.value = '';
    requestsStore.setName(name.value);
    requestsStore.setStatus(status.value);
  }

  return {
    name,
    status,
    resetFilter,
    nameInput, statusInput
  }
}
}
</script>

<style scoped>

</style>
