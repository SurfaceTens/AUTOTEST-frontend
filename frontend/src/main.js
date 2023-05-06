import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'

// Import views for the router.
import App from '@/App.vue'
import Home from "@/views/home.vue";
import Examen from "@/views/examen.vue";
import Preguntas from "@/views/preguntas.vue";
import Pregunta from "@/views/pregunta.vue"; // Add the import statement for Pregunta component
import Usuarios from "@/views/usuarios.vue";
import NuevaPregunta from "@/views/nuevaPregunta.vue";
import NuevoUsuario from "@/views/nuevoUsuario.vue";

// Define the routes constant.
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

// Create the router.
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Mount App with the router.
createApp(App)
  .use(router)
  .mount('#app')
