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
      modoEdicion: false,
      mostrarModalBorrado: false,
      mostrarModalEditar: false,
      cargandoPreguntas: true,
    }
  },
  computed: {
    ...mapState(loginStore, ["isAdmin"]),
    ...mapState(preguntasStore, ["preguntas", "preguntaSeleccionada"]),
    pregunta() {
      return this.preguntas.find((p) => p.id == this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(preguntasStore, [
      "cargarPreguntas",
      "setPreguntas",
      "getPreguntaPorId",
      "getDificultadTexto",
    ]),

    async mostrarPregunta(pregunta) {
      this.preguntaSeleccionada = await this.getPreguntaPorId(pregunta.id)
      this.modoEdicion = true
    },

    cerrarFormulario() {
      this.modoEdicion = false
    },
    cerrarPreguntasExamen() {
      this.$emit("cerrar")
    },
    borrarPregunta(pregunta) {
      this.preguntaSeleccionada = pregunta
      this.mostrarModalBorrado = true
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
      } catch (error) {}
      await this.cargarPreguntas()
      this.cargandoPreguntas = false
      this.cerrarModalBorrar()
    },
    async confirmarEditarPregunta() {
      this.cargandoPreguntas = true
      this.mostrarModalEditar = true
      await this.cargarPreguntas()
      this.cargandoPreguntas = false
    },
    cerrarModalBorrar() {
      this.mostrarModalBorrado = false
    },
    cerrarModalEditar() {
      this.mostrarModalEditar = false
    },
    async iniciarPreguntas() {
      if (this.sonDeExamen) {
        const respuesta = await getPreguntasExamen(this.examenID)
        this.preguntas = this.setPreguntas(respuesta.data._embedded.preguntaExamenModels)
      } else {
        await this.cargarPreguntas()
      }
      this.cargandoPreguntas = false
    },
  },
  async created() {
    this.iniciarPreguntas()
  },
}
</script>

<template>
  <div>
    <Cargando v-if="cargandoPreguntas" />

    <div v-else-if="modoEdicion" class="container">
      <div class="card">
        <div class="card_content">
          <FormularioPregunta
            :preguntaForm="this.preguntaSeleccionada"
            :modoEdicion="modoEdicion"
            :titulo="`Editando pregunta ` + this.preguntaSeleccionada.id"
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
          <th v-if="sonDeExamen">Acertada</th>
          <th v-if="!sonDeExamen">Dificultad</th>
          <th>Enunciado</th>
          <th v-if="sonDeExamen">Correcta</th>
          <th v-if="sonDeExamen">Marcada</th>
          <th>
            Acciones
            <button v-if="sonDeExamen" class="btn btn-sm btn-link" @click="cerrarPreguntasExamen">
              <i class="fas fa-right-from-bracket"></i>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pregunta, numero) in preguntas"
          :key="pregunta.id"
          :class="{
            'fila-incorrecta': !pregunta.acertada && sonDeExamen,
            'no-clickable': !pregunta.acertada && sonDeExamen,
          }"
        >
          <td>{{ numero + 1 }}</td>
          <td v-if="sonDeExamen">{{ mostrarAcierto(pregunta.acertada) }}</td>
          <td v-if="!sonDeExamen">{{ this.getDificultadTexto(pregunta.dificultad) }}</td>
          <td>{{ pregunta.enunciado }}</td>
          <td v-if="sonDeExamen">{{ pregunta.correcta }}</td>
          <td v-if="sonDeExamen">{{ pregunta.respuesta }}</td>
          <td>
            <button v-if="!sonDeExamen" class="btn btn-primary" @click="mostrarPregunta(pregunta)">
              Editar
            </button>

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
</template>

<style>
.fila-incorrecta {
  background-color: rgba(255, 0, 0, 0.15);
}
.no-clickable {
  pointer-events: none;
}
</style>
