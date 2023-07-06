import { defineStore } from "pinia"

export const loginStore = defineStore("login", {
  state: () => ({
    rol: "invitado",
    alumnoID: "1",
  }),
  actions: {
    cambiarRol(nuevoRol) {
      this.rol = nuevoRol
      if (this.rol == "invitado") {
        this. alumnoID = "1"
      } else if (this.rol == "alumno") {
        this. alumnoID = "22"
      }
    },
  },
})
