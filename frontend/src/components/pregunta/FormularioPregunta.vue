<script>
import { mapActions } from "pinia"
import { guardarPregunta, actualizarPregunta } from "@/stores/api-service"
import { preguntasStore } from "@/stores/preguntasStore"

export default {
  props: {
    preguntaForm: {
      type: Object,
      required: true,
    },
    modoEdicion: {
      type: Boolean,
      default: false,
    },
    titulo: {
      type: String,
      default: "Crear una nueva pregunta",
    },
  },
  data() {
    return {
      tipoArchivo: "ninguno",
      pesoMaximoImagen: 1.02 * 1024 * 1024, // Tamaño máximo permitido: 1.02MB en bytes
    }
  },
  methods: {
    ...mapActions(preguntasStore, ["getDificultadTexto"]),
    seleccionarImagen(event) {
      const imagenSeleccionada = event.target.files[0]
      if (imagenSeleccionada.size < this.pesoMaximoImagen) {
        this.cargarImagen(imagenSeleccionada)
      } else {
        this.preguntaForm.adjunto = "ninguno"
        this.tipoArchivo = "ninguno"
      }
    },
    cargarImagen(img) {
      let reader = new FileReader()
      reader.onload = () => {
        this.preguntaForm.imagenBase64 = reader.result
      }
      reader.readAsDataURL(img)
    },

    entregarFormulario() {
      this.preguntaForm.adjunto = this.tipoArchivo
      this.preguntaForm.videoURL = this.preguntaForm.videoURL
      this.preguntaForm.imagenBase64 = this.preguntaForm.imagenBase64
      if (this.modoEdicion) {
        actualizarPregunta(this.preguntaForm)
      } else {
        guardarPregunta(this.preguntaForm)
        this.$router.push("ExitoFormulario")
      }
      this.$emit("confirmar")
    },

    cerrarEdicion() {
      this.$emit("cerrar")
    },
  },
}
</script>

<template>
  <div class="card_header">
    <h2 class="card_title">{{ titulo }}</h2>
  </div>
  <div class="card_content">
    <div class="form-group">
      <label for="dificultad" class="form-label">Dificultad:</label>
      <input
        type="range"
        class="form-range"
        id="dificultad"
        v-model="preguntaForm.dificultad"
        min="0"
        max="100"
      />
      <div class="slider-value">
        {{ this.getDificultadTexto(preguntaForm.dificultad) + "(" + preguntaForm.dificultad + ")" }}
      </div>
    </div>

    <div class="form-group">
      <label for="tema" class="form-label">Tema:</label>
      <input
        type="text"
        id="tema"
        class="form-control"
        v-model="preguntaForm.tematica"
        placeholder="Ingresa el tema de la pregunta."
      />
    </div>
    <div class="form-group">
      <label for="enunciado" class="form-label">Enunciado:</label>
      <textarea
        id="enunciado"
        class="form-control enunciado-textarea"
        v-model="preguntaForm.enunciado"
        placeholder="Introduce el enunciado de la pregunta"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="correcta" class="form-label">Respuesta correcta:</label>
      <input
        type="text"
        id="correcta"
        class="form-control"
        v-model="preguntaForm.opcionCorrecta"
        placeholder="Ingresa la respuesta correcta."
      />
    </div>
    <div class="form-group">
      <label for="incorrecta1" class="form-label">Respuestas incorrectas:</label>
      <input
        type="text"
        id="incorrecta1"
        class="form-control"
        v-model="preguntaForm.opcionIncorrecta1"
        placeholder="Ingresa una respuesta incorrecta."
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="incorrecta2"
        class="form-control"
        v-model="preguntaForm.opcionIncorrecta2"
        placeholder="Ingresa una respuesta incorrecta."
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="incorrecta3"
        class="form-control"
        v-model="preguntaForm.opcionIncorrecta3"
        placeholder="Ingresa una respuesta incorrecta."
      />
    </div>
    <div class="form-group">
      <label class="form-label">Tipo de adjunto</label>
      <div class="file-type-selector">
        <div class="file-type-option">
          <input
            type="radio"
            id="ningunoOption"
            value="ninguno"
            v-model="tipoArchivo"
            class="file-type-input"
            :checked="preguntaForm.adjunto === 'ninguno'"
          />
          <label for="ningunoOption" class="file-type-label">Ninguno</label>
        </div>
        <div class="file-type-option">
          <input
            type="radio"
            id="imagenOption"
            value="imagen"
            v-model="tipoArchivo"
            class="file-type-input"
            :checked="preguntaForm.adjunto === 'imagen'"
          />
          <label for="imagenOption" class="file-type-label">Imagen</label>
        </div>
        <div class="file-type-option">
          <input
            type="radio"
            id="videoOption"
            value="video"
            v-model="tipoArchivo"
            class="file-type-input"
            :checked="preguntaForm.adjunto === 'video'"
          />
          <label for="videoOption" class="file-type-label">Video</label>
        </div>
      </div>
    </div>
    <div v-if="preguntaForm.adjunto === 'imagen'" class="form-group">
      <label for="imagen" class="form-label">Subir una imagen:</label>
      <input type="file" id="imagen" class="form-control" @change="seleccionarImagen" />
    </div>
    <div v-if="preguntaForm.adjunto === 'video'" class="form-group">
      <label for="video" class="form-label">Enlace de YouTube:</label>
      <input
        type="text"
        id="video"
        class="form-control"
        v-model="preguntaForm.videoURL"
        placeholder="Enlace de YouTube del video."
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="entregarFormulario">
      Guardar pregunta
    </button>

    <button v-if="modoEdicion" class="btn btn-secondary" @click="cerrarEdicion">Cerrar</button>
  </div>
</template>
