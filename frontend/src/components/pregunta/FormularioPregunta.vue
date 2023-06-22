<script>
import { guardarPregunta, actualizarPregunta } from "@/stores/api-service"

export default {
  props: {
    preguntaForm: {
      type: Object,
      required: false,
      default() {
        return {
          id: null,
          tematica: "",
          dificultad: 0,
          enunciado: "",
          opcionCorrecta: "",
          opcionIncorrecta1: "",
          opcionIncorrecta2: "",
          opcionIncorrecta3: "",
          imagenURL: null,
          videoURL: null,
          adjunto: "ninguno",
        }
      },
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
      dificultadMap: {
        facil: 25,
        media: 50,
        dificil: 75,
      },
    }
  },
  methods: {
    validarImagen(url) {
      if (url) {
        const extensionesPermitidas = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]
        const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
        if (extensionesPermitidas.includes(extension)) {
          return url
        }
      }
      return "sinImagen.jpg"
    },

    extraerIdVideoYoutube(url) {
      if (url) {
        if (url.includes("watch?v=")) {
          const videoId = url.split("?v=")[1]
          const ampersandPosition = videoId.indexOf("&")
          if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition)
          }
          return videoId
        } else if (url.includes("youtu.be/")) {
          const videoId = url.split("youtu.be/")[1]
          const ampersandPosition = videoId.indexOf("&")
          if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition)
          }
          return videoId
        }
      }
      return null
    },

    entregarFormulario() {
      this.preguntaForm.adjunto = this.tipoArchivo
      this.preguntaForm.dificultad = this.dificultadMap[this.preguntaForm.dificultad] || 0
      this.preguntaForm.imagenURL = this.validarImagen(this.preguntaForm.imagenURL)
      this.preguntaForm.videoURL = this.extraerIdVideoYoutube(this.preguntaForm.videoURL)
      if (this.modoEdicion) {
        actualizarPregunta(this.preguntaForm.id, this.preguntaForm)
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
  created() {
    this.tipoArchivo = this.preguntaForm.adjunto || "ninguno"
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
      <div class="select-arrow">
        <select id="dificultad" class="form-control" v-model="preguntaForm.dificultad">
          <option value="facil">Fácil</option>
          <option value="media">Media</option>
          <option value="dificil">Difícil</option>
        </select>
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
    <div v-if="tipoArchivo === 'imagen'" class="form-group">
      <label for="imagen" class="form-label">Enlace de la imagen:</label>
      <input
        type="text"
        id="imagen"
        class="form-control"
        v-model="preguntaForm.imagenURL"
        placeholder="Enlace de la imagen."
      />
    </div>
    <div v-if="tipoArchivo === 'video'" class="form-group">
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
