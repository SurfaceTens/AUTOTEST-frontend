<script>
export default {
    props: {
        pregunta: {
            type: Object,
            required: true
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
        }
    }
};
</script>

<template>
    <div class="card pregunta-card">
      <div class="card_header">
        <h3 class="card_title">{{ pregunta.id }} - {{ pregunta.enunciado }}</h3>
        <div>
          <!-- Mostrar la imagen de la pregunta si está disponible -->
          <img v-if="pregunta.imagen" :src="pregunta.imagen" alt="Imagen de la pregunta" />
          <p v-else>No hay imagen disponible</p>
        </div>
      </div>
      <ul class="alternativas-list">
        <li v-for="alternativa in alternativasAleatorias" :key="alternativa" class="alternativa-item">
          {{ alternativa }}
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .pregunta-card {
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.1);
    background-color: var(--color-fondo);
    margin: 0 1rem;
    margin-bottom: 1.5rem;
  }
  
  .card_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .card_title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-borde);
  }
  
  .alternativas-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  
  .alternativa-item {
    background-color: var(--color-secundario);
    padding: 1rem;
    border-radius: 8px;
    color: var(--color-borde);
  }
  
  @media (max-width: 767px) {
    .pregunta-card {
      padding: 1rem;
    }
  }
  </style>
  