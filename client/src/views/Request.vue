<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заявка" v-if="item && !loading">
    <p><strong>Имя владельца:</strong> {{ item.fullName }}</p>
    <p><strong>Телефон:</strong> {{ item.telephone }}</p>
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
    <button class="btn" v-if="isChanged" @click="requestsStore.changeReqState(id, status)">Обновить</button>
  </app-page>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useStore } from '@/stores/store.js'
import { useAlertStore } from '@/stores/alertStore.js'
import { useRequestsStore } from '@/stores/requests.js'

import AppPage from '@/components/ui/AppPage.vue'
import AppStatus from '@/components/ui/AppStatus.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

export default {
  setup({ id }) {
    const store = useStore();
    const alertStore = useAlertStore();
    const requestsStore = useRequestsStore();
    let item = ref(null);
    let status = ref(null);

    let loading = ref(false);
    let isChanged = ref(false)

    onMounted(async () => {
      loading.value = true
      item.value = (await requestsStore.getRequestByID(id)).data.data
      status.value = item.value.status
      loading.value = false

      watch(status, () => {
        isChanged.value = true
      })
    })

    return { item, store, status, alertStore, requestsStore, loading, isChanged }
  },
  components: { AppPage, AppStatus, AppLoader },
  props: ['id'],

  // beforeRouteEnter(to, from, next) {
  //   let res;
  //   (async() => {
  //     res = await useRequestsStore().getRequestByID(to.params.id)
  //     console.log(res)
  //     next(vm => {})
  //   })()
  //
  //
  // }
}
</script>

<style scoped></style>
