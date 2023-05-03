<template>
  <div>
    <pregunta
      v-for="(pregunta, index) in preguntas"
      :key="index"
      :pregunta="pregunta"
      @respuesta="respuestas[pregunta.id] = $event"
    />
    <button @click="calificar">Calificar</button>
  </div>
</template>

<script>
import axios from "axios";
import pregunta from "@/views/pregunta.vue";

export default {
  name: "examen",
  components: {
    pregunta,
  },
  data() {
    return {
      preguntas: [],
      respuestas: {},
    };
  },
  mounted() {
    axios
      .get("../assets/preguntas.json")
      .then((response) => {
        this.preguntas = Object.keys(response.data).map((key) => {
          return {
            id: key,
            stem: response.data[key].stem,
            alternativas: response.data[key].alternativas,
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    calificar() {
      let calificacion = 0;
      let totalPreguntas = Object.keys(this.respuestas).length;
      Object.keys(this.respuestas).forEach((key) => {
        if (this.preguntas.find((pregunta) => pregunta.id === key).respuesta === this.respuestas[key]) {
          calificacion++;
        }
      });
      alert(`Tu calificación es ${(calificacion / totalPreguntas) * 10}`);
    },
  },
};
</script>
