import { defineStore } from "pinia"
import { crearExamen, llamadaApi } from './api-service'

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
  }),
  actions: {
    getPreguntaPorId(id) {
      return this.preguntas.find((p) => p.id == id)
    },
    async getPreguntas() {
      this.preguntas = (await crearExamen(5, 1)).data._embedded.preguntaExamenModels
    },
    getNumPreguntas() {
      return this.preguntas.length
    },

    desordenarArray(array) {
      // Algoritmo de Fisher-Yates para desordenar el array
      // Obtener la longitud del array y crear un valor temporal.
      let indiceActual = array.length
      let valorTemporal, numAleatorio

      // Mientras no se hayan recorrido todos los elementos del array:
      while (indiceActual !== 0) {
        // Generar un índice aleatorio entre 0 y el actual.
        numAleatorio = Math.floor(Math.random() * indiceActual)
        indiceActual--

        // Intercambiar el contenido de ambos indices.
        valorTemporal = array[indiceActual]
        array[indiceActual] = array[numAleatorio]
        array[numAleatorio] = valorTemporal
      }
      return array
    },
  },
})
