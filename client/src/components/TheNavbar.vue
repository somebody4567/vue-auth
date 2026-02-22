<template>
  <header class="navbar md:h-[56px] py-3 md:py-0 items-center">
    <h3>Online Bank</h3>

    <nav class="hidden md:flex navbar-menu md:w-xs md:h-[27px] lg:w-lg md:justify-between">
      <div>
        <router-link to="/requests">Заявки</router-link>
      </div>
      <div class="hidden lg:block">
        <router-link to="/drag-n-drop">Drag-n-Drop</router-link>
      </div>
      <div>
        <router-link to="/help">Помощь</router-link>
      </div>
      <div>
        <a href="#" @click="store.showMessage = !store.showMessage">Сообщения</a>
      </div>
      <div>
        <router-link custom v-slot="{ navigate }" to="/auth">
          <a href="#" @click="logout(navigate)">Выход</a>
        </router-link>
      </div>
    </nav>
    <div
      class="flex md:hidden navbar-close text-4xl"
      :class="{ active: showNav }"
      @click="showNav = !showNav"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>

  <!--    мобильная версия fixed-->
  <nav
    v-if="showNav"
    class="navbar-menu flex flex-col justify-between items-center fixed top-0 left-0 w-full h-full bg-white z-10 py-15 text-xl"
  >
    <div @click="showNav = false">
      <router-link to="/requests">Заявки</router-link>
    </div>
    <div @click="showNav = false" class="hidden lg:block">
      <router-link to="/drag-n-drop">Drag-n-Drop</router-link>
    </div>
    <div @click="showNav = false">
      <router-link to="/help">Помощь</router-link>
    </div>
    <div>
      <a href="#" @click="store.showMessage = !store.showMessage">Сообщения</a>
    </div>
    <div @click="showNav = false">
      <router-link custom v-slot="{ navigate }" to="/auth">
        <a href="#" @click="logout(navigate)">Выход</a>
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/store.ts'
import { useAuthStore } from '@/stores/authStore.ts'

const store = useStore()
const authStore = useAuthStore()
let showNav = ref(false)

//!!!!!!!!!!!!!!!!

function logout(navigate) {
  authStore.logout()
  navigate()
}
</script>

<style scoped></style>
