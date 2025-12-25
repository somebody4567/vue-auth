<template>
<!--  <app-loader></app-loader>-->
  <app-page title="Заявка">
    <p><strong>Имя владельца:</strong> {{ item.name }}</p>
    <p><strong>Телефон:</strong> {{ item.phone }}</p>
    <p><strong>Сумма:</strong> {{ item.sum }}</p>
    <p><strong>Статус:</strong> <app-status :type="item.status" :key="item.status" /></p>

    <div class="form-control">
      <label for="status">Статус:</label>
      <select v-model="status" id="status">
        <option value="done">Завершен</option>
        <option value="canceled">Отменен</option>
        <option value="active">Активен</option>
        <option value="inProgress">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="requestsStore.deleteUser(id)">Удалить</button>
    <button class="btn" @click="requestsStore.changeReqState(id, status)">Обновить</button>
<!--    <app-message />-->
  </app-page>
</template>

<script>
import {ref, isReactive} from "vue";
import { useStore } from "@/stores/store.js";
import { useAlertStore } from "@/stores/alertStore.js";

import AppPage from "@/components/ui/AppPage.vue";
import AppMessage from "@/components/ui/AppMessage.vue";
import AppStatus from "@/components/ui/AppStatus.vue";
import {useRequestsStore} from "@/stores/requests.js";

export default {
  setup({ id }) {
    const store = useStore();
    const alertStore = useAlertStore();
    const requestsStore = useRequestsStore();

    const item = requestsStore.requests.find(item => item.id === +id);
    const status = ref(item.status);

    return { item, store, status, alertStore, requestsStore }
  },
  components: { AppPage, AppMessage, AppStatus },
  props: ['id']
}
</script>

<style scoped>

</style>
