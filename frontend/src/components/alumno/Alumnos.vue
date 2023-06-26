<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { alumnosStore } from "@/stores/alumnosStore"

export default {
  computed: {
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(alumnosStore, ["alumnos"]),
  },
  methods: {
    ...mapActions(alumnosStore, ["getAlumnos"]),
  },
  created() {
    this.getAlumnos()
  },
}
</script>

<template>
  <div v-if="isAdmin">
    <table class="listado-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>
            Acciones
            <router-link to="/NuevoAlumno">
              <button class="btn btn-sm btn-link">
                <i class="fas fa-plus-square"></i>
              </button>
            </router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.nombreAlumno">
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.apellidos }}</td>
          <td>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de alumnos</h1>
  </div>
</template>
