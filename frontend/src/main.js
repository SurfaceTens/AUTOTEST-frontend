import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from '@/App.vue'

// Importar las views.
import Home from "@/views/home.vue";
import Examen from "@/views/examen.vue";
import Preguntas from "@/views/preguntas.vue";
import Pregunta from "@/views/pregunta.vue";
import Usuarios from "@/views/usuarios.vue";
import NuevaPregunta from "@/views/nuevaPregunta.vue";
import NuevoUsuario from "@/views/nuevoUsuario.vue";

// Definir las rutas.
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/examen",
    name: "Examen",
    component: Examen,
  },
  {
    path: "/preguntas",
    name: "Preguntas",
    component: Preguntas,
  },
  {
    path: '/preguntas/:id',
    name: 'Pregunta',
    component: Pregunta,
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: Usuarios,
  },
  {
    path: "/nuevaPregunta",
    name: "NuevaPregunta",
    component: NuevaPregunta,
  },
  {
    path: "/nuevoUsuario",
    name: "NuevoUsuario",
    component: NuevoUsuario,
  },
];

// Crear el router.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Mountar App.
createApp(App)
  .use(router)
  .mount('#app')
