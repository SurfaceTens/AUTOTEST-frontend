import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, getExamenes, getExamen } from "./api-service"

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
      this.nuevoExamenID = this.preguntas[0]._links.examen.href.split("/").pop()
    },

    cargarExamen() {
      this.cargarExamenParams(this.numPreguntasDefecto, this.usuarioID, this.nivelDificultad)
    },

    editarExamen(examenObjeto) {
      const examen = this.getExamenPorId(examenObjeto.id)
      if (examen) {
        examen.entregado = examenObjeto.entregado
        examen.aciertos = examenObjeto.aciertos
        examen.fallos = examenObjeto.fallos

        actualizarExamen(examen)
      }
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
