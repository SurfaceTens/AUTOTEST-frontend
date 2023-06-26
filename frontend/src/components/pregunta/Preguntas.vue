<script>
import { mapActions, mapState } from "pinia"
import { loginStore } from "@/stores/loginStore"
import { preguntasStore } from "@/stores/preguntasStore"
import { eliminarPregunta, getPreguntasExamen } from "@/stores/api-service"
import FormularioPregunta from "@/components/pregunta/FormularioPregunta.vue"
import ConfirmarBorrar from "@/components/modales/ConfirmarBorrar.vue"
import ConfirmarEditar from "@/components/modales/ConfirmarEditar.vue"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    FormularioPregunta,
    ConfirmarBorrar,
    ConfirmarEditar,
    Cargando,
  },
  props: {
    sonDeExamen: {
      type: Boolean,
      default: false,
    },
    examenID: null,
  },
  data() {
    return {
      preguntaSeleccionada: null,
      modoEdicion: false,
      mostrarModalBorrado: false,
      mostrarModalEditar: false,
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
    ...mapActions(preguntasStore, ["getPreguntas", "setPreguntas", "getPreguntaPorId"]),
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
    cerrarPreguntasExamen() {
      this.$emit("cerrar")
    },
    borrarPregunta(pregunta) {
      this.preguntaSeleccionada = pregunta
      this.mostrarModalBorrado = true
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
    mostrarAcierto(acierto) {
      if (acierto) {
        return "\u25CB"
      } else return ""
    },
    async confirmarBorrarPregunta() {
      this.cargandoPreguntas = true
      try {
        await eliminarPregunta(this.preguntaSeleccionada.id)
        const index = this.preguntas.findIndex((p) => p.id === this.preguntaSeleccionada.id)
        if (index !== -1) {
          this.preguntas.splice(index, 1)
        }
      } catch (error) {
        console.error("Error al borrar la pregunta:", error)
      }
      this.cargandoPreguntas = false
      this.cerrarModalBorrar()
    },
    confirmarEditarPregunta() {
      this.mostrarModalEditar = true
    },
    cerrarModalBorrar() {
      this.preguntaSeleccionada = null
      this.mostrarModalBorrado = false
    },
    cerrarModalEditar() {
      this.preguntaSeleccionada = null
      this.mostrarModalEditar = false
    },
    async iniciarPreguntas() {
    if (this.sonDeExamen) {
      const respuesta = await getPreguntasExamen(this.examenID)
      this.preguntas = this.setPreguntas(respuesta.data._embedded.preguntaExamenModels)
      console.log(this.preguntas)
    } else {
      await this.getPreguntas()
    }
    this.ordenarPreguntas()
    this.cargandoPreguntas = false
  },
  },
  async created() {
    this.iniciarPreguntas()
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
            @confirmar="confirmarEditarPregunta"
          />
        </div>
      </div>
    </div>

    <table v-else class="listado-table">
      <thead>
        <tr>
          <th>Nº</th>
          <th>Acetada</th>
          <th>Dificultad</th>
          <th>Enunciado</th>
          <th>Correcta</th>
          <th>
            Acciones
            <router-link to="/NuevaPregunta">
              <button v-if="!sonDeExamen" class="btn btn-sm btn-link">
                <i class="fas fa-plus-square"></i>
              </button>
            </router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pregunta, numero) in this.preguntas" :key="pregunta.id">
          <td>{{ numero + 1 }}</td>
          <td>{{ mostrarAcierto(pregunta.acertada) }}</td>
          <td>{{ getDificultadTexto(pregunta.dificultad) }}</td>
          <td>{{ pregunta.enunciado }}</td>
          <td>{{ pregunta.correcta }}</td>
          <td>
            <button class="btn btn-primary" @click="mostrarPregunta(pregunta)">Editar</button>

            <button v-if="!sonDeExamen" class="btn btn-danger" @click="borrarPregunta(pregunta)">
              Eliminar
            </button>
          </td>
        </tr>
        <button v-if="sonDeExamen" class="btn btn-secondary" @click="cerrarPreguntasExamen">
          Cerrar
        </button>
      </tbody>
    </table>

    <!-- Modales Confirmacion-->
    <ConfirmarBorrar
      v-if="mostrarModalBorrado"
      @borrar="confirmarBorrarPregunta"
      @cerrarModal="cerrarModalBorrar"
    />
    <ConfirmarEditar v-if="mostrarModalEditar" @cerrarModal="cerrarModalEditar" />
  </div>

  <div v-else>
    <h1>No se dispone de los permisos para visualizar el listado de preguntas</h1>
  </div>
</template>
