import { defineStore } from "pinia"

export const loginStore = defineStore("login", {
  state: () => ({
    rol: "invitado",
    alumnoID: "1",
    alumnoDatos: "Alumno Invitado"
  }),
  actions: {
    cambiarRol(nuevoRol) {
      this.rol = nuevoRol
    },
    cambiarAlumno(alumno) {
      this.alumnoID = alumno.id
      this.alumnoDatos = alumno.nombre + " " + alumno.apellidos
    },
  },
})
