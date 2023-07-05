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
    ...mapActions(examenStore, ["precargarExamen", "precargarExamenes"]),
    ...mapActions(alumnosStore, ["precargarAlumnos", "getNumAlumnos"]),

    async precargaDePreguntas() {
      await this.getNumPreguntas()
      await this.precargarPreguntas()
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
      setTimeout(async () => {
        switch (tipoPrecarga) {
          case "preguntas":
            await this.precargaDePreguntas()
            break
          case "alumnos":
            await this.precargaDeAlumnos()
            break
          case "examenes":
            await this.precargaDeExamenes()
            break
          case "examen":
            await this.precargaDeExamen()
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
      }, 100)
    },
  },
  created() {
    this.precarga(this.tipoPrecarga)
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
