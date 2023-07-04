<script>
import { inject } from "vue"
import Navbar from "@/components/Navbar.vue"
import Precarga from "@/components/Precarga.vue"

export default {
  name: "App",
  components: {
    Navbar,
    Precarga,
  },
  setup() {
    const tipoPrecarga = inject("tipoPrecarga")

    return {
      tipoPrecarga,
    }
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
    <Precarga />
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
