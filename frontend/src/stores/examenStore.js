import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, isPrecargaReady, getExamenes } from "./api-service"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
    precargaPreguntas: [],
    examenes: [],
    precargaExamenes: [],
    numPreguntasDefecto: 30,
    usuarioID: 1,
    nivelDificultad: "aleatorio",
  }),
  actions: {
    async generadorExamen(numeroPreguntas, usuario, nivelDificultad) {
      if (isPrecargaReady(this.precargaPreguntas)) {
        this.preguntas = this.precargaPreguntas
        this.precargaPreguntas = []
      } else {
        this.precargarExamenParams(numeroPreguntas, usuario, nivelDificultad)
      }
    },
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
      this.precargaPreguntas = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
    },
    getExamenPorId(id) {
      return this.examenes.find((p) => p.id == id)
    },
    async cargarExamenes() {
      if (isPrecargaReady(this.precargaExamenes)) {
        this.examenes = this.precargaExamenes
        this.precargaExamenes = []
      } else {
        this.precargarExamenes()
        this.examenes = this.precargaExamenes
      }
    },
    async precargarExamenes() {
      this.precargaExamenes = this.examenes = await getExamenes()
    },
  },
})
