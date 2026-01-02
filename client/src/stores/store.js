import {ref} from 'vue';
import { defineStore } from 'pinia';

export const useStore = defineStore('store', () => {
  let showMessage = ref(false);
  const isModalOpen = ref(false);

  return {
    showMessage,
    isModalOpen,
  }
});



