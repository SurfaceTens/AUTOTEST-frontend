<script>
import { mapActions } from "pinia"
import { preguntasStore } from "@/stores/preguntasStore"
import { examenStore } from "@/stores/examenStore"
import { alumnosStore } from "@/stores/alumnosStore"
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar,
  },
  methods: {
    ...mapActions(preguntasStore, ["precargarPreguntas"]),
    ...mapActions(examenStore, ["precargarExamen"]),
    ...mapActions(alumnosStore, ["precargarAlumnos"]),
    async precargar() {
      if (!this.primeraPrecarga) {
        this.precargarExamen()
        this.precargarPreguntas()
        this.precargarAlumnos()
        this.primeraPrecarga = true
      }
      console.log("Precarga completa")
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
