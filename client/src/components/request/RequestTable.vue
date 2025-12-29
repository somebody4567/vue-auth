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
      <tr v-for="(item, i) in requests" :key="item._id">
        <th>{{ i + 1 }}</th>
        <th :title="item.fullName">{{ item.fullName.length > 20 ? item.fullName.slice(0, 25) + '...' : item.fullName }}</th>
        <th :title="item.telephone">{{ item.telephone }}</th>
        <th :title="item.sum">{{ item.sum }}</th>
        <th><app-status :type="item.status" /></th>
        <th>
          <router-link :to="'/request/' + item._id" v-slot="{ navigate }" custom
            ><button @click="navigate" class="btn" style="">Открыть</button>
          </router-link>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import AppStatus from '@/components/ui/AppStatus.vue'
import { useStore } from '@/stores/store.js'
import AppLoader from '@/components/ui/AppLoader.vue'

export default {
  setup({ requests }) {
    return { requests }
  },
  components: { AppLoader, AppStatus },
  props: ['requests'],
}
</script>

<style scoped></style>
