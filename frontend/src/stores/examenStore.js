import { defineStore } from "pinia"
import { crearExamen, corregirPreguntaExamen } from "./api-service"

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
  }),
  actions: {
    async generadorExamen(numeroPreguntas, usuario) {
      this.preguntas = (
        await crearExamen(numeroPreguntas, usuario)
      ).data._embedded.preguntaExamenModels
    },
    async corregirPregunta(pregunta) {
      console.log("examenStore", pregunta.id, " y ", pregunta)
      await corregirPreguntaExamen(pregunta.id,pregunta)
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
  },
})
