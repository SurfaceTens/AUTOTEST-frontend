<template>
    <div>
      <h1>Usuarios</h1>
      <ul>
        <li v-for="(usuario, index) in usuarios" :key="index">
          <router-link :to="'/usuarios/' + usuario.id">{{ usuario.nombre }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import usuarios from "@/assets/usuarios.json";
  
  export default {
    name: "Usuarios",
    data() {
      return {
        usuarios,
      };
    },
  };
  </script>