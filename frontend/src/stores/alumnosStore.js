import { defineStore } from "pinia"
import { getAlumnos, actualizarAlumno, getTotalEntidades, isPrecargaReady } from "./api-service"

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
        console.error("Error al obtener el número de alumnos:", error)
      }
    },
    async editarAlumno(alumno) {
      await actualizarAlumno(alumno)
    },

    async cargarAlumnos() {
      if (isPrecargaReady(this.precarga)) {
        this.alumnos = this.precarga;
        this.precarga = [];
      } else {
        await this.precargarAlumnos();
        this.alumnos = this.precarga;
        this.precarga = [];
      }
    },
    async precargarAlumnos() {
      if (!isPrecargaReady(this.precarga)) {
        this.precarga = await getAlumnos();
      }
    },
  },
})
