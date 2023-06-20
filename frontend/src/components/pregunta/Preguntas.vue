<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { preguntasStore } from "@/stores/preguntasStore"
import nuevaPregunta from "@/components/pregunta/NuevaPregunta.vue"

export default {
  components: {
    nuevaPregunta,
  },
  computed: {
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(preguntasStore, ["preguntas"]),
    pregunta() {
      return this.preguntas.find((p) => p.id == this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(preguntasStore, ["getPreguntas", "getPreguntaPorId", "editarPregunta"]),
    ordenarPreguntas() {
      this.preguntas.sort((a, b) => a.id - b.id)
    },
  },
  async created() {
    await this.getPreguntas()
    this.ordenarPreguntas()
  },
}
</script>

<template>
  <div v-if="isAdmin">
    <table class="listado-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Enunciado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pregunta in preguntas" :key="pregunta.id">
          <td>{{ pregunta.id }}</td>
          <td>{{ pregunta.enunciado }}</td>
          <td>
            <!-- Aquí se colocan los botones para cada acción -->
            <button class="btn btn-primary">Editar</button>

            <button class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de preguntas</h1>
  </div>
</template>
