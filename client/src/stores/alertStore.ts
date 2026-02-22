import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  let alert = reactive<{
    show: boolean
    type?: string
    text?: string
  }>({
    show: false,
    type: 'primary',
    text: '',
  })
  function closeAlert() {
    alert.show = false
    alert.type = undefined
    alert.text = undefined
  }

  function changeAlert(show: boolean, type?: string, text?: string) {
    alert.show = show
    alert.type = type
    alert.text = text
  }

  return {
    alert,
    closeAlert,
    changeAlert,
  }
})
