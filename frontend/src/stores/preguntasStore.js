import { defineStore } from "pinia"
import {
  getPreguntas,
  getEntidad,
  guardarPregunta,
  borrarPregunta,
  actualizarPregunta,
} from "./api-service"

export const preguntasStore = defineStore("preguntas", {
  state: () => ({
    numPreguntas: 0,
    preguntas: [],
    preguntasTodas: [],
    preguntaSeleccionada: {},
    preguntasCargadas: false,
  }),
  actions: {
    async getPreguntaPorId(id) {
      this.preguntaSeleccionada = (await getEntidad("preguntas", id)).data
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

    setPreguntaSeleccionada(pregunta) {
      this.preguntaSeleccionada = pregunta
    },

    async forzarCargarPreguntas() {
      this.preguntasTodas = await getPreguntas()
      this.ordenarPreguntas(this.preguntas)
      this.preguntasCargadas = true
      this.numPreguntas = this.preguntasTodas.length
    },
    async cargarPreguntas() {
      if (!this.preguntasCargadas) {
        await this.forzarCargarPreguntas()
      }
    },

    crearPregunta(pregunta) {
      guardarPregunta(pregunta)
      this.preguntasTodas.push(pregunta)
      this.numPreguntas = this.preguntasTodas.length
    },

    editarPregunta(pregunta) {
      actualizarPregunta(pregunta)
      const index = this.preguntasTodas.findIndex((p) => p.id === pregunta.id)
      if (index !== -1) {
        this.preguntasTodas[index] = pregunta
      }
    },

    eliminarPregunta(pregunta) {
      borrarPregunta(pregunta.id)
      const index = this.preguntasTodas.findIndex((p) => p.id === pregunta.id)
      if (index !== -1) {
        this.preguntasTodas.splice(index, 1)
      }
      this.numPreguntas = this.preguntasTodas.length
    },
  },
})
