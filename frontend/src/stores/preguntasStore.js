import { defineStore } from "pinia"
import { getEntidades } from "./api-service"

export const preguntasStore = defineStore("preguntas", {
  state: () => ({
    preguntas: [],
  }),
  actions: {
    getPreguntaPorId(id) {
      return this.preguntas.find((p) => p.id == id)
    },
    getNumPreguntas() {
      return this.preguntas.length
    },

    async getPreguntas() {
      this.preguntas = (await getEntidades("preguntas")).data._embedded.preguntaModels
    },
  },
})
