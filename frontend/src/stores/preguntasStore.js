import { defineStore } from 'pinia'
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
    }
  }
});