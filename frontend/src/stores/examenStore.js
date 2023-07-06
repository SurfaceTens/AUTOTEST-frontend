import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, getExamenes, getExamen, actualizarExamen } from "./api-service"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    numExamenes: 0,
    examenes: [],
    examenesCargados: false,

    preguntas: [],
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
      this.nivelDificultad = nivelDificultad
      this.cargarExamen()
    },

    async cargarExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      this.preguntas = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
      const examenID = this.preguntas[0]._links.examen.href.split("/").pop()
      if (this.examenesCargados) {
        const examenRecuperado = await getExamen(examenID)
        examenStore().examenes.push(examenRecuperado)
      }
    },

    cargarExamen() {
      this.cargarExamenParams(this.numPreguntasDefecto, this.usuarioID, this.nivelDificultad)
    },

    editarExamen(examenObjeto) {
      examenObjeto.alumnoID = this.usuarioID
      actualizarExamen(examenObjeto)
      this.examenes.push(examenObjeto)
    },

    getExamenPorId(id) {
      return this.examenes.find((p) => p.id == id)
    },

    async forzarCargarExamenes() {
      this.examenes = await getExamenes()
      this.examenesCargados = true
      this.numExamenes = this.examenes.length
    },
    async cargarExamenes() {
      if (!this.examenesCargados) {
        this.forzarCargarExamenes()
      }
    },
  },
})
