<script>
export default {
  props: {
    pregunta: {
      type: Object,
      required: true,
    },
    respuestaCorrecta: {
      type: String,
      required: true,
    },
    respuestaSeleccionada: {
      type: String,
      default: '',
    }
  },
  computed: {
    // Hacer un array con las alternativas.
    alternativas() {
      if (this.pregunta) {
        const correcta = this.pregunta.correcta;
        const incorrectas = this.pregunta.incorrectas;
        return [correcta, ...incorrectas];
      }
      return [];
    },
    // Crear un array desordenado.
    alternativasAleatorias() {
      return this.desordenarArray(this.alternativas);
    },

    alternativaSeleccionada() {
      return this.pregunta.respuesta;
    },
    mostrarRespuestas() {
      return this.respuestaCorrecta !== '' && this.respuestaSeleccionada !== '';
    },
    esRespuestaCorrecta() {
      return this.respuestaCorrecta === this.respuestaSeleccionada;
    }
  },

  methods: {
    desordenarArray(array) {
      // Algoritmo de Fisher-Yates para desordenar el array    
      // Obtener la longitud del array y crear un valor temporal.
      let indiceActual = array.length;
      let valorTemporal, numAleatorio;

      // Mientras no se hayan recorrido todos los elementos del array:
      while (indiceActual !== 0) {
        // Generar un índice aleatorio entre 0 y el actual.
        numAleatorio = Math.floor(Math.random() * indiceActual);
        indiceActual--;

        // Intercambiar el contenido de ambos indices.
        valorTemporal = array[indiceActual];
        array[indiceActual] = array[numAleatorio];
        array[numAleatorio] = valorTemporal;
      }
      return array;
    },

    asignarClaseRespuesta(opcion) {
      if (this.mostrarRespuestas) {
        if (opcion === this.respuestaCorrecta && this.esRespuestaCorrecta) {
          return 'respuesta-correcta';
        } else if (opcion === this.respuestaSeleccionada && !this.esRespuestaCorrecta) {
          return 'respuesta-incorrecta';
        }
      }
      return '';
    }
  },
};
</script>

<template>
  <div class="card pregunta-card">
    <div class="card_header">
      <h3 class="card_title">{{ pregunta.id }} - {{ pregunta.enunciado }}</h3>
      <div>
        <!-- Mostrar la imagen de la pregunta si está disponible -->
        <img v-if="pregunta.imagen" :src="'@/assets/imagenesPreguntas/' + pregunta.imagen" alt="Imagen de la pregunta" />
        <p v-else>No hay imagen disponible</p>
      </div>
    </div>
    <ul class="alternativas-list">
      <li v-for="alternativa in alternativasAleatorias" :key="alternativa" class="alternativa-item" :class="{
        'alternativa-seleccionada': alternativa === alternativaSeleccionada,
        'respuesta-correcta': mostrarRespuestas && alternativa === respuestaCorrecta && esRespuestaCorrecta,
        'respuesta-incorrecta': mostrarRespuestas && alternativa === respuestaSeleccionada && !esRespuestaCorrecta && alternativa !== respuestaCorrecta
      }" @click="$emit('opcionSeleccionada', alternativa)">
        {{ alternativa }}
      </li>
    </ul>
  </div>
</template>



  
<style scoped>
.card {
  background-color: var(--color-fondo);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
}

.card_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.card_title {
  margin: 0;
}

.alternativas-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  list-style: none;
  padding: 0;
}

.alternativa-item {
  background-color: var(--color-secundario);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

.alternativa-item:hover {
  background-color: #ebebeb;
}

.alternativa-seleccionada {
  box-shadow: 0 0 5px rgba(0, 47, 255, 0.8);
}

.respuesta-correcta {
  box-shadow: 0 0 5px rgba(0, 255, 0, 0.8);
}

.respuesta-incorrecta {
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.8);
}
</style>
