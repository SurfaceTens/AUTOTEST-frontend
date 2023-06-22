import { defineStore } from "pinia"
import { getEntidades, actualizarAlumno } from "./api-service"

export const alumnosStore = defineStore("alumnos", {
  state: () => ({
    alumnos: [],
    precarga: [],
  }),
  actions: {
    getAlumnoPorId(id) {
      return this.alumnos.find((p) => p.id == id)
    },
    getNumAlumnos() {
      if (this.alumnos.length == 0) {
        if (this.precarga.length != 0) {
          return this.precarga.length
        }
      } else return this.alumnos.length
    },

    async getAlumnos() {
      if (this.isPrecargaReady()) {
        this.alumnos = this.precarga
        this.precarga = []
      } else {
        this.alumnos = (await getEntidades("alumnos")).data._embedded.alumnoModels
      }
    },
    async editarAlumno(alumno) {
      await actualizarAlumno(alumno.id, alumno)
    },
    isPrecargaReady() {
      if (this.precarga.length !== 0) {
        return true
      } else {
        return false
      }
    },
    async precargarAlumnos() {
      this.precarga = this.alumnos = (await getEntidades("alumnos")).data._embedded.alumnoModels
    },
  },
})
