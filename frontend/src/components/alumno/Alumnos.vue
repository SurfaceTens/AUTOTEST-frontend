<script>
import { mapState } from "pinia"
import { alumnosStore } from "@/stores/alumnosStore"

export default {
  computed: {
    ...mapState(alumnosStore, ["alumnos"]),
  },
}
</script>

<template>
  <div>
    <table class="listado-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.nombreAlumno">
          <td>{{ alumno.nombre }}</td>
          <td>{{ alumno.apellidos }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
