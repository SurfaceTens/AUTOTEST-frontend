import { defineStore } from "pinia"
import { getEntidades, getEntidad, actualizarPregunta, getTotalEntidades } from "./api-service"

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
    async getPreguntas() {
      if (this.isPrecargaReady()) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        this.preguntas = (await getEntidades("preguntas")).data._embedded.preguntaQuickModels
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
