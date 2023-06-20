<script>
import { mapState } from "pinia"
import { preguntasStore } from "@/stores/preguntasStore"

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
  },
  data() {
    return {
      tipoArchivo: "ninguno",
    }
  },
  computed: {
    ...mapState(preguntasStore, ["preguntas"]),
    pregunta() {
      return this.preguntas.find((p) => p.id === this.$route.params.id)
    },
  },
  methods: {
    submitForm() {
      const nuevaPregunta = { ...this.pregunta }

      if (!nuevaPregunta.imagen) {
        nuevaPregunta.imagen = null
      }
    },

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

    mostrarMensajeExito() {
      this.$router.push("/exitoFormulario") // Redirige al componente de éxito
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card_header">
        <h2 class="card_title">Crear una nueva pregunta</h2>
      </div>
      <div class="card_content">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="dificultad" class="form-label">Dificultad:</label>
            <div class="select-arrow">
              <select id="dificultad" class="form-control" v-model="this.preguntaForm.dificultad">
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
              v-model="this.preguntaForm.tema"
              placeholder="Ingresa el tema de la pregunta."
            />
          </div>
          <div class="form-group">
            <label for="enunciado" class="form-label">Enunciado:</label>
            <textarea
              id="enunciado"
              class="form-control enunciado-textarea"
              v-model="this.preguntaForm.enunciado"
              placeholder="Introduce el enunciado de la pregunta"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="correcta" class="form-label">Respuesta correcta:</label>
            <input
              type="text"
              id="correcta"
              class="form-control"
              v-model="this.preguntaForm.correcta"
              placeholder="Ingresa la respuesta correcta."
            />
          </div>
          <div class="form-group">
            <label for="incorrecta1" class="form-label">Respuesta incorrecta 1:</label>
            <input
              type="text"
              id="incorrecta1"
              class="form-control"
              v-model="this.preguntaForm.opcionIncorrecta1"
              placeholder="Ingresa una respuesta incorrecta."
            />
          </div>
          <div class="form-group">
            <label for="incorrecta2" class="form-label">Respuesta incorrecta 2:</label>
            <input
              type="text"
              id="incorrecta2"
              class="form-control"
              v-model="this.preguntaForm.opcionIncorrecta2"
              placeholder="Ingresa una respuesta incorrecta."
            />
          </div>
          <div class="form-group">
            <label for="incorrecta3" class="form-label">Respuesta incorrecta 3:</label>
            <input
              type="text"
              id="incorrecta3"
              class="form-control"
              v-model="this.preguntaForm.opcionIncorrecta3"
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
          <button type="submit" class="btn btn-primary" @click="mostrarMensajeExito">
            Guardar pregunta
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
