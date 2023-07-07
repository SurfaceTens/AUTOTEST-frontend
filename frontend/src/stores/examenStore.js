import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen, getExamenes, actualizarExamen } from "./api-service"
import { loginStore } from "@/stores/loginStore"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    numExamenes: 0,
    examenes: [],
    examenesCargados: false,

    preguntas: [],
    preguntasPreparadas: [], // Necesitamos esta precarga para imposibilitar enviar el mismo examen 2 veces.
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

    async injectarDificultadExamen(nivelDificultad) {
      this.preguntas = []
      this.preguntasPreparadas = []
      this.nivelDificultad = nivelDificultad
      await this.cargarExamenParams(this.numPreguntasDefecto, loginStore().alumnoID, nivelDificultad)
    },

    async cargarExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      this.preguntas = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
    },

    async cargarExamen() {
      if (this.preguntasPreparadas.length == 0) {
        if (this.preguntas.length == 0) {
          await this.cargarExamenParams(
            this.numPreguntasDefecto,
            loginStore().alumnoID,
            this.nivelDificultad
          )
        } else {
          await this.prepararExamen()
        }
      } else {
        this.preguntas = this.preguntasPreparadas
        await this.prepararExamen()
      }
    },

    async prepararExamenParams(numeroPreguntas, usuario, nivelDificultad) {
      this.preguntasPreparadas = await crearExamen(numeroPreguntas, usuario, nivelDificultad)
    },

    async prepararExamen() {
      await this.prepararExamenParams(
        this.numPreguntasDefecto,
        loginStore().alumnoID,
        this.nivelDificultad
      )
    },

    editarExamen(examenObjeto) {
      examenObjeto.alumnoID = loginStore().alumnoID
      examenObjeto.alumnoDatos = loginStore().alumnoDatos
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
