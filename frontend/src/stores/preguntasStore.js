import { defineStore } from "pinia"
import { getEntidades, actualizarPregunta } from "./api-service"

export const preguntasStore = defineStore("preguntas", {
  state: () => ({
    preguntas: [],
    precarga: [],
  }),
  actions: {
    getPreguntaPorId(id) {
      return this.preguntas.find((p) => p.id == id)
    },
    getNumPreguntas() {
      if (this.preguntas.length == 0) {
        if (this.precarga.length != 0) {
          return this.precarga.length
        }
      } else return this.preguntas.length
    },

    async getPreguntas() {
      if (this.isPrecargaReady()) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        this.preguntas = (await getEntidades("preguntas")).data._embedded.preguntaModels
      }
    },
    async editarPregunta(pregunta) {
      await actualizarPregunta(pregunta.id, pregunta)
    },
    isPrecargaReady() {
      if (this.precarga.length !== 0) {
        return true
      } else {
        return false
      }
    },
    async precargarPreguntas() {
      this.precarga = this.preguntas = (await getEntidades("preguntas")).data._embedded.preguntaModels
    },
  },
})
