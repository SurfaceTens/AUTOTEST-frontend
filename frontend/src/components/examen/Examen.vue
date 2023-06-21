<script>
import { mapActions, mapState } from "pinia"
import { examenStore } from "@/stores/examenStore"
import Pregunta from "@/components/examen/PreguntaExamen.vue"
import Modales from "@/components/Modales.vue"
import Cargando from "@/components/Cargando.vue"

export default {
  components: {
    Pregunta,
    Modales,
    Cargando,
  },
  data() {
    return {
      numPreguntas: 30, // Numero de preguntas que debe tener el examen.
      umbralApto: 90, // Porcentaje con el que se aprueba el examen.
      examenTerminado: false, // Variable para controlar el estado del examen.
      tituloExamen: "", // Título del examen.
      notaExamen: [], // Nota del examen.
      cargandoExamen: true, // Muestra el estado de carga cuando la api no esta lista.
      mostrarModal: false, // Controlar la visibilidad de FinExamen.
    }
  },
  computed: {
    ...mapState(examenStore, ["preguntas"]),
    pregunta() {
      return this.preguntas.find((p) => p.id === this.$route.params.id)
    },
  },
  methods: {
    ...mapActions(examenStore, ["generadorExamen", "desordenarArray", "corregirPregunta"]),

    randomizarYLimitarPreguntas(preguntas) {
      const totalPreguntas = preguntas.length
      const cantidadFactible = Math.min(totalPreguntas, this.numPreguntas)

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
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    cerrarModal() {
      this.mostrarModal = false
    },

    mostrarRespuestas() {
      this.preguntas.forEach((pregunta) => {
        pregunta.acertada = pregunta.respuesta === pregunta.correcta
      })
    },

    async generarExamen(numeroPreguntas, idAlumno) {
      await this.generadorExamen(numeroPreguntas, idAlumno)
    },

    async generarNuevoExamen() {
      this.cargandoExamen = true
      await this.generarExamen(this.numPreguntas, 1)
      this.cargandoExamen = false
      this.preguntas = this.randomizarYLimitarPreguntas(this.preguntas)
      this.respuestasExamen = []
      this.tituloExamen = `Lee detenidamente las preguntas y escoge la opción más adecuada`
      this.examenTerminado = false
      this.notaExamen = []
      window.scrollTo({ top: 0, behavior: "smooth" })
    },

    reiniciarRespuestas(preguntas) {
      const preguntasReiniciadas = preguntas
      preguntasReiniciadas.forEach((pregunta) => {
        pregunta.respuesta = null
      })
      return preguntasReiniciadas
    },

    corregirExamen() {
      let acertadas = 0
      this.preguntas.forEach((pregunta) => {
        if (pregunta.respuesta === pregunta.correcta) {
          acertadas++
        }
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
    },
  },
  async created() {
    await this.generarNuevoExamen()
    this.cargandoExamen = false
  },
}
</script>

<template>
  <div class="area-examen">
    <!-- Mostrar aviso de carga -->
    <div v-if="cargandoExamen">
      <Cargando/>
    </div>

    <!-- Versión resoluble del examen -->
    <div v-else-if="!examenTerminado">
      <h1>{{ tituloExamen }}</h1>
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
      <div class="fin-examen">
        <button @click="terminarExamen" class="btn btn-primary btn-lg">Terminar</button>
      </div>

      <!-- Modal finExamen -->
      <Modales
        v-if="mostrarModal"
        :nota="notaExamen"
        :modalTipo="'finExamen'"
        @aceptarExamen="aceptarExamen"
        @cerrarModal="cerrarModal"
      />
    </div>

    <!-- Versión del examen con respuestas resaltadas -->
    <div v-else-if="examenTerminado">
      <h1>{{ tituloExamen }}</h1>
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
      <div class="fin-examen">
        <button @click="generarNuevoExamen(), cerrarModal()" class="btn btn-success btn-lg">
          Hacer Otro
        </button>
      </div>

      <!-- Modal revisarExamen -->
      <Modales
        v-if="mostrarModal"
        :nota="notaExamen"
        :modalTipo="'revisarExamen'"
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
