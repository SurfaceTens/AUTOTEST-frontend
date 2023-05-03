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
  <div>
    <Navbar />
    <router-view />
  </div>
  
</template>

<style>
</style>
