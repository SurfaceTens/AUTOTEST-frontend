<script>
import FormularioPregunta from "./FormularioPregunta.vue"
import { guardarPregunta } from "@/stores/api-service"

export default {
  components: {
    FormularioPregunta,
  },
  data() {
    return {
      pregunta: {
        id: null,
        tematica: "",
        dificultad: 0,
        enunciado: "",
        opcionCorrecta: "",
        opcionIncorrecta1: "",
        opcionIncorrecta2: "",
        opcionIncorrecta3: "",
        imagenBase64: "",
        videoURL: null,
        adjunto: "ninguno",
      },
    }
  },
  methods: {
    mostrarMensajeExito() {
      this.$router.push("ExitoFormulario")
    },
    entregarFormulario() {
      guardarPregunta(this.pregunta).then(() => {
        this.mostrarMensajeExito()
      })
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="card">
      <div class="card_content">
        <FormularioPregunta :preguntaForm="pregunta" />
      </div>
    </div>
  </div>
</template>
