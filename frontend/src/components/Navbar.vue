<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { alumnosStore } from "@/stores/alumnosStore"

export default {
  computed: {
    ...mapState(loginStore, ["rol", "alumnoID", "alumnoDatos"]),
    ...mapState(alumnosStore, ["alumnos"]),
    filtrarAlumnos() {
      return this.alumnos.filter((alumno) => alumno.id !== 1)
    },
  },
  data() {
    return {
      nuevoRol: "invitado",
      alumnoSeleccionado: null,
    }
  },
  methods: {
    ...mapActions(loginStore, ["cambiarRol", "cambiarAlumno"]),
    seleccionarAlumno() {
      if (this.alumnoSeleccionado) {
        this.cambiarAlumno(this.alumnoSeleccionado)
      }
    },
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-custom my-custom-nav">
    <div class="container-fluid">
      <div class="d-flex justify-content-start align-items-center">
        <div class="navbar-brand">
          <a href="#">
            <img src="/logoAutotest.png" alt="Logo" />
          </a>
        </div>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-if="rol != 'administrador'" class="nav-item">
            <router-link class="nav-link" to="/Examen">Examen</router-link>
          </li>

          <li v-if="rol == 'administrador'" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="preguntasDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Gestión de Preguntas
            </a>
            <ul class="dropdown-menu" aria-labelledby="preguntasDropdown" id="preguntasDropdown">
              <li>
                <router-link class="dropdown-item" to="/nuevaPregunta">Crear Pregunta</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/preguntas">Ver Preguntas</router-link>
              </li>
            </ul>
          </li>
          <li v-if="rol != 'administrador'" class="nav-item">
            <router-link class="nav-link" to="/nuevaPregunta">Crear pregunta</router-link>
          </li>
          <li v-if="rol == 'administrador'" class="nav-item">
            <router-link class="nav-link" to="/alumnos">Ver Alumnos</router-link>
          </li>
          <li v-if="rol == 'administrador' || rol == 'alumno'" class="nav-item">
            <router-link class="nav-link" to="/Examenes">Ver Examenes</router-link>
          </li>
        </ul>
        <div class="toggle-login">
          <select v-model="nuevoRol" @change="cambiarRol(nuevoRol)">
            <option value="invitado">Modo Invitado</option>
            <option value="administrador">Modo Administrador</option>
            <option value="alumno">Modo Alumno</option>
          </select>
          <select v-if="rol === 'alumno'" v-model="alumnoSeleccionado" @change="seleccionarAlumno">
            <option v-for="alumno in filtrarAlumnos" :key="alumno.id" :value="alumno">
              {{ alumno.nombre + " " + alumno.apellidos }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: var(--gradiente-navbar);
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}

.navbar-brand {
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-secundario);
}

.navbar-brand img {
  max-width: var(--ancho-max-logo);
  max-height: calc(var(--ancho-max-logo) * var(--proporcion-logo));
  margin-right: 0.5rem;
}

.navbar-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  margin: 0;
}

.nav-item {
  margin-left: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-secundario);
}

.nav-item:last-child {
  margin-right: 0;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--color-primario);
  text-decoration: none;
  transition: color var(--tiempo-transicion);
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.5),
    0 0 2px rgba(0, 0, 0, 0.3);
}

.nav-link:hover {
  color: inherit;
  text-shadow: 3px 3px 3px rgba(255, 255, 255, 0.8), -2px -2px 2px rgba(0, 0, 0, 0.5),
    0 0 4px rgba(0, 0, 0, 0.3);
}

.nav-link.active {
  color: transparent;
}

.toggle-login {
  position: absolute;
  right: 1.5em;
}

/* Para dispositivos pequeños */
@media (max-width: 767px) {
  .navbar {
    height: auto;
    position: sticky;
    padding: 1rem;
    z-index: 999;
  }

  .navbar-brand {
    font-size: 1.2rem;
  }

  .navbar-nav {
    flex-direction: column;
    margin-top: 1rem;
    height: auto;
  }

  .nav-item {
    margin-bottom: 1rem;
    margin-right: 0;
    text-align: center;
  }

  .toggle-login {
    margin-right: auto;
    margin-right: 0;
    margin-top: 1rem;
  }
}
</style>
