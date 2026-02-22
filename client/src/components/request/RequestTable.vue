<template>
  <h4 class="text-center" v-if="!requests.length">Заявок пока нет</h4>
  <table class="table" v-else>
    <thead>
      <tr>
        <th class="py-1 px-2 sm:py-2 sm:px-4">#</th>
        <th>ФИО</th>
        <th class="hidden md:table-cell">Телефон</th>
        <th class="hidden lg:table-cell">Сумма</th>
        <th class="hidden sm:table-cell">Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in requests" :key="item._id">
        <th class="text-sm md:text-base">{{ i + 1 }}</th>
        <th class="text-sm md:text-base" :title="item.fullName">{{ item.fullName.length > 20 ? item.fullName.slice(0, 25) + '...' : item.fullName }}</th>
        <th class="text-sm md:text-base hidden md:table-cell" :title="item.telephone">{{ item.telephone }}</th>
        <th class="text-sm md:text-base hidden lg:table-cell" :title="formatCurrency(item.sum)">{{ formatCurrency(item.sum) }}</th>
        <th class="hidden sm:table-cell"><app-status :type="item.status" /></th>
        <th class="flex justify-end">
          <router-link :to="'/request/' + item._id" v-slot="{ navigate }" custom
            ><button @click="navigate" class="btn" style="">Открыть</button>
          </router-link>
        </th>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { formatCurrency } from '@/utils/currency.ts'
import AppStatus from '@/components/ui/AppStatus.vue'

defineProps({
  requests: Array
})
</script>

<style scoped></style>
