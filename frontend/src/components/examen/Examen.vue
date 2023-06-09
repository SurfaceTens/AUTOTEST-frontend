<script>
import { mapActions, mapState } from "pinia"
import { examenStore } from "@/stores/examenStore"
import Pregunta from "@/components/examen/PreguntaExamen.vue"
import FinExamen from "@/components/modales/FinExamen.vue"
import CambiarDificultad from "@/components/modales/CambiarDificultad.vue"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    Pregunta,
    FinExamen,
    CambiarDificultad,
    Cargando,
  },
  data() {
    return {
      umbralApto: 90, // Porcentaje con el que se aprueba el examen.
      examenTerminado: false, // Variable para controlar el estado del examen.
      tituloExamen: "Lee detenidamente las preguntas y escoge la opción más adecuada",
      notaExamen: [], // Nota del examen que recibe el modal.
      mostrarModal: false, // Controlar la visibilidad de FinExamen.
      cambioDificultad: false, // Controlar la visibilidad de Cambiar dificultad.
      cargando: false, // Se necesita por la naturaleza de esta peticion.
    }
  },
  computed: {
    ...mapState(examenStore, ["preguntas", "nivelDificultad", "numPreguntasDefecto"]),
    pregunta() {
      return this.preguntas.find((p) => p.id === this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(examenStore, [
      "desordenarArray",
      "setNivelDificultad",
      "corregirPregunta",
      "editarExamen",
      "cargarExamen",
      "prepararExamen",
      "injectarDificultadExamen",
    ]),

    randomizarYLimitarPreguntas(preguntas) {
      const totalPreguntas = preguntas.length
      const cantidadFactible = Math.min(totalPreguntas, this.numPreguntasDefecto)

      const preguntasDesorden = this.desordenarArray(preguntas)
      const preguntasReiniciadas = this.reiniciarRespuestas(preguntasDesorden)

      return preguntasReiniciadas.slice(0, cantidadFactible)
    },

    seleccionarOpcion(pregunta, opcion) {
      pregunta.respuesta = opcion
    },

    terminarExamen() {
      this.mostrarModal = true
    },

    aceptarExamen() {
      this.mostrarRespuestas()
      this.corregirExamen()
      this.examenTerminado = true
      this.prepararExamen()
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    cerrarModal() {
      this.mostrarModal = false
      this.cambioDificultad = false
    },

    mostrarRespuestas() {
      this.preguntas.forEach((pregunta) => {
        pregunta.acertada = pregunta.respuesta === pregunta.correcta
      })
    },

    resetearExamen() {
      this.preguntas = this.randomizarYLimitarPreguntas(this.preguntas)
      this.respuestasExamen = []
      this.tituloExamen = `Lee detenidamente las preguntas y escoge la opción más adecuada`
      this.examenTerminado = false
      this.notaExamen = []
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    async generarNuevoExamen(nivelDificultad) {
      this.cargando = true
      await this.injectarDificultadExamen(nivelDificultad)
      this.cargando = false
      this.resetearExamen()
    },

    generarNuevoExamen() {
      this.cargarExamen()
      this.resetearExamen()
    },

    reiniciarRespuestas(preguntas) {
      const preguntasReiniciadas = preguntas
      preguntasReiniciadas.forEach((pregunta) => {
        pregunta.respuesta = null
      })
      return preguntasReiniciadas
    },

    mostrarCambiarDificultad() {
      this.cambioDificultad = true
    },

    cambiarDificultad(nuevaDificultad) {
      this.setNivelDificultad(nuevaDificultad)
      this.generarNuevoExamen(nuevaDificultad)
      this.cerrarModal()
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    getExamenID(pregunta) {
      let retorno = 0
      const examenURL = pregunta._links.examen.href
      const examenIDRegex = /\/(\d+)$/
      const match = examenURL.match(examenIDRegex)

      if (match && match.length > 1) {
        retorno = parseInt(match[1])
      }
      return retorno
    },

    corregirExamen() {
      let acertadas = 0
      let falladas = 0
      let examenID = 0
      this.preguntas.forEach((pregunta) => {
        if (pregunta.respuesta === pregunta.correcta) {
          acertadas++
        } else if (pregunta.respuesta) {
          falladas++
        }
        examenID = this.getExamenID(pregunta)
        this.corregirPregunta(pregunta)
      })

      const totalPreguntas = this.preguntas.length
      const porcentajeAciertos = (acertadas / totalPreguntas) * 100
      let resultado

      if (porcentajeAciertos >= this.umbralApto) {
        resultado = "APTO"
      } else {
        resultado = "NO APTO"
      }

      this.tituloExamen = `Revisión del examen`
      this.notaExamen = [acertadas, resultado]

      const examenObjeto = {
        id: examenID,
        entregado: true,
        aciertos: acertadas,
        fallos: falladas,
        nota: resultado,
        alumnoID: 0,
        alumnoDatos: "",
        numPreguntas: this.numPreguntasDefecto,
      }
      this.editarExamen(examenObjeto)
    },
  },
  async created() {
    await this.cargarExamen()
  },
}
</script>

<template>
  <div class="area-examen">
    <Cargando v-if="cargando" />
    <!-- Versión resoluble del examen -->
    <div v-if="!examenTerminado">
      <h1 v-if="!cargando">{{ tituloExamen }}</h1>
      <ul>
        <li v-for="(pregunta, index) in this.preguntas" :key="pregunta.id">
          <Pregunta
            :pregunta="pregunta"
            :numero="index + 1"
            @opcionSeleccionada="seleccionarOpcion(pregunta, $event)"
          />
          <b-button-group size="sm" vertical>
            <b-button
              v-for="opcion in pregunta.opciones"
              :key="opcion.id"
              @click="seleccionarOpcion(pregunta, opcion.id)"
              :class="{
                'btn-primary': pregunta.respuesta === opcion.id,
                'btn-outline-primary': pregunta.respuesta !== opcion.id,
              }"
            >
              {{ opcion.texto }}
            </b-button>
          </b-button-group>
        </li>
      </ul>
      <div v-if="!cargando" class="fin-examen">
        <button @click="terminarExamen" class="btn btn-primary btn-lg">Terminar</button>
      </div>

      <!-- Modal finExamen -->
      <FinExamen
        v-if="mostrarModal"
        :nota="notaExamen"
        :modalTipo="'finExamen'"
        @aceptarExamen="aceptarExamen"
        @cerrarModal="cerrarModal"
      />
    </div>

    <!-- Versión del examen con respuestas resaltadas -->
    <div v-else-if="examenTerminado">
      <h1 v-if="!cargando">{{ tituloExamen }}</h1>
      <ul>
        <li v-for="(pregunta, index) in this.preguntas" :key="pregunta.id">
          <Pregunta
            :pregunta="pregunta"
            :numero="index + 1"
            :desorden="false"
            :terminado="examenTerminado"
            :respuestaSeleccionada="pregunta.respuesta"
          />
        </li>
      </ul>
      <div v-if="!cargando" class="fin-examen">
        <button
          @click="generarNuevoExamen(), cerrarModal()"
          class="btn btn-success btn-lg"
        >
          Hacer Otro {{ this.nivelDificultad }}
        </button>
        <button @click="mostrarCambiarDificultad" class="btn btn-secondary btn-lg">
          Escoger dificultad
        </button>
      </div>

      <!-- Cambio de dificultad -->
      <CambiarDificultad
        v-if="cambioDificultad"
        @cambiarDificultad="cambiarDificultad"
        @cerrar="cerrarModal"
      />

      <!-- Modal revisarExamen -->
      <FinExamen
        v-if="mostrarModal"
        :nota="notaExamen"
        :modalTipo="'revisarExamen'"
        @generarNuevoExamen="generarNuevoExamen()"
        @cerrarModal="cerrarModal"
      />
    </div>
  </div>
</template>

<style scoped>
.area-examen {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

ul {
  list-style: none;
}

.fin-examen {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
