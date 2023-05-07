import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from '@/App.vue'
import { createPinia } from 'pinia'

// Importar las vistas
import Home from "@/views/home.vue"
import Examen from "@/views/examen.vue"
import Preguntas from "@/views/preguntas.vue"
import Pregunta from "@/views/pregunta.vue"
import PreguntaNoEncontrada from "@/views/preguntaNoEncontrada.vue"
import Usuarios from "@/views/usuarios.vue"
import NuevaPregunta from "@/views/nuevaPregunta.vue"
import NuevoUsuario from "@/views/nuevoUsuario.vue"

// Definir las rutas
const routes = [
  { path: "/",                      name: "Home",                 component: Home },
  { path: "/examen",                name: "Examen",               component: Examen },
  { path: "/preguntas",             name: "Preguntas",            component: Preguntas },
  { path: '/preguntas/:id',         name: 'Pregunta',             component: Pregunta },
  { path: "/preguntaNoEncontrada",  name: "PreguntaNoEncontrada", component: PreguntaNoEncontrada },
  { path: "/usuarios",              name: "Usuarios",             component: Usuarios },
  { path: "/nuevaPregunta",         name: "NuevaPregunta",        component: NuevaPregunta },
  { path: "/nuevoUsuario",          name: "NuevoUsuario",         component: NuevoUsuario },
]

// Crear el enrutador
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Crear la instancia de Pinia
const pinia = createPinia()

// Montar la aplicación
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
