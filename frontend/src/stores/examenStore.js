import { defineStore } from "pinia"
//Axios para la API.
import axios from "axios"
// Quitar este import cuando se implemente la API.
import preguntasJson from "@/assets/preguntas.json"

const preguntas = preguntasJson._embedded.preguntas
preguntas.forEach((p) => {
  p.respuesta = 0
})

export const examenStore = defineStore("examenStore", {
  state: () => ({
    preguntas: preguntas,
  }),
  actions: {
    getPreguntaPorId(id) {
      return this.preguntas.find((p) => p.id == id)
    },
    getPreguntas() {
      return this.preguntas
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