import { defineStore } from "pinia"
import { getPreguntas, getEntidad, getTotalEntidades } from "./api-service"

export const preguntasStore = defineStore("preguntas", {
  state: () => ({
    numPreguntas: 0,
    preguntas: [],
    preguntaSeleccionada: {},
  }),
  actions: {
    async getPreguntaPorId(id) {
      this.preguntaSeleccionada = (await getEntidad("preguntas", id)).data
    },
    async getNumPreguntas() {
      try {
        const respuesta = await getTotalEntidades("preguntas")
        this.numPreguntas = respuesta.data
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

    async forzarCargarPreguntas() {
      this.preguntas = await getPreguntas()
      this.ordenarPreguntas(this.preguntas)
    },
    async cargarPreguntas() {
      if (this.preguntas.length === 0) {
        this.forzarCargarPreguntas()
      }
    },
  },
})
