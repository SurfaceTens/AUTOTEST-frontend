<script>
export default {
    props: {
        nota: {
            type: String,
            default: ''
        },
        modalB: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            colapsado: false
        }
    },
    methods: {
        aceptarExamen() {
            // Realizar acciones al aceptar el examen desde el componente Examen.
            this.$emit('aceptarExamen');
        },
        cerrarModal() {
            // Cerrar el modal y volver al estado anterior desde el componente Examen.
            this.$emit('cerrarModal');
        },
        generarNuevoExamen() {
            // Generar un nuevo examen desde el componente Examen.
            this.$emit('generarNuevoExamen');
        },
        toggleColapsado() {
            this.colapsado = !this.colapsado;
        },
    },
};
</script>

<template>
    <div v-if="!modalB" class="modal-overlay" @click="cerrarModal">
        <div class="modal-container">
            <div class="card fin-examen-card">
                <div class="card_header">
                    <h3 class="card_title">¿Deseas finalizar el examen?</h3>
                </div>
                <div class="card_buttons">
                    <button @click="aceptarExamen()" class="btn btn-primary">Aceptar</button>
                    <button @click="cerrarModal()" class="btn btn-secondary">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="top-container">
        <div class="modal-container">
            <div v-if="!colapsado" class="card fin-examen-card modal-b" @click="toggleColapsado">
                <div class="card_header">
                    <p class="card_subtitle">Aciertos: {{ nota[0] }}</p>
                    <h3 class="card_title">{{ nota[1] }}</h3>
                </div>
                <ul class="color-list">
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
                </ul>
            </div>
            <div v-else class="card fin-examen-card modal-b collapsed" @click="toggleColapsado">
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: var(--color-fondo);
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    margin: 0 auto;
    max-width: 400px;
}

.card_header {
    margin-bottom: 10px;
}

.card_title {
    margin: 0;
}

.card_buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

/* Estilos para la ventana flotante del modal B */
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
  width: 400px;
  z-index: 9999;
  pointer-events: auto;
}


.modal-b .card_buttons {
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
    width: 30px;
    cursor: pointer;
}

.modal-b.collapsed .card_header,
.modal-b.collapsed .card_buttons {
    display: none;
}

.card_subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--color-subtitle);
}

.color-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.color-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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

.sombra {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}
</style>
