import {defineStore} from "pinia";
import {reactive} from "vue";

export const useAlertStore = defineStore('alert', () => {
  let alert = reactive({
    show: false,
    type: 'primary',
    text: ''
  });
  function closeAlert() {
    alert.show = false;
    alert.type = null;
    alert.text = null;
  }

  function changeAlert(show, type, text) {
    alert.show = show;
    alert.type = type;
    alert.text = text;
  }

  return {
    alert, closeAlert, changeAlert
  }
})
