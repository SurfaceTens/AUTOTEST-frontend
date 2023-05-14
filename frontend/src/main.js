import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from '@/App.vue'
import { createPinia } from 'pinia'

// Importar las vistas
import Home from "@/views/Home.vue"
import Examen from "@/views/Examen.vue"
import Preguntas from "@/views/Preguntas.vue"
import Usuarios from "@/views/Usuarios.vue"
import NuevaPregunta from "@/views/NuevaPregunta.vue"
import NuevoUsuario from "@/views/NuevoUsuario.vue"

// Definir las rutas
const routes = [
  { path: "/",                      name: "Home",                 component: Home },
  { path: "/examen",                name: "Examen",               component: Examen },
  { path: "/preguntas",             name: "Preguntas",            component: Preguntas },
  { path: "/usuarios",              name: "Usuarios",             component: Usuarios },
  { path: "/nuevaPregunta",         name: "NuevaPregunta",        component: NuevaPregunta },
  { path: "/nuevoUsuario",          name: "NuevoUsuario",         component: NuevoUsuario },
]

// Crear el enrutador
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Crear la instancia de Pinia
const pinia = createPinia()

// Montar la aplicación
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
