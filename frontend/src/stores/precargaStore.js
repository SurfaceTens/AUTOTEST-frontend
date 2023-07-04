import { defineStore } from 'pinia'

export const precargaStore = defineStore('precarga', {
  state: () => ({
    tipoPrecarga: 'todos',
  }),
  actions: {
    setTipoPrecarga(tipo) {
      this.tipoPrecarga = tipo
    },
  },
})