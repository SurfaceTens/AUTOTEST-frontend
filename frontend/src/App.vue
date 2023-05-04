<script>
import Navbar from "@/components/navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
};

</script>

<template>
  <div class="contenido-aplicacion">
    <Navbar />
    <div class="vistas-router">
      <router-view />
    </div>
  </div>
  
</template>

<style>
  .contenido-aplicacion {
    width: 100%;
    height: 100%;
  }

  .vistas-router {
    margin-top: calc(var(--proporcion-navbar) * 100vh);
  }
</style>
