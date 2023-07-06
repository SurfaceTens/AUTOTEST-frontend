<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar,
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
