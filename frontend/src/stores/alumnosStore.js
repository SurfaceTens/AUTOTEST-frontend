import { defineStore } from "pinia"
import { getAlumnos, actualizarAlumno } from "./api-service"

export const alumnosStore = defineStore("alumnos", {
  state: () => ({
    numAlumnos: 0,
    alumnos: [],
    alumnosCargados: false,
  }),
  actions: {
    getAlumnoPorId(id) {
      return this.alumnos.find((p) => p.id == id)
    },
    editarAlumno(alumno) {
      actualizarAlumno(alumno)
      const index = this.alumnos.findIndex((a) => a.id === alumno.id)
      if (index !== -1) {
        this.alumnos[index] = alumno
      }
    },

    async forzarCargarAlumnos() {
      this.alumnos = await getAlumnos()
      this.alumnosCargados = true
      this.numAlumnos = this.alumnos.length
    },

    async cargarAlumnos() {
      if (!this.alumnosCargados) {
        await this.forzarCargarAlumnos()
      }
    },
  },
})
