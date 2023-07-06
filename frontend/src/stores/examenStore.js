import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, getExamenes, getExamen, actualizarExamen } from "./api-service"
import { loginStore } from "@/stores/loginStore"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    numExamenes: 0,
    examenes: [],
    examenesCargados: false,

    preguntas: [],
    numPreguntasDefecto: 30,
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
    },

    cargarExamen() {
      this.cargarExamenParams(this.numPreguntasDefecto, loginStore().alumnoID, this.nivelDificultad)
    },

    editarExamen(examenObjeto) {
      examenObjeto.alumnoID = loginStore().alumnoID
      console.log(examenObjeto.alumnoID)
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
