<script>
import { mapActions, mapState } from "pinia"
import { precargaStore } from "@/stores/precargaStore.js"
import { preguntasStore } from "@/stores/preguntasStore"
import { examenStore } from "@/stores/examenStore"
import { alumnosStore } from "@/stores/alumnosStore"
import Cargando from "@/components/Cargando.vue"

export default {
  name: "Precarga",
  components: {
    Cargando,
  },
  computed: {
    ...mapState(precargaStore, ["tipoPrecarga"]),
  },
  data() {
    return {
      mostrarSpinner: false,
    }
  },
  methods: {
    ...mapActions(preguntasStore, ["precargarPreguntas", "getNumPreguntas"]),
    ...mapActions(examenStore, [
      "precargarExamen",
      "generadorExamen",
      "precargarExamenes",
      "cargarExamenes",
    ]),
    ...mapActions(alumnosStore, ["cargarAlumnos", "getNumAlumnos"]),

    async precargaDePreguntas() {
      await this.getNumPreguntas()
      await this.precargarPreguntas()
    },
    async precargaDeAlumnos() {
      await this.getNumAlumnos()
      await this.cargarAlumnos()
    },
    async precargaDeExamen() {
      await this.precargarExamen()
      this.generadorExamen()
    },
    async precargaDeExamenes() {
      await this.cargarExamenes()
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
        case "examenes":
          this.precargaDeExamenes()
          break
        case "todos":
          await this.precargaDeExamen()
          await this.precargaDeAlumnos()
          await this.precargaDeExamenes()
          await this.precargaDePreguntas()
          break
        default:
          break
      }
      this.mostrarSpinner = false
    },
  },
  created() {
    this.precarga("todos")
  },
  watch: {
    tipoPrecarga(newTipoPrecarga) {
      this.precarga(newTipoPrecarga)
    },
  },
}
</script>

<template>
  <div>
    <Cargando v-if="mostrarSpinner" />
  </div>
</template>
