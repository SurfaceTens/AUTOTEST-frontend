import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen } from "./api-service"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
    precarga: [],
    numPreguntasDefecto: 30,
    usuarioDefecto: 1,
    nivelDificultad: "aleatorio",
  }),
  actions: {
    async generadorExamen(numeroPreguntas, usuario, nivelDificultad) {
      if (this.isPrecargaReady()) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        this.preguntas = (
          await crearExamen(numeroPreguntas, usuario, nivelDificultad)
        ).data._embedded.preguntaExamenModels
      }
    },
    async corregirPregunta(pregunta) {
      await corregirPreguntaExamen(pregunta.id, pregunta)
    },
    desordenarArray(array) {
      // Algoritmo de Fisher-Yates para desordenar el array
      let indiceActual = array.length
      let valorTemporal, numAleatorio

      while (indiceActual !== 0) {
        numAleatorio = Math.floor(Math.random() * indiceActual)
        indiceActual--

        valorTemporal = array[indiceActual]
        array[indiceActual] = array[numAleatorio]
        array[numAleatorio] = valorTemporal
      }
      return array
    },
    getNivelDificultad() {
      return this.nivelDificultad
    },
    setNivelDificultad(nivelDificultad) {
      this.nivelDificultad = nivelDificultad
    },
    isPrecargaReady() {
      if (this.precarga.length !== 0) {
        return true
      } else {
        return false
      }
    },
    async precargarExamen() {
      this.precarga = (
        await crearExamen(this.numPreguntasDefecto, this.usuarioDefecto, this.nivelDificultad)
      ).data._embedded.preguntaExamenModels
    },
    async precargarExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      this.precarga = (
        await crearExamen(numeroPreguntas, usuario, nivelDificultad)
      ).data._embedded.preguntaExamenModels
    },
  },
})
