<template>
  <app-loader v-if="loading" />
  <div class="kanban-board mt-16" v-else>
    <!-- 4 колонки для drag-and-drop -->
    <div class="columns-container">
      <!-- Колонка 1: Активные заявки -->
      <div class="column">
        <div class="column-header active">
          <h3>Новые</h3>
          <span class="count-badge">{{ activeRequests.length }}</span>
        </div>
        <draggable
          v-model="activeRequests"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
          data-list-name="active"
        >
          <DragNDropCard
            v-for="card in activeRequests"
            :key="card.id"
            :ticket="{ name: card.fullName, phone: card.telephone }"
          />
        </draggable>
      </div>

      <!-- Колонка 2: Выполненные заявки -->
      <div class="column">
        <div class="column-header completed">
          <h3>Выполненные</h3>
          <span class="count-badge">{{ doneRequests.length }}</span>
        </div>
        <draggable
          v-model="doneRequests"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
          data-list-name="done"
        >
          <DragNDropCard
            v-for="card in doneRequests"
            :key="card.id"
            :ticket="{ name: card.fullName, phone: card.telephone }"
          />
        </draggable>
      </div>

      <!-- Колонка 3: Заявки на проверке -->
      <div class="column">
        <div class="column-header pending">
          <h3>На проверке</h3>
          <span class="count-badge">{{ pendingRequests.length }}</span>
        </div>
        <draggable
          v-model="pendingRequests"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
          data-list-name="inProgress"
        >
          <DragNDropCard
            v-for="card in pendingRequests"
            :key="card.id"
            :ticket="{ name: card.fullName, phone: card.telephone }"
          />
        </draggable>
      </div>

      <!-- Колонка 4: Отмененные заявки -->
      <div class="column">
        <div class="column-header cancelled">
          <h3>Отмененные</h3>
          <span class="count-badge">{{ cancelledRequests.length }}</span>
        </div>
        <draggable
          v-model="cancelledRequests"
          group="tickets"
          item-key="id"
          class="cards-container"
          @end="handleDragEnd"
          data-list-name="canceled"
        >
          <DragNDropCard
            v-for="card in cancelledRequests"
            :key="card.id"
            :ticket="{ name: card.fullName, phone: card.telephone }"
          />
        </draggable>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import DragNDropCard from '../components/drag-n-drop/DragNDropCard.vue'
import { useRequestsStore } from '@/stores/requests.ts'
import {useAuthStore} from '@/stores/authStore.ts'
import AppLoader from '@/components/ui/AppLoader.vue'

const requestsStore = useRequestsStore()
const authStore = useAuthStore()

const requests = computed(() => requestsStore.requests)

const sortRequests = () => {
  activeRequests.value = requests.value.filter(item => item.status === 'active')
  doneRequests.value = requests.value.filter(item => item.status === 'done')
  pendingRequests.value = requests.value.filter(item => item.status === 'inProgress')
  cancelledRequests.value = requests.value.filter(item => item.status === 'canceled')
}

let activeRequests = ref([])
let doneRequests = ref([])
let pendingRequests = ref([])
let cancelledRequests = ref([])
let changesToFetch = ref([])
let loading = ref(false)

const handleDragEnd = async (event) => {
  const id = event.item._underlying_vm_._id;
  const status = event.to.attributes['data-list-name'].value;
  const idx = changesToFetch.value.findIndex(item => item.id === id)
  if (idx !== -1) {
    changesToFetch.value.splice(idx, 1, { id, status })
  } else {
    changesToFetch.value.push({ id, status })
  }
  await requestsStore.changeReqState(id, status)
}

// 2. Используем watch для отслеживания изменений авторизации
watch(
  () => authStore.user?.id,
  async (userId) => {
    loading.value = true;
    if (userId) {
      await requestsStore.getRequestsByID()
      sortRequests()
    }
    loading.value = false;
  },
  { immediate: true }
)

onMounted(async () => {
  loading.value = true;
  if (authStore.user?.id) {
    try {
      sortRequests()
    } catch (e) {console.log(e)}
  }
  loading.value = false;
})

</script>

<style scoped>
.kanban-board {
  padding: 24px;
  background: #f5f7fa;
  min-height: 100vh;
}

.board-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.columns-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.column {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.column-header {
  padding: 16px;
  margin: -20px -20px 20px -20px;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Цвета заголовков колонок */
.column-header.cancelled {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
}

.column-header.active {
  background: linear-gradient(135deg, #059669, #10b981);
}

.column-header.pending {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.column-header.completed {
  background: linear-gradient(135deg, #065f46, #047857);
}

.count-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
}

.cards-container {
  flex: 1;
  min-height: 100px;
  padding: 8px;
  background: #fafafa;
  border-radius: 8px;
  border: 2px dashed #e5e7eb;
  transition: all 0.3s;
}

.cards-container:empty::before {
  content: 'Перетащите карточку сюда';
  display: block;
  text-align: center;
  color: #9ca3af;
  padding: 40px 20px;
  font-size: 14px;
}

.cards-container.drag-over {
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

/* Адаптивность */
@media (max-width: 1400px) {
  .columns-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .columns-container {
    grid-template-columns: 1fr;
  }
}
</style>
