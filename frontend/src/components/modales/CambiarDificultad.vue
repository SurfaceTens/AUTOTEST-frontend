<script>
export default {
  methods: {
    cerrarModal() {
      this.$emit("cerrar")
    },
    seleccionarOpcion(opcion) {
      this.$emit("cambiarDificultad", opcion)
    },
  },
}
</script>

<template>
  <div class="modal-overlay" @click="cerrarModal">
    <div class="modal-container">
      <div class="modal-card modales-card">
        <div class="modal-card_header">
          <h3 class="modal-card_title">Selecciona una opción:</h3>
        </div>
        <div class="modal-card_body">
          <button class="modal-option" @click="seleccionarOpcion('facil')">Facil</button>
          <button class="modal-option" @click="seleccionarOpcion('dificil')">Dificil</button>
          <button class="modal-option" @click="seleccionarOpcion('aleatorio')">Aleatorio</button>
        </div>
      </div>
    </div>
  </div>
</template>
