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
  <!-- <div v-if="isAdmin"> -->
  <div>
    <table class="listado-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Preguntas</th>
          <th>Nota</th>
          <th>Acciones</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.nombreAlumno">
          <td>{{ alumno.id }}</td>
          <td>{{ alumno.numExamenes }}</td>
          <td>{{ alumno }}</td>
          <td>
            <button class="btn btn-primary">Editar</button>
            <button class="btn btn-danger">Eliminar</button>  
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- <div v-else> -->
  <div v-if="false">
    <h1>No se dispone de los permisos para visualizar el listado de alumnos</h1>
  </div>
</template>
