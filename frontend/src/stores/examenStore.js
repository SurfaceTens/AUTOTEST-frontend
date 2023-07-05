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

    async injectarDificultadExamen(nivelDificultad) {
      this.preguntas = []
      this.precargaPreguntas = []
      this.nivelDificultad = nivelDificultad
      await this.cargarExamen()
    },

    async cargarExamen() {
      if (isPrecargaReady(this.precargaPreguntas)) {
        this.preguntas = this.precargaPreguntas
        this.precargaPreguntas = []
      } else {
        await this.precargarExamen()
        this.preguntas = this.precargaPreguntas
        this.precargaPreguntas = []
      }
    },

    async precargarExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      if (!isPrecargaReady(this.precargaPreguntas)) {
        this.precargaPreguntas = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
      }
    },

    async precargarExamen() {
      await this.precargarExamenParams(
        this.numPreguntasDefecto,
        this.usuarioID,
        this.nivelDificultad
      )
    },

    getExamenPorId(id) {
      return this.examenes.find((p) => p.id == id)
    },

    async cargarExamenes() {
      if (isPrecargaReady(this.precargaExamenes)) {
        this.examenes = this.precargaExamenes
        this.precargaExamenes = []
      } else {
        await this.precargarExamenes()
        this.examenes = this.precargaExamenes
        this.precargaExamenes = []
      }
    },

    async precargarExamenes() {
      if (!isPrecargaReady(this.precargaExamenes)) {
        this.precargaExamenes = await getExamenes()
      }
    },
  },
})
