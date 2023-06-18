import { defineStore } from "pinia"
import { crearExamen, llamadaApi } from './api-service'

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: [],
  }),
  actions: {
    async generadorExamen(numeroPreguntas, usuario) {
      this.preguntas = (await crearExamen(numeroPreguntas, usuario)).data._embedded.preguntaExamenModels
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
    actualizarPreguntas(nuevasPreguntas) {
      this.preguntas = nuevasPreguntas;
    },
  },
})
