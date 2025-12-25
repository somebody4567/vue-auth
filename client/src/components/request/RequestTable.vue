<template>
  <h4 class="text-center" v-if="!requests.length">Заявок пока нет</h4>
  <table class="table" v-else>
    <thead>
    <tr>
      <th>#</th>
      <th>ФИО</th>
      <th>Телефон</th>
      <th>Сумма</th>
      <th>Статус</th>
      <th>Действие</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, i) in requests" :key="item.id">
      <th>{{ i + 1 }}</th>
      <th>{{ item.name }}</th>
      <th>{{ item.phone }}</th>
      <th>{{ item.sum }}</th>
      <th><app-status :type="item.status" /></th>
      <th><router-link :to="'/request/' + item.id" v-slot="{ navigate }" custom><button @click="navigate" class="btn" style="">Открыть</button></router-link></th>
    </tr>
    </tbody>
  </table>
</template>

<script>
import AppStatus from "@/components/ui/AppStatus.vue";
import { useStore } from "@/stores/store.js";

export default {
setup({ requests }) {
  return {requests}
},
components: { AppStatus },
  props: ['requests']
}
</script>

<style scoped>

</style>
