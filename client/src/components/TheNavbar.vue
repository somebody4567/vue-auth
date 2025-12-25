<template>
  <nav class="navbar">
    <h3>Online Bank</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/requests">Заявки</router-link>
      </li>
      <li>
        <router-link to="/help">Помощь</router-link>
      </li>
      <li>
        <a href="#" @click="store.showMessage = !store.showMessage">Сообщения</a>
      </li>
      <li>
        <router-link custom v-slot="{ navigate }" to="/auth">
          <a href="#" @click="logout(navigate)">Выход</a>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useStore } from "@/stores/store.js";
import { useAuthStore } from "@/stores/authStore.js";
import {ref} from "vue";
// ошибка navbar. Хотел реализовать logout

export default {
setup() {
  const store = useStore();
  const authStore = useAuthStore();

  function logout(navigate) {
    authStore.logout();
    navigate()
  }
  return {
    store,
    logout
  }
}
}
</script>

<style scoped>

</style>
