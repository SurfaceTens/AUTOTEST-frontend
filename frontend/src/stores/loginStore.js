import { defineStore } from "pinia"

export const loginStore = defineStore("login", {
  state: () => ({
    rol: "invitado",
    alumnoID: "1",
    alumnoDatos: "",
  }),
  actions: {
    cambiarRol(nuevoRol) {
      this.rol = nuevoRol
      if (nuevoRol == "administrador" || nuevoRol == "invitado") {
        this.quitarAlumno()
      }
    },
    cambiarAlumno(alumno) {
      this.alumnoID = alumno.id
      this.alumnoDatos = alumno.nombre + " " + alumno.apellidos
    },
    quitarAlumno() {
      this.alumnoID = 1
      this.alumnoDatos = ""
    },
  },
})
