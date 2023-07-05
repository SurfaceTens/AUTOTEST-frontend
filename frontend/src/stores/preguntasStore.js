import { defineStore } from "pinia"
import {
  getPreguntas,
  getEntidad,
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

    getDificultadTexto(dificultad) {
      let texto
      if (dificultad < 25) {
        texto = "Muy fácil"
      } else if (dificultad < 50) {
        texto = "Fácil"
      } else if (dificultad < 75) {
        texto = "Medio"
      } else if (dificultad < 100) {
        texto = "Difícil"
      } else {
        texto = "Muy difícil"
      }
      return texto
    },

    ordenarPreguntas(preguntas) {
      preguntas.sort((a, b) => a.id - b.id)
    },

    setPreguntas(preguntas) {
      this.preguntas = preguntas
    },

    async cargarPreguntas() {
      if (isPrecargaReady(this.precarga)) {
        this.preguntas = this.precarga
        this.precarga = []
      } else {
        await this.precargarPreguntas()
        this.preguntas = this.precarga
        this.precarga = []
      }
    },

    async precargarPreguntas() {
      if (!isPrecargaReady(this.precarga)) {
        this.precarga = await getPreguntas()
        this.ordenarPreguntas(this.precarga)
      }
    },
  },
})
