<script>
export default {
  data() {
    return {
      colapsado: false,
    }
  },
  methods: {
    cerrarModal() {
      this.$emit("cerrarModal")
    },
    borrar() {
      this.$emit("borrar")
    },
  },
}
</script>

<template>
  <div class="modal-overlay" @click="cerrarModal">
    <div class="modal-container">
      <div class="modal-card modales-card">
        <div class="modal-card_header">
          <h3 class="modal-card_title">¿Seguro que deseas borrar?</h3>
        </div>
        <div class="modal-card_buttons">
          <button @click="borrar()" class="btn btn-primary">Si</button>
          <button @click="cerrarModal()" class="btn btn-secondary">No</button>
        </div>
      </div>
    </div>
  </div>
</template>
