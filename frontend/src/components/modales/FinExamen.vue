<script>
export default {
  props: {
    nota: {
      type: String,
      default: "",
    },
    modalTipo: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      colapsado: false,
    }
  },
  methods: {
    aceptarExamen() {
      this.$emit("aceptarExamen")
    },
    cerrarModal() {
      this.$emit("cerrarModal")
    },
    generarNuevoExamen() {
      this.$emit("generarNuevoExamen")
    },
    toggleColapsado() {
      this.colapsado = !this.colapsado
    },
  },
}
</script>

<template>
  <!-- Confirmacion para entregar examen -->
  <div v-if="modalTipo == `finExamen` " class="modal-overlay" @click="cerrarModal">
    <div class="modal-container">
      <div class="modal-card modales-card">
        <div class="modal-card_header">
          <h3 class="modal-card_title">¿Deseas finalizar el examen?</h3>
        </div>
        <div class="modal-card_buttons">
          <button @click="aceptarExamen()" class="btn btn-primary">Aceptar</button>
          <button @click="cerrarModal()" class="btn btn-secondary">Cerrar</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Asistente para revisar examen -->
  <div v-if="modalTipo == `revisarExamen`" class="top-container">
    <div class="modal-container">
      <div v-if="!colapsado" class="modal-card modales-card modal-b" @click="toggleColapsado">
        <div class="modal-card_header">
          <p class="modal-card_subtitle">Aciertos: {{ nota[0] }}</p>
          <h3 class="modal-card_title">{{ nota[1] }}</h3>
        </div>
        <ul class="color-list two-columns">
          <li class="color-item">
            <i class="fas fa-times red sombra"></i>
            <span>Incorrecta</span>
          </li>
          <li class="color-item">
            <i class="fas fa-check green sombra"></i>
            <span>Correcta</span>
          </li>
          <li class="color-item">
            <i class="fas fa-lightbulb yellow sombra"></i>
            <span>Solución</span>
          </li>
          <li class="color-item hidden">
            <i class="fas fa-circle red sombra"></i>
            <span>Vacio</span>
          </li>
          <li class="color-item" @click="generarNuevoExamen(), cerrarModal()">
            <i class="fas fa-redo sombra hover-yellow"> Nuevo Examen</i>
          </li>
          <li class="color-item hidden">
            <i class="fas fa-circle green sombra"></i>
            <span>Vacio</span>
          </li>
        </ul>
      </div>
      <div v-else class="modal-card collapsed hover-green" @click="toggleColapsado">
        <i class="fas fa-eye"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos para la ventana flotante del modal de revision */
.top-container {
  position: fixed;
  top: 200px;
  right: 20px;
  left: auto;
  display: flex;
  justify-content: flex-end;
}

.modal-b {
  position: relative;
  top: 0;
  right: 0;
  transform: translateY(-50%);
  background-color: var(--color-fondo);
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  padding-bottom: 10px;
  width: 350px;
  z-index: 9999;
  pointer-events: auto;
  cursor: pointer;
}

.modal-b .modal-card_buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-b .collapse-icon {
  position: absolute;
  top: 10px;
  right: -30px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.modal-b.collapsed .collapse-icon {
  right: -10px;
  transition: right 0.3s ease-in-out;
}

.modal-b.collapsed .collapse-icon i {
  transform: rotate(-180deg);
  transition: transform 0.3s ease-in-out;
}

.modal-b.collapsed {
  width: auto;
  height: auto;
  cursor: pointer;
}

.modal-b.collapsed .modal-card_header,
.modal-b.collapsed .modal-card_buttons {
  display: none;
}

.modal-card_subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--color-subtitle);
}

.color-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.two-columns {
  columns: 2;
  column-gap: 120px;
}

.color-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.color-item i {
  margin-right: 10px;
}

.red {
  color: red;
}

.green {
  color: green;
}

.yellow {
  color: rgb(255, 207, 0);
}

.hover-green:hover {
  color: green;
}

.hover-yellow:hover {
  color: rgb(255, 207, 0);
}

.sombra {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.hidden {
  visibility: hidden;
}
</style>
