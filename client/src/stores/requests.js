import {defineStore} from "pinia";
import {ref, computed, reactive, toRaw, isReactive, isRef} from "vue";
import router from "@/router/index.js";
import axios from "axios";
import {useAlertStore} from "@/stores/alertStore.js";

export const useRequestsStore = defineStore('filtering', () => {
  const alertStore = useAlertStore();

  let requests = reactive(JSON.parse(localStorage.getItem('requests')));
  let nameFilter = ref('');
  let statusFilter = ref('');

  function setName(value) {
    nameFilter.value = value
  }
  function setStatus(value) {
    statusFilter.value = value
  }

  // фильтрация запросов при вводе в поле с именем и статусом
  function filterRequests() {
    return computed(() => {
      return requests.filter(item => {
        if (nameFilter.value !== '' && statusFilter.value !== '') {
          if (item.name.toLowerCase().startsWith(nameFilter.value.toLowerCase()) && item.status === statusFilter.value) {
            return item
          }
        } else if (nameFilter.value === '' && statusFilter.value !== '') {
          if (item.status === statusFilter.value) {
            return item
          }
        } else if (nameFilter.value !== '' && statusFilter.value === '') {
          if (item.name.toLowerCase().startsWith(nameFilter.value.toLowerCase())) {
            return item
          }
        } else if (nameFilter.value === '' && statusFilter.value === '') {
          return item
        }
      })
    })
  }

  async function addNewRequest(req) {
    requests.push(req);
    console.log(req);
    localStorage.setItem('requests', JSON.stringify(requests));
    await axios.post('https://vue-online-bank-fbe49-default-rtdb.europe-west1.firebasedatabase.app/requests_list.json', {
      idToken: localStorage.getItem('token'),
      name: req.name.value,
      phone: req.phone.value,
      status: req.status.value,
      sum: req.sum.value,
    })
  }

  function changeReqState(id, status) {
    const index = requests.findIndex(item => +item.id === +id);
    const item = requests.find(item => +item.id === +id);
    item.status = status;

    requests.splice(index, 1, item);
    localStorage.setItem('requests', JSON.stringify(requests));

    router.push('/requests');
    alertStore.changeAlert(true, 'warning', 'Статус заявки обновлен!');
  }

  function deleteUser(id) {
    const index = requests.findIndex(item => +item.id === +id);
    requests.splice(index, 1);

    localStorage.setItem('requests', JSON.stringify(requests));
    router.push('/requests');
    alertStore.changeAlert(true, 'danger', 'Заявка удалена!');
  }

  return {
    nameFilter, statusFilter,
    filterRequests,
    setStatus, setName,
    addNewRequest,
    changeReqState,
    deleteUser,
    requests
  }
})
