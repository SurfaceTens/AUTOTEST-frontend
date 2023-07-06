<script>
import { mapActions } from "pinia"
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
      vistaPreviaExistente: false,
    }
  },
  methods: {
    ...mapActions(preguntasStore, ["getDificultadTexto", "crearPregunta", "editarPregunta"]),
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
      if (this.tipoArchivo !== "imagenExistente") {
        this.preguntaForm.adjunto = this.tipoArchivo
        this.preguntaForm.imagenBase64 =
          this.tipoArchivo === "imagen" ? this.preguntaForm.imagenBase64 : null
      }
      if (this.tipoArchivo !== "videoExistente") {
        this.preguntaForm.videoURL = this.tipoArchivo === "video" ? this.preguntaForm.videoURL : ""
      }
      if (this.modoEdicion) {
        this.editarPregunta(this.preguntaForm)
      } else {
        this.crearPregunta(this.preguntaForm)
        this.$router.push("ExitoFormulario")
      }
      this.$emit("confirmar")
    },

    borrarImagenExistente() {
      this.preguntaForm.imagenBase64 = null
      this.tipoArchivo = "imagen"
      this.vistaPreviaExistente = false
    },

    borrarVideoExistente() {
      this.preguntaForm.videoURL = ""
      this.tipoArchivo = "video"
      this.vistaPreviaExistente = false
    },

    cargarTipoArchivo() {
      if (this.modoEdicion) {
        if (this.preguntaForm.adjunto === "imagen") {
          this.tipoArchivo = "imagenExistente"
          this.vistaPreviaExistente = true
        } else if (this.preguntaForm.adjunto === "video") {
          this.tipoArchivo = "videoExistente"
          this.vistaPreviaExistente = true
        } else {
          this.tipoArchivo = this.preguntaForm.adjunto
        }
      }
    },

    cerrarEdicion() {
      this.$emit("cerrar")
    },
  },
  created() {
    this.cargarTipoArchivo()
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
    <div v-if="tipoArchivo === 'imagenExistente' || tipoArchivo === 'imagen'" class="form-group">
      <label for="imagen" class="form-label">Subir una imagen:</label>
      <div v-if="tipoArchivo === 'imagenExistente' && vistaPreviaExistente" class="vista-previa">
        <img :src="preguntaForm.imagenBase64" alt="Vista previa de la imagen" />
        <button class="btn btn-link eliminar-previa" @click="borrarImagenExistente">
          <i class="far fa-trash-alt"></i> Eliminar Imagen
        </button>
      </div>
      <div v-else>
        <input type="file" id="imagen" class="form-control" @change="seleccionarImagen" />
      </div>
    </div>

    <div v-if="tipoArchivo === 'videoExistente' || tipoArchivo === 'video'" class="form-group">
      <label for="video" class="form-label">Enlace de YouTube:</label>
      <div v-if="tipoArchivo === 'videoExistente' && vistaPreviaExistente" class="vista-previa">
        <iframe
          width="560"
          height="315"
          :src="'https://www.youtube.com/embed/' + preguntaForm.videoURL"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          autoplay="0"
        ></iframe>
        <button class="btn btn-link eliminar-previa" @click="borrarVideoExistente">
          <i class="far fa-trash-alt"></i> Eliminar Video
        </button>
      </div>
      <div v-else>
        <input
          type="text"
          id="video"
          class="form-control"
          v-model="preguntaForm.videoURL"
          placeholder="Enlace de YouTube del video."
        />
      </div>
    </div>

    <button type="submit" class="btn btn-primary" @click="entregarFormulario">
      Guardar pregunta
    </button>

    <button v-if="modoEdicion" class="btn btn-secondary" @click="cerrarEdicion">Cerrar</button>
  </div>
</template>

<style>
.vista-previa img {
  max-width: 560px;
  max-height: 315px;
  width: auto;
  height: auto;
}
</style>
