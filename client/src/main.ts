import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './theme.css'
import '../src/assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')

// Получение данных пользователя. Оставляем пользователя залогиненным, если есть валидный token в localStorage
