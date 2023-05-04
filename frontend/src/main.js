import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'

// Importar views para el router.
import App from '@/App.vue'
import Home from "@/views/home.vue";
import Examen from "@/views/examen.vue";
import Preguntas from "@/views/preguntas.vue";
import Usuarios from "@/views/usuarios.vue";
import NuevaPregunta from "@/views/nuevaPregunta.vue";
import NuevoUsuario from "@/views/nuevoUsuario.vue";

// Definir la constante de rutas.
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

// Montar App con el router.
createApp(App)
  .use(router)
  .mount('#app')
