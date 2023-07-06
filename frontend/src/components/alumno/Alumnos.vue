<script>
import { mapState } from "pinia"
import { alumnosStore } from "@/stores/alumnosStore"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    Cargando,
  },
  computed: {
    ...mapState(alumnosStore, ["alumnos", "alumnosCargados"]),
  },
}
</script>

<template>
  <div>
    <Cargando v-if="!alumnosCargados" />
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
