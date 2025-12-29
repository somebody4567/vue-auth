<template>
  <RequestForm />
</template>

<script>
import { ref } from 'vue'
import { useStore } from '@/stores/store.js'
import { useAlertStore } from '@/stores/alertStore.js'
import { useRequestsStore } from '@/stores/requests.js'
import { useAuthStore } from '@/stores/authStore.js'
import AppLoader from '@/components/ui/AppLoader.vue'
import RequestForm from '@/components/forms/RequestForm.vue'

export default {
  components: { RequestForm, AppLoader },
  setup() {
    const alertStore = useAlertStore()
    const store = useStore()
    const requestsStore = useRequestsStore()
    const authStore = useAuthStore()

    let name = ref('Соколов М.Е')
    let phone = ref('+7 910 830 12 52')
    let sum = ref('1000000')
    let status = ref('active')

    async function createPerson() {
      const req = { userID: authStore.user.id, name, phone, sum, status }
      await requestsStore.addNewRequest(req)
      store.isModalOpen = false
    }

    return {
      createPerson,
      name,
      phone,
      sum,
      status,
      store
    }
  },
}
</script>

<style scoped></style>
