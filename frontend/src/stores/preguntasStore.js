import { defineStore } from 'pinia'
//Axios para la API.
import axios from 'axios'
// Quitar este import cuando se implemente la API.
import preguntasJson from '@/assets/preguntas.json'

const preguntas = preguntasJson._embedded.preguntas
preguntas.forEach(p => {
  p.respuesta = 0
})

export const preguntasStore = defineStore('preguntas', {
  state: () => ({
    preguntas: preguntas
  }),
  actions: {
    getPreguntaPorId(id) {
      return this.preguntas.find(p => p.id == id)
    },
    getPreguntas() {
      return this.preguntas
    },
    getNumPreguntas() {
      return this.preguntas.length
    },

    //Reemplazar la ruta /api/preguntas por la ruta de verdad de la APi cuando llegue el momento.

    // Conectar a la API para obtener las preguntas.
    getPreguntasFromAPI() {
      return axios.get('/api/preguntas')
        .then(response => {
          this.preguntas = response.data
        })
        .catch(error => {
          console.error('Error al obtener las preguntas:', error)
        })
    },
    // Conectar a la API para crear una nueva pregunta.
    crearPreguntaAPI(pregunta) {
      return axios.post('/api/preguntas', pregunta)
        .then(response => {
          const nuevaPregunta = response.data
          this.preguntas.push(nuevaPregunta)
        })
        .catch(error => {
          console.error('Error al crear la pregunta:', error)
        })
    },
    // Conectar a la API para eliminar una pregunta.
    eliminarPreguntaAPI(id) {
      return axios.delete(`/api/preguntas/${id}`)
        .then(() => {
          this.preguntas = this.preguntas.filter(p => p.id !== id)
        })
        .catch(error => {
          console.error('Error al eliminar la pregunta:', error)
        })
    },
    // Conectar a la API para actualizar una pregunta.
    actualizarPreguntaAPI(pregunta) {
      return axios.put(`/api/preguntas/${pregunta.id}`, pregunta)
        .then(response => {
          const preguntaActualizada = response.data
          const index = this.preguntas.findIndex(p => p.id === preguntaActualizada.id)
          if (index !== -1) {
            this.preguntas.splice(index, 1, preguntaActualizada)
          }
        })
        .catch(error => {
          console.error('Error al actualizar la pregunta:', error)
        })
    }
  }
});