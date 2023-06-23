<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { examenPasadoStore } from "@/stores/examenPasadoStore"

export default {
  computed: {
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(examenPasadoStore, ["examenes"]),
  },
  methods: {
    ...mapActions(examenPasadoStore, ["getExamenes"]),
  },
  created() {
    this.getExamenes()
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
        <tr v-for="examen in examenes" :key="examen.nombreExamen">
          <td>{{ examen.id }}</td>
          <td>{{ examen.numExamenes }}</td>
          <td>{{ examen.nota }}</td>
          <td>
            <button class="btn btn-primary">Ver Preguntas</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- <div v-else> -->
  <div v-if="false">
    <h1>No se dispone de los permisos para visualizar el listado de examenes</h1>
  </div>
</template>
