import { defineStore } from "pinia"
import {
  getPreguntas,
  getEntidad,
  actualizarPregunta,
  getTotalEntidades,
  isPrecargaReady,
} from "./api-service"

export const preguntasStore = defineStore("preguntas", {
  state: () => ({
    numPreguntas: 0,
    preguntas: [],
    preguntaSeleccionada: {},
    precarga: [],
  }),
  actions: {
    async getPreguntaPorId(id) {
      this.preguntaSeleccionada = (await getEntidad("preguntas", id)).data
    },
    async getNumPreguntas() {
      try {
        const response = await getTotalEntidades("preguntas")
        this.numPreguntas = response.data
      } catch (error) {
        this.numPreguntas = 0
      }
    },
    async cargarPreguntas() {
      if (isPrecargaReady(this.precarga)) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        this.precargarPreguntas()
        this.preguntas = this.precarga
      }
    },
    setPreguntas(preguntas) {
      this.preguntas = preguntas
    },
    async editarPregunta(pregunta) {
      await actualizarPregunta(pregunta.id, pregunta)
    },
    async precargarPreguntas() {
      this.precarga = this.preguntas = await getPreguntas()
    },
  },
})
