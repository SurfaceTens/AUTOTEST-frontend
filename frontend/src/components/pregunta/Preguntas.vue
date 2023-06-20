<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { preguntasStore } from "@/stores/preguntasStore"
import { eliminarPregunta } from "@/stores/api-service"
import FormularioPregunta from "./FormularioPregunta.vue"

export default {
  components: {
    FormularioPregunta,
  },
  data() {
    return {
      preguntaSeleccionada: null,
    }
  },
  computed: {
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(preguntasStore, ["preguntas"]),
    pregunta() {
      return this.preguntas.find((p) => p.id == this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(preguntasStore, ["getPreguntas", "getPreguntaPorId"]),
    ordenarPreguntas() {
      this.preguntas.sort((a, b) => a.id - b.id)
    },
    mostrarPregunta(pregunta) {
      this.preguntaSeleccionada = pregunta
    },
    ocultarPregunta(pregunta) {
      this.preguntaSeleccionada = null
    },
    borrarPregunta(pregunta) {
      eliminarPregunta(pregunta)
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
    <div v-if="preguntaSeleccionada" class="container">
    <div class="card">
      <div class="card_content">
        <FormularioPregunta :preguntaForm="preguntaSeleccionada" :modoEdicion="true" :titulo="`Editando pregunta ` + preguntaSeleccionada.id" />
      </div>
    </div>
  </div>
    <table v-else class="listado-table">
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
            <button class="btn btn-primary" @click="mostrarPregunta(pregunta)">Editar</button>

            <button class="btn btn-danger" @click="borrarPregunta(pregunta)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de preguntas</h1>
  </div>
</template>
