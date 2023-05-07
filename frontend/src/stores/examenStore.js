import { defineStore } from 'pinia';

export const useExamenStore = defineStore('examen', {
  state() {
    return {
      preguntas: [],
    };
  },
  actions: {},
  getters: {},
});
