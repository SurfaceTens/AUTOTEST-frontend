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
  },
}
</script>

<template>
  <div class="modal-overlay" @click="cerrarModal">
    <div class="modal-container">
      <div class="modal-card modales-card">
        <div class="modal-card_header">
          <h3 class="modal-card_title">Actualizado con éxito.</h3>
        </div>
      </div>
    </div>
  </div>
</template>
