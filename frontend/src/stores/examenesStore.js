import { defineStore } from "pinia"
import { getEntidades } from "./api-service"

export const examenesStore = defineStore("examenesStore", {
  state: () => ({
    examenes: [],
    precarga: [],
  }),
  actions: {
    getExamenPorId(id) {
      return this.examenes.find((p) => p.id == id)
    },

    async getExamenes() {
      if (this.isPrecargaReady()) {
        this.examenes = this.precarga
        this.precarga = []
      } else {
        this.examenes = (await getEntidades("examenes")).data._embedded.examenModels
      }
    },
    isPrecargaReady() {
      if (this.precarga.length !== 0) {
        return true
      } else {
        return false
      }
    },
    async precargarExamenes() {
      this.precarga = this.examenes = (await getEntidades("examenes")).data._embedded.examenModels
    },
  },
})