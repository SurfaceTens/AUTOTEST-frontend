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
          adjunto: null,
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
    subirImagen(event) {
      // Realizar las acciones necesarias para subir la imagen en el futuro
      const file = event.target.files[0]
      // Guardar la imagen en una ubicación específica y guardar la ruta en this.pregunta.imagen
      console.log(file)
    },

    subirVideo(event) {
      // Realizar las acciones necesarias para subir el video en el futuro
      const file = event.target.files[0]
      // Guardar el video en una ubicación específica y guardar la ruta en this.pregunta.video
      console.log(file)
    },

    entregarFormulario() {
      this.preguntaForm.adjunto = this.tipoArchivo
      this.preguntaForm.dificultad = this.dificultadMap[this.preguntaForm.dificultad] || 0
      if (this.modoEdicion) {
        actualizarPregunta(this.preguntaForm.id, this.preguntaForm)
      } else {
        guardarPregunta(this.preguntaForm)
      }
    },

    cerrarEdicion() {
      this.$emit("cerrar")
    },
  },
  created() {
    this.tipoArchivo = this.preguntaForm.adjunto || 'ninguno';
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
      <label for="imagen" class="form-label">Subir Imagen:</label>
      <input
        type="file"
        id="imagen"
        class="form-control-file"
        @change="subirImagen"
        accept="image/*"
      />
    </div>
    <div v-if="tipoArchivo === 'video'" class="form-group">
      <label for="video" class="form-label">Subir Video:</label>
      <input
        type="file"
        id="video"
        class="form-control-file"
        @change="subirVideo"
        accept="video/*"
      />
    </div>
    <button type="submit" class="btn btn-primary" @click="entregarFormulario">
      Guardar pregunta
    </button>
    <button v-if="modoEdicion" class="btn btn-secondary" @click="cerrarEdicion">Cerrar</button>
  </div>
</template>
