<script>
import { mapActions } from "pinia"
import { preguntasStore } from "@/stores/preguntasStore"
import { examenStore } from "@/stores/examenStore"
import { examenesStore } from "@/stores/examenesStore"
import { alumnosStore } from "@/stores/alumnosStore"
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(preguntasStore, ["precargarPreguntas", "getNumPreguntas"]),
    ...mapActions(examenStore, ["precargarExamen"]),
    ...mapActions(examenesStore, ["precargarExamenes"]),
    ...mapActions(alumnosStore, ["precargarAlumnos", "getNumAlumnos"]),
    async precargar() {
      this.getNumPreguntas()
      this.getNumAlumnos()
      await this.precargarExamen()
      this.precargarExamenes()
      this.precargarAlumnos()
    },
  },
  async created() {
    this.precargar()
  },
}
</script>

<template>
  <div class="contenido-aplicacion">
    <div class="contenedor-principal">
      <div>
        <Navbar />
      </div>
      <div class="contenedor-vistas">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.contenido-aplicacion {
  width: 100%;
  height: 100%;
}

.contenedor-principal {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.contenedor-vistas {
  flex: 1;
}
</style>
