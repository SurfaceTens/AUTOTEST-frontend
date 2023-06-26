import { defineStore } from "pinia"
import { getEntidades, actualizarAlumno, getTotalEntidades } from "./api-service"

export const alumnosStore = defineStore("alumnos", {
  state: () => ({
    numAlumnos: 0,
    alumnos: [],
    precarga: [],
  }),
  actions: {
    getAlumnoPorId(id) {
      return this.alumnos.find((p) => p.id == id)
    },
    async getNumAlumnos() {
      try {
        const response = await getTotalEntidades("alumnos")
        this.numAlumnos = response.data
      } catch (error) {
        console.error("Error al obtener el número de preguntas:", error)
      }
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
