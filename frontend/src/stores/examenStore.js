import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, isPrecargaReady, getExamenes } from "./api-service"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
    examenes: [],

    numPreguntasDefecto: 30,
    usuarioID: 1,
    nivelDificultad: "aleatorio",
  }),
  actions: {
    async corregirPregunta(pregunta) {
      await corregirPreguntaExamen(pregunta)
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
    setNivelDificultad(nivelDificultad) {
      this.nivelDificultad = nivelDificultad
    },

    injectarDificultadExamen(nivelDificultad) {
      this.preguntas = []
      this.precargaPreguntas = []
      this.nivelDificultad = nivelDificultad
      this.cargarExamen()
    },

    async cargarExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      this.preguntas = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
    },

    cargarExamen() {
      this.cargarExamenParams(this.numPreguntasDefecto, this.usuarioID, this.nivelDificultad)
    },

    getExamenPorId(id) {
      return this.examenes.find((p) => p.id == id)
    },

    async forzarCargarExamenes() {
      this.examenes = await getExamenes()
    },
    async cargarExamenes() {
      if (this.examenes.size == 0) {
        forzarCargarExamenes()
      }
    },
  },
})
