<template>
    <div>
      <h1>Preguntas</h1>
      <ul>
        <li v-for="(pregunta, index) in preguntas" :key="index">
          <router-link :to="'/preguntas/' + pregunta.id">{{ pregunta.texto }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import preguntas from "@/assets/preguntas.json";
  
  export default {
    name: "Preguntas",
    data() {
      return {
        preguntas,
      };
    },
  };
  </script>