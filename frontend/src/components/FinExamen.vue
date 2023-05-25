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
    methods: {
        aceptarExamen() {
            // Realizar acciones al aceptar el examen
            this.$emit('aceptarExamen');
        },
        cerrarModal() {
            // Cerrar el modal y volver al estado anterior
            this.$emit('cerrarModal');
        },
        generarNuevoExamen() {
            // Generar un nuevo examen desde el componente Examen.
            this.$emit('generarNuevoExamen');
        },
    },
};
</script>

<template>
    <div class="modal-overlay" @click="cerrarModal">
        <div class="modal-container">
            <div v-if="!modalB" class="card fin-examen-card">
                <div class="card_header">
                    <h3 class="card_title">¿Deseas finalizar el examen?</h3>
                </div>
                <div class="card_buttons">
                    <button @click="aceptarExamen()" class="btn btn-primary">Aceptar</button>
                    <button @click="cerrarModal()" class="btn btn-secondary">Cerrar</button>
                </div>
            </div>

            <div v-else class="card fin-examen-card">
                <div class="card_header">
                    <h3 class="card_title">{{ nota }}</h3>
                </div>
                <div class="card_content">
                    <!-- Aquí puedes agregar contenido adicional para mostrar información sobre el examen -->
                </div>
                <div class="card_buttons">
                    <button @click="cerrarModal()" class="btn btn-secondary">Revisar</button>
                    <button @click="generarNuevoExamen(); cerrarModal()" class="btn btn-success">Hacer Otro</button>
                </div>
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
</style>
