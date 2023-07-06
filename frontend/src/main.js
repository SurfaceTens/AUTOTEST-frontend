import { createApp } from "vue"
import { createRouter, createWebHashHistory } from "vue-router"
import "./style.css"
import App from "@/App.vue"
import { createPinia } from "pinia"
import { loginStore } from "@/stores/loginStore.js"

// Importar y declarar las vistas
import Home from "@/components/Home.vue"
const Examen = () => import('@/components/examen/Examen.vue')
const Preguntas = () => import('@/components/pregunta/Preguntas.vue')
const Alumnos = () => import('@/components/alumno/Alumnos.vue')
const Examenes = () => import('@/components/examen/Examenes.vue')
const NuevaPregunta = () => import('@/components/pregunta/NuevaPregunta.vue')
const NuevoAlumno = () => import('@/components/alumno/NuevoAlumno.vue')
const ExitoFormulario = () => import('@/components/ExitoFormulario.vue')

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
  { path: "/examenes",              name: "Examenes",             component: Examenes,                                          },
  { path: "/nuevaPregunta",         name: "NuevaPregunta",        component: NuevaPregunta                                      },
  { path: "/nuevoAlumno",           name: "NuevoAlumno",          component: NuevoAlumno,       meta: { requiereAdmin: true }   },
  { path: "/exitoFormulario",       name: "ExitoFormulario",      component: ExitoFormulario                                    }
]


// Crear el enrutador
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Guarda de navegación
router.beforeEach((to, from, next) => {
  const login = loginStore()
  const rutaRequiereAdmin = to.meta.requiereAdmin
  if (rutaRequiereAdmin && !login.rol=="administrador") {
    next({ name: "Home" })
  } else {
    next()
  }
})

/*router.beforeEach((to) => {
  const login = loginStore()
  const rutaRequiereAdmin = to.meta.requiereAdmin
  if (rutaRequiereAdmin && !login.rol == "administrador") {
    return { name: "Home" }
  } else if ((login.rol != "alumno" && login.rol != "administrador") && to.name == "examenes") {
    return { name: "Home" }
  }
})*/

// Montar la aplicación
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount("#app")
