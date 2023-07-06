import { defineStore } from "pinia"
import { getAlumnos, actualizarAlumno, getTotalEntidades, isPrecargaReady } from "./api-service"

export const alumnosStore = defineStore("alumnos", {
  state: () => ({
    numAlumnos: 0,
    alumnos: [],
  }),
  actions: {
    getAlumnoPorId(id) {
      return this.alumnos.find((p) => p.id == id)
    },
    async getNumAlumnos() {
      try {
        const respuesta = await getTotalEntidades("alumnos")
        this.numAlumnos = respuesta.data
      } catch (error) {}
    },
    async editarAlumno(alumno) {
      await actualizarAlumno(alumno)
    },

    async forzarCargarAlumnos() {
      this.alumnos = await getAlumnos()
    },

    async cargarAlumnos() {
      if (this.alumnos.length === 0) {
        this.forzarCargarAlumnos()
      }
    },
  },
})
