<script setup>
import { onMounted } from "vue"
import Navbar from "@/components/Navbar.vue"
import { preguntasStore } from "@/stores/preguntasStore.js"
import { alumnosStore } from "@/stores/alumnosStore.js"
import { examenStore } from "@/stores/examenStore.js"

onMounted(async () => {
  //await examenStore().cargarExamen()
  await examenStore().cargarExamenes()
  await preguntasStore().cargarPreguntas()
  await alumnosStore().cargarAlumnos()
})
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
