<script>
import { mapActions } from "pinia"
import { preguntasStore } from "@/stores/preguntasStore"
import { examenStore } from "@/stores/examenStore"
import { examenesStore } from "@/stores/examenesStore"
import { alumnosStore } from "@/stores/alumnosStore"
import Cargando from "@/components/Cargando.vue"

export default {
  name: "CargaPrecarga",
  components: {
    Cargando,
  },
  props: {
    tipoPrecarga: {
      type: String,
      default: "",
    },
  },
  methods: {
    ...mapActions(preguntasStore, ["precargarPreguntas", "getNumPreguntas"]),
    ...mapActions(examenStore, ["precargarExamen"]),
    ...mapActions(examenesStore, ["precargarExamenes"]),
    ...mapActions(alumnosStore, ["precargarAlumnos", "getNumAlumnos"]),

    precargaDePreguntas() {
      this.getNumPreguntas()
      //this.precargarPreguntas()
    },
    precargaDeAlumnos() {
      this.getNumAlumnos()
      this.precargarAlumnos()
    },
    async precargaDeExamen() {
      await this.precargarExamen()
    },
    precargaDeExamenes() {
      this.precargarExamenes()
    },
    async precarga(tipoPrecarga) {
      switch (tipoPrecarga) {
        case "preguntas":
          this.precargaDePreguntas()
          break
        case "alumnos":
          this.precargaDeAlumnos()
          break
        case "examen":
          await this.precargaDeExamen()
          break
        case "examenes":
          this.precargaDeExamenes()
          break
        case "todos":
          await this.precargaDeExamen()
          this.precargaDeAlumnos()
          this.precargaDeExamenes()
          this.precargaDePreguntas()
          break
        default:
          break
      }
    },
  },
  async created() {
    this.precarga(this.tipoPrecarga)
  },
}
</script>

<template>
  <div>
    <Cargando />
  </div>
</template>
