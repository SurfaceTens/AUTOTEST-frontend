<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { preguntasStore } from "@/stores/preguntasStore"
import { eliminarPregunta } from "@/stores/api-service"
import FormularioPregunta from "./FormularioPregunta.vue"
import Modales from "@/components/Modales.vue"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    FormularioPregunta,
    Modales,
    Cargando,
  },
  data() {
    return {
      preguntaSeleccionada: null,
      modoEdicion: false,
      mostrarModal: false,
      cargandoPreguntas: true, // Muestra el estado de carga cuando la api no esta lista.
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
      this.modoEdicion = true
    },
    cerrarFormulario() {
      this.preguntaSeleccionada = null
      this.modoEdicion = false
    },
    borrarPregunta(pregunta) {
      this.preguntaSeleccionada = pregunta
      this.mostrarModal = true
    },
    getDificultadTexto(dificultad) {
      if (dificultad < 25) {
        return "Muy fácil"
      } else if (dificultad < 50) {
        return "Fácil"
      } else if (dificultad < 75) {
        return "Medio"
      } else if (dificultad < 100) {
        return "Difícil"
      } else {
        return "Muy difícil"
      }
    },
    async confirmarBorrarPregunta() {
      try {
        await eliminarPregunta(this.preguntaSeleccionada.id)
        const index = this.preguntas.findIndex((p) => p.id === this.preguntaSeleccionada.id)
        if (index !== -1) {
          this.preguntas.splice(index, 1)
        }
      } catch (error) {
        console.error("Error al borrar la pregunta:", error)
      }
      cerrarModal()
    },
    cerrarModal() {
      this.preguntaSeleccionada = null
      this.mostrarModal = false
    },
  },
  async created() {
    await this.getPreguntas()
    this.ordenarPreguntas()
    this.cargandoPreguntas = false
  },
}
</script>

<template>
  <div v-if="isAdmin">
    <Cargando v-if="cargandoPreguntas" />

    <div v-else-if="modoEdicion" class="container">
      <div class="card">
        <div class="card_content">
          <FormularioPregunta
            :preguntaForm="preguntaSeleccionada"
            :modoEdicion="modoEdicion"
            :titulo="`Editando pregunta ` + preguntaSeleccionada.id"
            @cerrar="cerrarFormulario"
          />
        </div>
      </div>
    </div>

    <table v-else class="listado-table">
      <thead>
        <tr>
          <th>Tematica</th>
          <th>Dificultad</th>
          <th>Enunciado</th>
          <th>Adjunto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pregunta in preguntas" :key="pregunta.id">
          <td>{{ pregunta.tematica }}</td>
          <td>{{ getDificultadTexto(pregunta.dificultad) }}</td>
          <td>{{ pregunta.enunciado }}</td>
          <td>{{ pregunta.adjunto }}</td>
          <td>
            <button class="btn btn-primary" @click="mostrarPregunta(pregunta)">Editar</button>

            <button class="btn btn-danger" @click="borrarPregunta(pregunta)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Confirmacion-->
    <Modales
      v-if="mostrarModal"
      :modalTipo="'borrar'"
      @borrar="confirmarBorrarPregunta"
      @cerrarModal="cerrarModal"
    />
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de preguntas</h1>
  </div>
</template>
