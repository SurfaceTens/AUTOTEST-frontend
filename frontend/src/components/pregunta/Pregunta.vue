<script>
import { mapActions } from "pinia"
import { examenStore } from "@/stores/examenStore"

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
      default: "",
    },
    numero: {
      type: Number,
      default: 0,
    },
    desorden: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    // Hacer un array con las alternativas.
    alternativas() {
      if (this.pregunta) {
        const correcta = this.pregunta.correcta
        const incorrectas = this.pregunta.incorrectas
        return [correcta, ...incorrectas]
      }
      return []
    },
    // Crear un array desordenado si queremos desorden.
    alternativasAleatorias() {
      return this.desordenarArray(this.alternativas)
    },

    alternativaSeleccionada() {
      return this.pregunta.respuesta
    },

    mostrarRespuestas() {
      return this.respuestaCorrecta !== "" && this.respuestaSeleccionada !== ""
    },

    esRespuestaCorrecta() {
      return this.respuestaCorrecta === this.respuestaSeleccionada
    },
  },

  methods: {
    ...mapActions(examenStore, ["desordenarArray"]),
  },
}
</script>

<template>
  <div class="card pregunta-card">
    <div class="card_header">
      <h3 class="card_title">{{ numero }} - {{ pregunta.enunciado }}</h3>
      <div>
        <img
          v-if="pregunta.imagen"
          class="preguntaImg img-fluid w-100"
          :src="'./imagenesPreguntas/' + pregunta.imagen"
          alt="Imagen de la pregunta"
        />
      </div>
    </div>
    <ul class="alternativas-list">
      <li
        v-for="alternativa in alternativasAleatorias"
        :key="alternativa"
        class="alternativa-item"
        :class="{
          'alternativa-seleccionada': alternativa === alternativaSeleccionada,
          'respuesta-correcta':
            mostrarRespuestas &&
            (alternativa === respuestaCorrecta ||
              (!respuestaSeleccionada && alternativa === respuestaCorrecta)),
          'respuesta-incorrecta':
            mostrarRespuestas && alternativa === respuestaSeleccionada && !esRespuestaCorrecta,
          'respuesta-correcta-ignorada':
            !respuestaSeleccionada && alternativa === respuestaCorrecta && !esRespuestaCorrecta,
        }"
        @click="$emit('opcionSeleccionada', alternativa)"
      >
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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;
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

.respuesta-correcta-ignorada {
  box-shadow: 0 0 5px rgba(255, 207, 0, 0.8);
}

.respuesta-incorrecta {
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.8);
}

.preguntaImg {
  flex: 1 1 100%;
  max-width: 100%;
  height: 200px;
  object-fit: fill;
}

@media (min-width: 768px) {
  .preguntaImg {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {
  .preguntaImg {
    flex-basis: 30%;
  }
}
</style>
