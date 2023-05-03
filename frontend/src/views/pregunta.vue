<template>
    <div>
      <h3>{{ pregunta.stem }}</h3>
      <ul>
        <li v-for="(alternativa, index) in pregunta.alternativas" :key="index">
          <label>
            <input type="radio" :name="pregunta.id" :value="alternativa.id" v-model="respuesta">
            {{ alternativa.texto }}
          </label>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import preguntas from "@/assets/preguntas.json";
  
  export default {
    name: "pregunta",
    props: ["pregunta"],
    data() {
      return {
        respuesta: null,
      };
    },
    computed: {
      alternativas() {
        return preguntas[this.pregunta.id].alternativas;
      },
    },
  };
  </script>
  