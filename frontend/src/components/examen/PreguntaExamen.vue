<script>
import { mapActions } from "pinia"
import { examenStore } from "@/stores/examenStore"

export default {
  props: {
    pregunta: {
      type: Object,
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
    terminado: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    alternativas() {
      if (this.pregunta) {
        const correcta = this.pregunta.correcta
        const incorrectas = this.pregunta.incorrectas
        return [correcta, ...incorrectas]
      }
      return []
    },
    mostrarImagenBase64() {
      return this.pregunta.adjuntoURL.startsWith("data:image")
    },

    alternativasAleatorias() {
      return this.desordenarArray(this.alternativas)
    },

    alternativaSeleccionada() {
      return this.pregunta.respuesta
    },

    mostrarRespuestas() {
      return this.terminado && this.respuestaSeleccionada !== ""
    },

    esRespuestaCorrecta() {
      this.pregunta.acertada = this.pregunta.correcta === this.respuestaSeleccionada
      return this.pregunta.acertada
    },
  },

  methods: {
    ...mapActions(examenStore, ["desordenarArray"]),
    esEnlaceExterno(url) {
      return url.startsWith("http://") || url.startsWith("https://")
    },
    base64ToURL(base64String) {
      if (base64String.startsWith("data:image")) {
        return base64String
      }
      const binaryString = atob(base64String)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const blob = new Blob([bytes], { type: "image/jpeg" })
      return URL.createObjectURL(blob)
    },
  },
}
</script>

<template>
  <div class="card pregunta-card">
    <div class="card_header">
      <h3 class="card_title">{{ numero }} - {{ pregunta.enunciado }}</h3>
      <div>
        <div>
          <img
            v-if="pregunta.adjunto === 'imagen' && !esEnlaceExterno(pregunta.adjuntoURL)"
            class="preguntaImg img-fluid w-100"
            :src="'./imagenesPreguntas/' + pregunta.adjuntoURL"
            alt="Imagen de la pregunta"
          />
          <img
            v-else-if="pregunta.adjunto === 'imagen'"
            class="preguntaImg img-fluid w-100"
            :src="pregunta.adjuntoURL"
            alt="Imagen de la pregunta"
          />
        </div>
        <div>
          <img
            v-if="pregunta.adjunto === 'imagen' && !esEnlaceExterno(pregunta.adjuntoURL)"
            class="preguntaImg img-fluid w-100"
            :src="mostrarImagenBase64 ? pregunta.adjuntoURL : base64ToURL(pregunta.adjuntoURL)"
            alt="Imagen de la pregunta"
          />
          <img
            v-else-if="pregunta.adjunto === 'imagen'"
            class="preguntaImg img-fluid w-100"
            :src="pregunta.adjuntoURL"
            alt="Imagen de la pregunta"
          />
        </div>
        <iframe
          v-if="pregunta.adjunto === 'video'"
          class="preguntaVideo"
          :src="'https://www.youtube.com/embed/' + pregunta.adjuntoURL"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          autoplay="0"
        ></iframe>
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
            (alternativa === pregunta.correcta ||
              (!respuestaSeleccionada && alternativa === pregunta.correcta)),
          'respuesta-incorrecta':
            mostrarRespuestas && alternativa === respuestaSeleccionada && !esRespuestaCorrecta,
          'respuesta-correcta-ignorada':
            mostrarRespuestas &&
            !respuestaSeleccionada &&
            alternativa === pregunta.correcta &&
            !esRespuestaCorrecta,
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
  .preguntaImg,
  .preguntaVideo {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {
  .preguntaImg {
    flex-basis: 30%;
  }
}
</style>
