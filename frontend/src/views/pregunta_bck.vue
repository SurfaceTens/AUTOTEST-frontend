<template>
  <div>
    <!-- Mostrar la imagen de la pregunta si está disponible -->
    <div>
      <!-- Usar un vif aqui. -->
      <p>Imagen no disponible</p>
    </div>
    <!-- Mostrar el número de pregunta y el enunciado -->
    <h3>{{ pregunta.id }} - {{ pregunta.enunciado }}</h3>
    <ul>
      <!-- Recorrer y mostrar las alternativas en un orden aleatorio -->
      <li v-for="alternativa in alternativasAleatorias" :key="alternativa">
        {{ alternativa }}
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
      if (this.pregunta) {
        const questionIndex = this.pregunta.id - 1;
        if (Array.isArray(preguntas) && questionIndex >= 0 && questionIndex < preguntas.length) {
          const correcta = preguntas[questionIndex].correcta;
          const incorrectas = preguntas[questionIndex].incorrectas;
          return [correcta, ...incorrectas];
        }
      }
      return [];
    },
    // Crear un array desordenado.
    alternativasAleatorias() {
      return this.desordenarArray(this.alternativas);
    },
  },
  methods: {
    desordenarArray(array) {
      // Obtener la longitud del array y crear un valor temporal.
      let indiceActual = array.length;
      let valorTemporal, numAleatorio;

      // Mientras no se hayan recorrido todos los elementos del array:
      while (indiceActual !== 0) {
        // Generar un índice aleatorio entre 0 y el actual.
        numAleatorio = Math.floor(Math.random() * indiceActual);
        indiceActual -= 1;

        // Intercambiar el contenido de ambos indices.
        valorTemporal = array[indiceActual];
        array[indiceActual] = array[numAleatorio];
        array[numAleatorio] = valorTemporal;
      }
      return array;
    },
  },
  created() {
    // Acceder a la ID desde la ruta y convertirla en entero
    const id = parseInt(this.$route.params.id);

    // Encontrar la pregunta que tiene el mismo ID en el json
    this.pregunta = preguntas.find((pregunta) => pregunta.id === id);
    console.log('Pregunta obtenida:', this.pregunta);

    // Verificar si se encontró la pregunta o no
    if (!this.pregunta) {
      console.error('Pregunta no encontrada');
      this.$router.push('/preguntaNoEncontrada');
    }
  },
};
</script>
