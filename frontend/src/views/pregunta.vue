<template>
  <div>
    <!-- Mostrar la imagen de la pregunta si está disponible -->
    <div v-if="pregunta.imagen">
      <img :src="require(`@/assets/${pregunta.imagen}`)" alt="Imagen de la pregunta" />
    </div>
    <!-- Mostrar un mensaje si la imagen no está disponible -->
    <div v-else>
      <p>Imagen no disponible</p>
    </div>
    <!-- Mostrar el número de pregunta y el enunciado -->
    <h3>{{ pregunta.id }} - {{ pregunta.enunciado }}</h3>
    <ul>
      <!-- Recorrer y mostrar las alternativas en un orden aleatorio -->
      <li v-for="alternativa in alternativasAleatorias" :key="alternativa.id">
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
  data() {
    return {
      pregunta: null,
      respuesta: null,
    };
  },
  computed: {
    // Hacer un array con las alternativas.
    alternativas() {
      const correcta = preguntas[this.pregunta.id].correcta;
      const incorrectas = preguntas[this.pregunta.id].incorrectas;
      return [correcta, ...incorrectas];
    },
    // Crear un array desordenado.
    alternativasAleatorias() {
      return this.desordenarArray(this.alternativas);
    },
  },
  methods: {
    desordenarArray(array) {
      let currentIndex = array.length;
      let temporaryValue, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
  },
  created() {
    // Acceder a la ID desde la ruta
    const id = parseInt(this.$route.params.id);
    // Encontrar la pregunta que tiene esa id en el json.
    this.pregunta = preguntas.find((pregunta) => pregunta.id === id);
  },
};
</script>
