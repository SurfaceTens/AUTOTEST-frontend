import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Examen from "@/views/examen.vue";
import Preguntas from "@/views/preguntas.vue";
import Usuarios from "@/views/usuarios.vue";
import NuevaPregunta from "@/views/nuevaPregunta.vue";
import NuevoUsuario from "@/views/nuevoUsuario.vue";

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

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
