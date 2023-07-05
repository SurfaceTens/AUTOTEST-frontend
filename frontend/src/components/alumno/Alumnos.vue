<script>
import { mapActions, mapState } from "pinia"
import { alumnosStore } from "@/stores/alumnosStore"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    Cargando,
  },
  data() {
    return {
      cargando: true, // Muestra el estado de carga cuando la api no esta lista.
    }
  },
  computed: {
    ...mapState(alumnosStore, ["alumnos"]),
  },
  methods: {
    ...mapActions(alumnosStore, ["cargarAlumnos"]),
  },
  async created() {
    await this.cargarAlumnos()
    this.cargando = false
  },
}
</script>

<template>
  <div>
    <Cargando v-if="cargando" />
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
