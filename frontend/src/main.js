import { createApp } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"
import "./style.css"
import App from "@/App.vue"
import { createPinia } from "pinia"
import { loginStore } from "@/stores/loginStore.js"

// Importar las vistas
import Home from "@/components/Home.vue"
import Examen from "@/components/examen/Examen.vue"
import Preguntas from "@/components/pregunta/Preguntas.vue"
import Alumnos from "@/components/alumno/Alumnos.vue"
import Examenes from "@/components/examen/Examenes.vue"
import NuevaPregunta from "@/components/pregunta/NuevaPregunta.vue"
import NuevoAlumno from "@/components/alumno/NuevoAlumno.vue"
import ExitoFormulario from "@/components/ExitoFormulario.vue"

// Importar estilos e iconos
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "primeicons/primeicons.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

// Crear la instancia de Pinia
const pinia = createPinia()

// Definir las rutas
const routes = [
  { path: "/",                      name: "Home",                 component: Home                                               },
  { path: "/examen",                name: "Examen",               component: Examen                                             },
  { path: "/preguntas",             name: "Preguntas",            component: Preguntas,         meta: { requiereAdmin: true }   },
  { path: "/alumnos",               name: "Alumnos",              component: Alumnos,           meta: { requiereAdmin: true }   },
  { path: "/examenes",              name: "Examenes",             component: Examenes,          meta: { requiereAdmin: true }   },
  { path: "/nuevaPregunta",         name: "NuevaPregunta",        component: NuevaPregunta                                      },
  { path: "/nuevoAlumno",           name: "NuevoAlumno",          component: NuevoAlumno,       meta: { requiereAdmin: true }   },
  { path: "/exitoFormulario",       name: "ExitoFormulario",      component: ExitoFormulario                                    }
]

// Declarar una variable para almacenar el tipo de precarga
let tipoPrecarga = "todos"

// Crear el enrutador
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Guarda de navegación
router.beforeEach((to, from, next) => {
  const rutaEnMinusculas = to.name.toLowerCase()
  tipoPrecarga = rutaEnMinusculas

  const login = loginStore()
  const rutaRequiereAdmin = to.meta.requiereAdmin
  if (rutaRequiereAdmin && !login.isAdmin) {
    next({ name: "Home" })
  } else {
    next()
  }
})

// Montar la aplicación
const app = createApp(App)
app.use(router)
app.use(pinia)
app.provide('tipoPrecarga', tipoPrecarga)
app.mount("#app")
