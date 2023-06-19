<script>
import { mapActions, mapState } from "pinia"
import { examenStore } from "@/stores/examenStore"
import Pregunta from "@/components/pregunta/Pregunta.vue"
import FinExamen from "@/components/examen/FinExamen.vue"

export default {
  components: {
    Pregunta,
    FinExamen,
  },
  data() {
    return {
      numPreguntas: 30, // Numero de preguntas que debe tener el examen.
      umbralApto: 90, // Porcentaje con el que se aprueba el examen.
      examenTerminado: false, // Variable para controlar el estado del examen.
      preguntasExamen: [], // Array para almacenar las preguntas del examen mientras estan en uso.
      respuestasExamen: [], // Array para almacenar las respuestas del examen.
      tituloExamen: `Lee detenidamente las preguntas y escoge la opción más adecuada.`, // Título del examen.
      notaExamen: "", // Nota del examen.
      mostrarModal: false, // Controlar la visibilidad de FinExamen.
    }
  },
  computed: {
    ...mapState(examenStore, ["preguntas"]),
    preguntasTratadas() {
      return this.randomizarYLimitarPreguntas(this.preguntas)
    },
    pregunta() {
      return this.preguntas.find((p) => p.id === this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(examenStore, ["generadorExamen", "desordenarArray"]),

    randomizarYLimitarPreguntas(preguntas) {
      const totalPreguntas = preguntas.length
      const cantidadFactible = Math.min(totalPreguntas, this.numPreguntas)
      const preguntasDesorden = this.desordenarArray(preguntas)

      // Reiniciar respuestas de preguntas anteriores
      preguntasDesorden.forEach((pregunta) => {
        pregunta.respuesta = null
      })

      return preguntasDesorden.slice(0, cantidadFactible)
    },

    seleccionarOpcion(pregunta, opcion) {
      pregunta.respuesta = opcion
    },

    guardarRespuestas() {
      this.respuestasExamen = this.preguntasTratadas.map((pregunta) => {
        return {
          id: pregunta.id,
          respuesta: pregunta.respuesta,
        }
      })
    },

    terminarExamen() {
      this.mostrarModal = true
    },

    aceptarExamen() {
      this.guardarRespuestas()
      this.mostrarRespuestas()
      this.calcularPuntuacion()
      this.examenTerminado = true
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    cerrarModal() {
      this.mostrarModal = false
    },

    mostrarRespuestas() {
      this.preguntasTratadas.forEach((pregunta) => {
        pregunta.respuestaCorrecta = pregunta.respuesta === pregunta.correcta
        pregunta.respuestaIncorrecta =
          pregunta.respuesta && pregunta.respuesta !== pregunta.correcta
      })
    },

    getRespuestaSeleccionada(preguntaId) {
      const respuesta = this.respuestasExamen.find((respuesta) => respuesta.id === preguntaId)
      return respuesta ? respuesta.respuesta : ""
    },

    calcularPuntuacion() {
      let acertadas = 0
      this.respuestasExamen.forEach((respuesta) => {
        const pregunta = this.preguntasTratadas.find((pregunta) => pregunta.id === respuesta.id)
        if (pregunta) {
          if (respuesta.respuesta === pregunta.correcta) {
            acertadas++
          }
        }
      })

      const totalPreguntas = this.preguntasTratadas.length
      const porcentajeAciertos = (acertadas / totalPreguntas) * 100
      let resultado

      if (porcentajeAciertos >= this.umbralApto) {
        resultado = "APTO"
      } else {
        resultado = "NO APTO"
      }

      this.tituloExamen = `Revisión del examen.`
      this.notaExamen = [acertadas, resultado]
    },

    generarNuevoExamen() {
      this.preguntasTratadas = this.randomizarYLimitarPreguntas(this.generadorExamen(5,1))
      this.respuestasExamen = []
      this.tituloExamen = `Lee detenidamente las preguntas y escoge la opción más adecuada.`
      this.examenTerminado = false
      this.notaExamen = []
      window.scrollTo({ top: 0, behavior: "smooth" })
    },
  },
  async created() {
    await this.generadorExamen(5,1)
  },
}
</script>

<template>
  <div class="area-examen">
    <!-- Versión resoluble del examen -->
    <div v-if="!examenTerminado">
      <h1>{{ tituloExamen }}</h1>
      <ul>
        <li v-for="(pregunta, index) in preguntasTratadas" :key="pregunta.id">
          <Pregunta
            :pregunta="pregunta"
            :numero="index + 1"
            @opcionSeleccionada="seleccionarOpcion(pregunta, $event)"
            :respuestaCorrecta="pregunta.respuestaCorrecta"
            :respuestaIncorrecta="pregunta.respuestaIncorrecta"
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
      <div class="fin-examen">
        <button @click="terminarExamen" class="btn btn-primary btn-lg">Terminar</button>
      </div>

      <!-- Modal FinExamen A-->
      <FinExamen
        v-if="mostrarModal"
        :nota="notaExamen"
        :modalB="false"
        @aceptarExamen="aceptarExamen"
        @cerrarModal="cerrarModal"
      />
    </div>

    <!-- Versión del examen con respuestas resaltadas -->
    <div v-else>
      <h1>{{ tituloExamen }}</h1>
      <ul>
        <li v-for="(pregunta, index) in preguntasTratadas" :key="pregunta.id">
          <Pregunta
            :pregunta="pregunta"
            :numero="index + 1"
            :desorden="false"
            :respuestaCorrecta="pregunta.correcta"
            :respuestaSeleccionada="getRespuestaSeleccionada(pregunta.id)"
          />
        </li>
      </ul>
      <div class="fin-examen">
        <button @click="generarNuevoExamen(), cerrarModal()" class="btn btn-success btn-lg">
          Hacer Otro
        </button>
      </div>

      <!-- Modal FinExamen B-->
      <FinExamen
        v-if="mostrarModal"
        :nota="notaExamen"
        :modalB="true"
        @generarNuevoExamen="generarNuevoExamen"
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