<template>
  <div class="filter mt-14 sm:mt-0">
    <div class="form-control width-[90%] sm:width-[30%] mr-0 sm:mr-8">
      <input
        @input="nameInput"
        v-model="name"
        type="text"
        placeholder="Начните писать имя"
        class=""
      />
    </div>
    <div class="form-control hidden md:block">
      <select @click="statusInput" v-model="status">
        <option value="">Выберите статус</option>
        <option value="done">Завершен</option>
        <option value="canceled">Отменен</option>
        <option value="active">Активен</option>
        <option value="inProgress">Выполняется</option>
      </select>
    </div>
    <button
      class="btn warning hidden lg:block ml-4"
      v-if="name !== '' || status !== ''"
      @click="resetFilter"
    >
      Очистить
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRequestsStore } from '@/stores/requests'

const requestsStore = useRequestsStore()
const name = ref<string>('')
const status = ref<string>('')

function nameInput() {
  requestsStore.setName(name.value)
}

function statusInput() {
  requestsStore.setStatus(status.value)
}

function resetFilter() {
  name.value = ''
  status.value = ''
  requestsStore.setName(name.value)
  requestsStore.setStatus(status.value)
}
</script>

<style scoped></style>
