import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, isPrecargaReady } from "./api-service"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
    precarga: [],
    numPreguntasDefecto: 30,
    usuarioID: 1,
    nivelDificultad: "aleatorio",
  }),
  actions: {
    async generadorExamen(numeroPreguntas, usuario, nivelDificultad) {
      if (isPrecargaReady(this.precarga)) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        this.precargarExamenParams(numeroPreguntas, usuario, nivelDificultad)
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
    async precargarExamen() {
      await this.precargarExamenParams(
        this.numPreguntasDefecto,
        this.usuarioID,
        this.nivelDificultad
      )
    },
    async precargarExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      this.precarga = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
    },
  },
})
