import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import { $app } from '@/http/axios'
import { useAlertStore } from '@/stores/alertStore'
import { useAuthStore } from '@/stores/authStore'

import type { TRequestStatus, IRequest } from '@/types/types'
import { AxiosResponse } from 'axios'

export const useRequestsStore = defineStore('filtering', () => {
  const alertStore = useAlertStore()
  const authStore = useAuthStore()

  let requests = ref<IRequest[]>([])
  let nameFilter = ref('')
  let statusFilter = ref('')

  function setName(value: string) {
    nameFilter.value = value
  }
  function setStatus(value: string) {
    statusFilter.value = value
  }

  function setRequests(reqs: IRequest[]) {
    requests.value = reqs
  }

  // фильтрация запросов при вводе в поле с именем и статусом
  const filteredRequests = computed<IRequest[]>(() =>
    requests.value
      .filter((item) => {
        if (nameFilter.value) {
          if (item.fullName.toLowerCase().startsWith(nameFilter.value.toLowerCase())) {
            return item
          }
        } else {
          return item
        }
      })
      .filter((item) => {
        if (statusFilter.value) {
          if (item.status === statusFilter.value) {
            return item
          }
        } else {
          return item
        }
      }),
  )

  //+++ authStore

  async function getRequestsByID() {
    try {
      if (!authStore.user) throw new Error('Нет данных о пользователе!')
      const res: AxiosResponse = await $app.get('/api/requests/' + authStore.user.id)
      const data: IRequest[] = res.data.data

      setRequests(data)
    } catch (e) {
      console.error(e)
    }
  }

  async function getRequestByID(id: string) {
    try {
      const res: AxiosResponse = await $app.get('/api/request/' + id)
      const data: IRequest = res.data.data

      return data
    } catch (e) {
      console.log(e)
    }
  }

  async function addNewRequest(req: IRequest) {
    try {
      await $app.post('/api/request', {
        userID: req.userID,
        fullName: req.fullName,
        telephone: req.telephone,
        status: req.status,
        sum: req.sum,
      })
      await getRequestsByID()
      alertStore.changeAlert(true, 'primary', 'Заявка успешно создана!')
    } catch (e) {
      alertStore.changeAlert(true, 'danger', 'Что-то пошло не так...')
    }
  }

  async function changeReqState(id: string, status: TRequestStatus) {
    try {
      await $app.patch('/api/request/' + id, { status })
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteUser(id: string) {
    try {
      await $app.delete('/api/request/' + id)
      await router.push('/requests')
      alertStore.changeAlert(true, 'danger', 'Заявка удалена!')
    } catch (e) {
      console.log(e)
    }
  }

  return {
    nameFilter,
    statusFilter,
    setStatus,
    setName,
    addNewRequest,
    changeReqState,
    deleteUser,
    requests,
    getRequestsByID,
    getRequestByID,
    filteredRequests,
  }
})
