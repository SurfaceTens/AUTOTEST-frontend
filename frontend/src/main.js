import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from '@/App.vue'
import { createPinia } from 'pinia'

// Importar las vistas
import Home from "@/components/views/Home.vue"
import Examen from "@/components/views/Examen.vue"
import Preguntas from "@/components/views/Preguntas.vue"
import Usuarios from "@/components/views/Usuarios.vue"
import NuevaPregunta from "@/components/views/NuevaPregunta.vue"
import NuevoUsuario from "@/components/views/NuevoUsuario.vue"
import ExitoFormulario from "@/components/views/ExitoFormulario.vue"

// Importar Prime Vue y Font Awesome
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Definir las rutas
const routes = [
  { path: "/",                      name: "Home",                 component: Home },
  { path: "/examen",                name: "Examen",               component: Examen },
  { path: "/preguntas",             name: "Preguntas",            component: Preguntas },
  { path: "/usuarios",              name: "Usuarios",             component: Usuarios },
  { path: "/nuevaPregunta",         name: "NuevaPregunta",        component: NuevaPregunta },
  { path: "/nuevoUsuario",          name: "NuevoUsuario",         component: NuevoUsuario },
  { path: "/exitoFormulario",       name: "ExitoFormulario",      component: ExitoFormulario },
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
