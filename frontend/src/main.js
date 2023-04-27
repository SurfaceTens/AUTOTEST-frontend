import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

// Definir la constante de rutas.
const routes = [
  // ...
]

// Crear el router.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Montar App con el router.
createApp(App)
  .use(router)
  .mount('#app')
