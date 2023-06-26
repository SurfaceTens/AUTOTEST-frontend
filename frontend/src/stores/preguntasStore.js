import { defineStore } from "pinia"
import { getEntidades, actualizarPregunta, getTotalEntidades } from "./api-service"

export const preguntasStore = defineStore("preguntas", {
  state: () => ({
    numPreguntas: 0,
    preguntas: [],
    precarga: [],
  }),
  actions: {
    getPreguntaPorId(id) {
      return this.preguntas.find((p) => p.id == id)
    },
    async getNumPreguntas() {
      try {
        const response = await getTotalEntidades("preguntas")
        this.numPreguntas = response.data
      } catch (error) {
        console.error("Error al obtener el número de preguntas:", error)
      }
    },
    async getPreguntas() {
      if (this.isPrecargaReady()) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        this.preguntas = (await getEntidades("preguntas")).data._embedded.preguntaModels
      }
    },
    setPreguntas(preguntas) {
      this.preguntas = preguntas
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
      this.precarga = this.preguntas = (
        await getEntidades("preguntas")
      ).data._embedded.preguntaModels
    },
  },
})
