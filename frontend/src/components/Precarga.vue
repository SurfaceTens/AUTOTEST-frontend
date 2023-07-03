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
  data() {
    return {
      mostrarSpinner: false,
    }
  },
  methods: {
    ...mapActions(preguntasStore, ["precargarPreguntas", "getNumPreguntas"]),
    ...mapActions(examenStore, ["precargarExamen"]),
    ...mapActions(examenesStore, ["precargarExamenes"]),
    ...mapActions(alumnosStore, ["precargarAlumnos", "getNumAlumnos"]),

    async precargaDePreguntas() {
      await this.getNumPreguntas()
      //await this.precargarPreguntas() // Revisar para que funcione
    },
    async precargaDeAlumnos() {
      await this.getNumAlumnos()
      await this.precargarAlumnos()
    },
    async precargaDeExamen() {
      await this.precargarExamen()
    },
    async precargaDeExamenes() {
      await this.precargarExamenes()
    },
    async precarga(tipoPrecarga) {
      this.mostrarSpinner = true
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
      this.mostrarSpinner = false;
    },
  },
  async created() {
    this.precarga(this.tipoPrecarga)
  },
}
</script>

<template>
  <div>
    <Cargando v-if="mostrarSpinner" />
  </div>
</template>
